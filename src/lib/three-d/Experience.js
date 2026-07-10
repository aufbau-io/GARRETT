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

// ─── Master background control ────────────────────────────────────────────────
// The background is a full-screen shader drawn behind the floating objects, so it
// stays pixel-locked to the viewport (never angled or fogged out). Pick a look:
const BG_VARIANTS = ['flatwall', 'sunburst', 'horizon', 'blobs', 'halftone'];
//   'flatwall' – solid cream with faint panel seams (the old, boring one)
//   'sunburst' – soft radial rays turning slowly (corporate-optimism halo)
//   'horizon'  – warm gradient sky with a low sun and a ground line
//   'blobs'    – big out-of-focus tonal shapes drifting behind everything
//   'halftone' – risograph dot-screen gradient, densest low, faint shimmer
const BG_VARIANT = 'sunburst';

const BG_VERTEX = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = vec4(position.xy, 0.0, 1.0);
	}
`;

const BG_FRAGMENT = /* glsl */ `
	varying vec2 vUv;
	uniform vec2 uResolution;
	uniform float uTime;
	uniform int uVariant;

	const vec3 BG    = vec3(0.8784, 0.8784, 0.8157); // #e0e0d0
	const vec3 WARM  = vec3(0.8471, 0.8314, 0.7490); // #d8d4bf
	const vec3 TAN   = vec3(0.8039, 0.7804, 0.6706); // #cdc7ab
	const vec3 DEEP  = vec3(0.7608, 0.7412, 0.6314); // #c2bda1
	const vec3 LINE  = vec3(0.7255, 0.7137, 0.6353); // #b9b6a2
	const vec3 WHITE = vec3(0.9569, 0.9412, 0.8784); // #f4f0e0

	void main() {
		vec2 res = uResolution;
		vec2 fc = vUv * res;          // pixel coords
		vec2 p = vUv;                 // 0..1
		float aspect = res.x / res.y;
		float tTop = 1.0 - p.y;       // 0 at top, 1 at bottom
		vec3 col = BG;

		if (uVariant == 0) {
			// flat wall — faint square grid
			float cell = res.x / 9.0;
			vec2 gp = mod(fc + cell * 0.5, cell);
			float d = min(min(gp.x, cell - gp.x), min(gp.y, cell - gp.y));
			float l = 1.0 - smoothstep(0.0, 1.5, d);
			col = mix(BG, LINE, l * 0.5);
		} else if (uVariant == 1) {
			// sunburst — alternating soft wedges, bright center, slow spin
			vec2 dir = (p - vec2(0.5, 0.52)) * vec2(aspect, 1.0);
			float ang = atan(dir.y, dir.x) + uTime * 0.05;
			float wedge = smoothstep(0.42, 0.58, 0.5 + 0.5 * sin(ang * 14.0));
			col = mix(BG, TAN, wedge * 0.5);
			float dist = length(dir);
			col = mix(col, BG, 1.0 - smoothstep(0.0, 0.5, dist));
		} else if (uVariant == 2) {
			// letterhead horizon — gradient sky, low sun, ground line
			vec3 sky = mix(WARM, BG, smoothstep(0.0, 0.62, tTop));
			sky = mix(sky, DEEP, smoothstep(0.62, 1.0, tTop));
			col = sky;
			float sd = length((p - vec2(0.5, 0.34)) * vec2(aspect, 1.0));
			col = mix(col, WHITE, (1.0 - smoothstep(0.0, 0.5, sd)) * 0.85);
			float ground = 1.0 - smoothstep(0.0, 0.004, abs(tTop - 0.72));
			col = mix(col, LINE, ground * 0.7);
		} else if (uVariant == 3) {
			// soft blobs — drifting out-of-focus tonal shapes
			vec2 centers[4];
			float radii[4];
			vec3 cols[4];
			centers[0] = vec2(0.25, 0.65); radii[0] = 0.45; cols[0] = WARM;
			centers[1] = vec2(0.72, 0.40); radii[1] = 0.50; cols[1] = TAN;
			centers[2] = vec2(0.50, 0.15); radii[2] = 0.40; cols[2] = DEEP;
			centers[3] = vec2(0.85, 0.80); radii[3] = 0.32; cols[3] = WARM;
			for (int i = 0; i < 4; i++) {
				vec2 off = vec2(
					sin(uTime * 0.03 + float(i)) * 0.06,
					cos(uTime * 0.025 + float(i)) * 0.06
				);
				float dd = length((p - centers[i] - off) * vec2(aspect, 1.0));
				float w = (1.0 - smoothstep(0.0, radii[i], dd)) * 0.75;
				col = mix(col, cols[i], w);
			}
		} else {
			// risograph halftone — dot screen; dots grow from tiny (top) to
			// nearly touching (bottom). Cell + dot both scale with the viewport.
			float gap = res.y / 64.0;
			vec2 gp = mod(fc, gap) - gap * 1.0;
			vec2 idx = floor(fc / gap);
			float shim = 0.9 + 0.1 * sin(uTime * 0.8 + idx.x * 0.6 + idx.y * 0.6);
			float fill = (0.1 + tTop * 0.42) * shim; // radius as a fraction of the cell
			float radius = fill * gap;
			float dot = 1.0 - smoothstep(radius - 1.5, radius + 0.5, length(gp));
			col = mix(BG, mix(TAN, DEEP, tTop), dot);
		}

		gl_FragColor = vec4(col, 1.0);
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
			uTime: { value: 0 },
			uResolution: { value: new THREE.Vector2(1, 1) },
			uVariant: { value: Math.max(0, BG_VARIANTS.indexOf(BG_VARIANT)) }
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
	const clock = new THREE.Clock();

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

		background.material.uniforms.uTime.value = clock.getElapsedTime();

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