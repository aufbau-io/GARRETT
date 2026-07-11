import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const MODELS = [
	{ name: 'fax_machine', path: 'models/fax_machine.glb', scale: 1.25 },
	{ name: 'briefcase', path: 'models/briefcase.glb', scale: 0.0215 },
	{ name: 'plant', path: 'models/plant.glb', scale: 0.07 }
];

const TOTAL_OBJECTS = 24;
const OBJECTS_PER_TYPE = TOTAL_OBJECTS / 3;

// ─── Office backdrop ──────────────────────────────────────────────────────────
// A full-screen shader behind the floating objects, pixel-locked to the viewport.
// Old painted wall on top, dirty carpet below — they meet at `floorY` (~1/3 up),
// which is exactly where the old horizon line sat.

const BG_VERTEX = `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = vec4(position.xy, 0.0, 1.0);
	}
`;

const BG_FRAGMENT = `
	varying vec2 vUv;
	uniform vec2 uResolution;

	const vec3 BG    = vec3(0.8784, 0.8784, 0.8157); // #e0e0d0  wall (light)

    float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
	}

    void main() {
		vec2 res = uResolution;
		vec2 fc = vUv * res;

		// ── flat wall + tile grid ───────────────────────────────────
		vec3 wall = BG;

		float tile = min(res.x, res.y) / 8.5;        // consistent size, portrait & landscape
		vec2 gp = mod(fc, tile);
		float gd = min(min(gp.x, tile - gp.x), min(gp.y, tile - gp.y));
		float grid = 1.0 - smoothstep(0.0, 2.5, gd);
		wall = mix(wall, LINE, grid * 0.52);

		gl_FragColor = vec4(wall, 1.0);
	}
`;

// Full-screen background pass rendered before the main scene.
function createBackground() {
	const scene = new THREE.Scene();
	const camera = new THREE.Camera();
	const material = new THREE.ShaderMaterial({
		vertexShader: BG_VERTEX,
		fragmentShader: BG_FRAGMENT,
		depthTest: false,
		depthWrite: false,
		uniforms: {
			uResolution: { value: new THREE.Vector2(1, 1) }
		}
	});
	const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
	mesh.frustumCulled = false;
	scene.add(mesh);
	return { scene, camera, material, mesh };
}

export function createExperience(canvas, isMobile = false) {
	let animationId = null;
	let isDestroyed = false;
	const objects = [];

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xe0e0d0, 0.05);

	const scaleFactor = isMobile ? 1.5 : 1;
	const aspect = window.innerWidth / window.innerHeight;
	const camera = new THREE.OrthographicCamera(
		-scaleFactor * aspect, scaleFactor * aspect, scaleFactor, -scaleFactor, 0.1, 100
	);
	camera.position.set(6, 4, 8);

	const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.CineonToneMapping;
	renderer.toneMappingExposure = 1.75;
	renderer.setClearColor(0x000000, 0);
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 0, -1.25);
	controls.enableDamping = true;
	controls.dampingFactor = 0.06;
	controls.minAzimuthAngle = -Math.PI * 0.3;
	controls.maxAzimuthAngle = Math.PI * 0.3;
	controls.minPolarAngle = Math.PI * 0.2;
	controls.maxPolarAngle = Math.PI * 0.48;
	controls.update();

	scene.add(new THREE.AmbientLight(0xe0e0d0, 1.5));
	const sunLight = new THREE.DirectionalLight(0xe0e0d0, 1);
	sunLight.position.set(3.5, 2, -1.25);
	scene.add(sunLight);

	const background = createBackground();
	renderer.getDrawingBufferSize(background.material.uniforms.uResolution.value);

	function generatePositions() {
		const positions = [[], [], []];
		for (let i = 0; i < TOTAL_OBJECTS; i++) {
			const x = (i % 4) * 1.5 - 2.5;
			const y = (i / TOTAL_OBJECTS) * 10 - 4;
			const z = -(i % 3);
			positions[i % 3].push({ x, y, z });
		}
		return positions;
	}

	async function loadModels(onProgress) {
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');
		loader.setDRACOLoader(dracoLoader);

		const positions = generatePositions();
		let loaded = 0;

		const loadModel = (model, index) => new Promise((resolve, reject) => {
			loader.load(model.path, (gltf) => {
				const baseModel = gltf.scene;
				baseModel.scale.setScalar(model.scale);
				for (let i = 0; i < OBJECTS_PER_TYPE; i++) {
					const instance = i === 0 ? baseModel : baseModel.clone();
					const pos = positions[index][i];
					instance.position.set(pos.x, pos.y, pos.z);
					if (i > 0) {
						instance.rotation.set(
							Math.random() * 2 - 4,
							Math.random() * 2 - 4,
							Math.random() * 2 - 4
						);
					}
					scene.add(instance);
					objects.push(instance);
				}
				loaded++;
				onProgress?.(loaded / MODELS.length);
				resolve();
			}, undefined, reject);
		});

		await Promise.all(MODELS.map((model, i) => loadModel(model, i)));
		dracoLoader.dispose();
	}

	function animate() {
		if (isDestroyed) return;
		animationId = requestAnimationFrame(animate);

		for (const obj of objects) {
			obj.position.y += 0.002;
			if (obj.position.y > 5) obj.position.y = -5;
			obj.rotation.y += 0.001;
		}

		controls.update();

		renderer.clear();
		renderer.render(background.scene, background.camera);
		renderer.render(scene, camera);
	}

	function handleResize() {
		if (isDestroyed) return;
		const width = window.innerWidth;
		const height = window.innerHeight;
		const nextAspect = width / height;
		camera.left = -scaleFactor * nextAspect;
		camera.right = scaleFactor * nextAspect;
		camera.top = scaleFactor;
		camera.bottom = -scaleFactor;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.getDrawingBufferSize(background.material.uniforms.uResolution.value);
	}

	window.addEventListener('resize', handleResize);

	return {
		async init(onProgress) {
			await loadModels(onProgress);
			animate();
		},
		destroy() {
			isDestroyed = true;
			if (animationId) cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);

			background.mesh.geometry.dispose();
			background.material.dispose();

			scene.traverse((child) => {
				child.geometry?.dispose();
				const m = child.material;
				if (Array.isArray(m)) m.forEach((x) => x.dispose());
				else m?.dispose();
			});

			controls.dispose();
			renderer.dispose();
		}
	};
}