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

export function createExperience(canvas, isMobile = false) {
	// State
	let animationId = null;
	let isDestroyed = false;
	const objects = [];
	
	// Scene setup
	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xe0e0d0, 0.05);
	
	// Camera
	const scaleFactor = isMobile ? 1.5 : 1;
	const aspect = window.innerWidth / window.innerHeight;
	const camera = new THREE.OrthographicCamera(
		-scaleFactor * aspect,
		scaleFactor * aspect,
		scaleFactor,
		-scaleFactor,
		0.1,
		100
	);
	camera.position.set(6, 4, 8);
	
	// Renderer
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.CineonToneMapping;
	renderer.toneMappingExposure = 1.75;
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	
	// Controls
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	
	// Lighting
	scene.add(new THREE.AmbientLight(0xe0e0d0, 1.5));
	const sunLight = new THREE.DirectionalLight(0xe0e0d0, 1);
	sunLight.position.set(3.5, 2, -1.25);
	scene.add(sunLight);
	
	// Grid
	const grid = new THREE.GridHelper(20, 50, 0x232323, 0x232323);
	grid.position.set(-4.5, -4.5, -4.5);
	scene.add(grid);
	
	// Generate positions
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
	
	// Load models
	async function loadModels(onProgress) {
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');
		loader.setDRACOLoader(dracoLoader);
		
		const positions = generatePositions();
		let loaded = 0;
		
		const loadModel = (model, index) => new Promise((resolve, reject) => {
			loader.load(
				model.path,
				(gltf) => {
					const baseModel = gltf.scene;
					baseModel.scale.setScalar(model.scale);
					
					const modelPositions = positions[index];
					
					for (let i = 0; i < OBJECTS_PER_TYPE; i++) {
						const instance = i === 0 ? baseModel : baseModel.clone();
						const pos = modelPositions[i];
						
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
				},
				undefined,
				reject
			);
		});
		
		await Promise.all(MODELS.map((model, i) => loadModel(model, i)));
		dracoLoader.dispose();
	}
	
	// Animation loop
	function animate() {
		if (isDestroyed) return;
		
		animationId = requestAnimationFrame(animate);
		
		// Update objects
		for (const obj of objects) {
			obj.position.y += 0.002;
			if (obj.position.y > 5) obj.position.y = -5;
			obj.rotation.y += 0.001;
		}
		
		controls.update();
		renderer.render(scene, camera);
	}
	
	// Resize handler
	function handleResize() {
		if (isDestroyed) return;
		
		const width = window.innerWidth;
		const height = window.innerHeight;
		const aspect = width / height;
		
		camera.left = -scaleFactor * aspect;
		camera.right = scaleFactor * aspect;
		camera.top = scaleFactor;
		camera.bottom = -scaleFactor;
		camera.updateProjectionMatrix();
		
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}
	
	window.addEventListener('resize', handleResize);
	
	// Public API
	return {
		async init(onProgress) {
			await loadModels(onProgress);
			animate();
		},
		
		destroy() {
			isDestroyed = true;
			
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			
			window.removeEventListener('resize', handleResize);
			
			// Dispose resources
			scene.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.geometry?.dispose();
					if (child.material) {
						if (Array.isArray(child.material)) {
							child.material.forEach(m => m.dispose());
						} else {
							child.material.dispose();
						}
					}
				}
			});
			
			controls.dispose();
			renderer.dispose();
		}
	};
}