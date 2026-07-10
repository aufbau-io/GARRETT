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

/*
 * MASTER BACKDROP SCALE
 *
 * Lower = the entire office feels farther away.
 * Higher = the entire office feels closer.
 *
 * Good range:
 * 0.16 = very distant
 * 0.20 = distant
 * 0.24 = current default
 * 0.30 = closer
 */
const OFFICE_BACKDROP_SCALE = 0.24;


function createCarpetTexture() {
	const size = 64;
	const data = new Uint8Array(size * size * 4);

	for (let i = 0; i < size * size; i++) {
		const value = 118 + Math.floor(Math.random() * 18);

		data[i * 4] = value;
		data[i * 4 + 1] = value;
		data[i * 4 + 2] = value;
		data[i * 4 + 3] = 255;
	}

	const texture = new THREE.DataTexture(
		data,
		size,
		size,
		THREE.RGBAFormat
	);

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(18, 18);
	texture.needsUpdate = true;

	return texture;
}

function createOfficeBackdrop() {
	const backdrop = new THREE.Group();
	backdrop.name = 'office-backdrop';

	const carpetTexture = createCarpetTexture();
	backdrop.scale.setScalar(OFFICE_BACKDROP_SCALE);

	const wallZ = -18;
	const floorY = -7.25;
	const wallWidth = 82;
	const wallHeight = 48;

	const materials = {
		wall: new THREE.MeshStandardMaterial({
			color: 0xd3d0c6,
			roughness: 0.97,
			metalness: 0
		}),
		wallShadow: new THREE.MeshStandardMaterial({
			color: 0xbdbab0,
			roughness: 1,
			metalness: 0
		}),
		carpet: new THREE.MeshStandardMaterial({
			color: 0x6f726d,
			roughness: 1,
			metalness: 0,
			bumpMap: carpetTexture,
			bumpScale: 0.035
		}),
		trim: new THREE.MeshStandardMaterial({
			color: 0x8c8d88,
			roughness: 0.72,
			metalness: 0.08
		}),
		darkTrim: new THREE.MeshStandardMaterial({
			color: 0x4f5351,
			roughness: 0.64,
			metalness: 0.18
		}),
		glass: new THREE.MeshPhysicalMaterial({
			color: 0xbfc9c5,
			roughness: 0.32,
			metalness: 0,
			transparent: true,
			opacity: 0.34,
			transmission: 0.15,
			depthWrite: false
		}),
		glassFrost: new THREE.MeshStandardMaterial({
			color: 0xe1e3dc,
			roughness: 0.88,
			metalness: 0,
			transparent: true,
			opacity: 0.52,
			depthWrite: false
		}),
		door: new THREE.MeshStandardMaterial({
			color: 0x9a9d98,
			roughness: 0.83,
			metalness: 0.02
		}),
		cork: new THREE.MeshStandardMaterial({
			color: 0xa98d69,
			roughness: 1,
			metalness: 0
		}),
		paper: new THREE.MeshStandardMaterial({
			color: 0xe7e2d5,
			roughness: 0.95,
			metalness: 0
		}),
		paperBlue: new THREE.MeshStandardMaterial({
			color: 0x9eafb0,
			roughness: 0.95,
			metalness: 0
		}),
		paperPink: new THREE.MeshStandardMaterial({
			color: 0xb69b94,
			roughness: 0.95,
			metalness: 0
		}),
		acoustic: new THREE.MeshStandardMaterial({
			color: 0x737b76,
			roughness: 0.96,
			metalness: 0
		}),
		acousticDark: new THREE.MeshStandardMaterial({
			color: 0x5f6662,
			roughness: 0.96,
			metalness: 0
		}),
		printBackground: new THREE.MeshStandardMaterial({
			color: 0xe2dfd5,
			roughness: 0.92,
			metalness: 0
		}),
		printShapeA: new THREE.MeshStandardMaterial({
			color: 0x7f8e88,
			roughness: 0.9,
			metalness: 0
		}),
		printShapeB: new THREE.MeshStandardMaterial({
			color: 0xb49c84,
			roughness: 0.9,
			metalness: 0
		}),
		light: new THREE.MeshBasicMaterial({
			color: 0xf1eee0
		}),
		lightFrame: new THREE.MeshStandardMaterial({
			color: 0xb3b2aa,
			roughness: 0.7,
			metalness: 0.05
		})
	};

	function addBox({
		name,
		size,
		position,
		material,
		parent = backdrop,
		rotation = [0, 0, 0]
	}) {
		const mesh = new THREE.Mesh(
			new THREE.BoxGeometry(...size),
			material
		);

		mesh.name = name;
		mesh.position.set(...position);
		mesh.rotation.set(...rotation);
		parent.add(mesh);

		return mesh;
	}

	// Main wall
	const wall = new THREE.Mesh(
		new THREE.PlaneGeometry(wallWidth, wallHeight),
		materials.wall
	);

	wall.name = 'office-wall';
	wall.position.set(
		0,
		floorY + wallHeight / 2,
		wallZ
	);
	backdrop.add(wall);

	// Slightly darker lower wall band
	addBox({
		name: 'lower-wall-band',
		size: [wallWidth, 5.1, 0.08],
		position: [0, floorY + 2.55, wallZ + 0.045],
		material: materials.wallShadow
	});

	// Carpet
	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(wallWidth, 72),
		materials.carpet
	);

	floor.name = 'office-floor';
	floor.rotation.x = -Math.PI / 2;
	floor.position.set(0, floorY, 12);
	backdrop.add(floor);

	// Baseboard
	addBox({
		name: 'baseboard',
		size: [wallWidth, 0.42, 0.24],
		position: [0, floorY + 0.21, wallZ + 0.13],
		material: materials.trim
	});

	// Ceiling line and shallow soffit
	addBox({
		name: 'ceiling-line',
		size: [wallWidth, 0.34, 0.2],
		position: [0, 11.2, wallZ + 0.12],
		material: materials.trim
	});

	addBox({
		name: 'ceiling-soffit',
		size: [wallWidth, 1.25, 2.1],
		position: [0, 12.05, wallZ + 0.88],
		material: materials.wallShadow
	});

	// Fluorescent-style ceiling panels
	for (const x of [-11.5, 4.5, 20.5]) {
		addBox({
			name: 'ceiling-light-frame',
			size: [7.6, 0.14, 2.15],
			position: [x, 11.42, wallZ + 1.58],
			material: materials.lightFrame
		});

		addBox({
			name: 'ceiling-light',
			size: [7.05, 0.08, 1.72],
			position: [x, 11.34, wallZ + 1.62],
			material: materials.light
		});
	}

	/*
	 * LEFT SIDE: frosted glass meeting room.
	 * This gives depth and a stronger silhouette than a plain wall.
	 */
	const glassRoom = new THREE.Group();
	glassRoom.name = 'glass-meeting-room';
	glassRoom.position.set(-15.3, 0, 0);
	backdrop.add(glassRoom);

	addBox({
		name: 'glass-room-header',
		size: [19.5, 1.05, 0.4],
		position: [0, 10.25, wallZ + 0.26],
		material: materials.darkTrim,
		parent: glassRoom
	});

	addBox({
		name: 'glass-room-left-post',
		size: [0.45, 17.4, 0.4],
		position: [-9.5, 1.3, wallZ + 0.26],
		material: materials.darkTrim,
		parent: glassRoom
	});

	addBox({
		name: 'glass-room-right-post',
		size: [0.45, 17.4, 0.4],
		position: [9.5, 1.3, wallZ + 0.26],
		material: materials.darkTrim,
		parent: glassRoom
	});

	for (const x of [-6.35, -3.18, 0, 3.18, 6.35]) {
		addBox({
			name: 'glass-mullion',
			size: [0.18, 17.1, 0.3],
			position: [x, 1.35, wallZ + 0.28],
			material: materials.darkTrim,
			parent: glassRoom
		});
	}

	for (let i = 0; i < 6; i++) {
		const panelX = -7.9 + i * 3.17;

		addBox({
			name: 'glass-panel',
			size: [3.0, 16.85, 0.12],
			position: [panelX, 1.35, wallZ + 0.2],
			material: materials.glass,
			parent: glassRoom
		});

		addBox({
			name: 'frosted-band',
			size: [2.96, 4.1, 0.08],
			position: [panelX, 1.3, wallZ + 0.11],
			material: materials.glassFrost,
			parent: glassRoom
		});
	}

	// Suggestion of blinds behind the glass
	for (let y = 5.2; y <= 8.6; y += 0.65) {
		addBox({
			name: 'blind-slat',
			size: [18.2, 0.08, 0.08],
			position: [0, y, wallZ - 0.2],
			material: materials.wallShadow,
			parent: glassRoom
		});
	}

	/*
	 * CENTRE: plain office door with a narrow room-number plaque.
	 */
	const doorGroup = new THREE.Group();
	doorGroup.name = 'office-door';
	doorGroup.position.set(1.8, 0, 0);
	backdrop.add(doorGroup);

	addBox({
		name: 'door-frame-top',
		size: [7.2, 0.44, 0.44],
		position: [0, 9.85, wallZ + 0.26],
		material: materials.darkTrim,
		parent: doorGroup
	});

	addBox({
		name: 'door-frame-left',
		size: [0.44, 17.0, 0.44],
		position: [-3.38, 1.55, wallZ + 0.26],
		material: materials.darkTrim,
		parent: doorGroup
	});

	addBox({
		name: 'door-frame-right',
		size: [0.44, 17.0, 0.44],
		position: [3.38, 1.55, wallZ + 0.26],
		material: materials.darkTrim,
		parent: doorGroup
	});

	addBox({
		name: 'door-slab',
		size: [6.35, 16.55, 0.25],
		position: [0, 1.45, wallZ + 0.17],
		material: materials.door,
		parent: doorGroup
	});

	addBox({
		name: 'door-window',
		size: [1.2, 5.6, 0.12],
		position: [1.95, 5.8, wallZ + 0.03],
		material: materials.glassFrost,
		parent: doorGroup
	});

	addBox({
		name: 'door-handle',
		size: [0.85, 0.22, 0.32],
		position: [-2.1, 0.8, wallZ + 0.02],
		material: materials.darkTrim,
		parent: doorGroup
	});

	addBox({
		name: 'room-number-plaque',
		size: [1.35, 0.62, 0.12],
		position: [4.55, 6.8, wallZ + 0.1],
		material: materials.darkTrim,
		parent: doorGroup
	});

	/*
	 * RIGHT-CENTRE: noticeboard with imperfectly arranged paper.
	 */
	const noticeboard = new THREE.Group();
	noticeboard.name = 'noticeboard';
	noticeboard.position.set(12.5, 2.7, wallZ + 0.22);
	backdrop.add(noticeboard);

	addBox({
		name: 'noticeboard-shadow',
		size: [8.3, 6.0, 0.16],
		position: [0.18, -0.18, -0.02],
		material: materials.wallShadow,
		parent: noticeboard
	});

	addBox({
		name: 'noticeboard-frame',
		size: [8.4, 6.1, 0.22],
		position: [0, 0, 0],
		material: materials.darkTrim,
		parent: noticeboard
	});

	addBox({
		name: 'noticeboard-cork',
		size: [7.75, 5.45, 0.15],
		position: [0, 0, 0.13],
		material: materials.cork,
		parent: noticeboard
	});

	const notes = [
		{
			size: [1.7, 2.25, 0.035],
			position: [-2.45, 1.0, 0.24],
			rotation: [0, 0, -0.08],
			material: materials.paper
		},
		{
			size: [1.45, 1.55, 0.035],
			position: [-0.35, 1.45, 0.24],
			rotation: [0, 0, 0.05],
			material: materials.paperBlue
		},
		{
			size: [2.0, 1.2, 0.035],
			position: [2.25, 1.05, 0.24],
			rotation: [0, 0, -0.035],
			material: materials.paper
		},
		{
			size: [1.25, 1.65, 0.035],
			position: [-1.75, -1.55, 0.24],
			rotation: [0, 0, 0.09],
			material: materials.paperPink
		},
		{
			size: [2.25, 1.45, 0.035],
			position: [1.15, -1.4, 0.24],
			rotation: [0, 0, -0.06],
			material: materials.paper
		}
	];

	for (const note of notes) {
		addBox({
			name: 'noticeboard-paper',
			size: note.size,
			position: note.position,
			material: note.material,
			rotation: note.rotation,
			parent: noticeboard
		});
	}

	/*
	 * FAR RIGHT: acoustic panels and one quiet corporate print.
	 */
	const acousticWall = new THREE.Group();
	acousticWall.name = 'acoustic-wall';
	acousticWall.position.set(24.3, 0, 0);
	backdrop.add(acousticWall);

	for (let i = 0; i < 7; i++) {
		addBox({
			name: 'acoustic-panel',
			size: [1.45, 13.0, 0.28],
			position: [
				i * 1.72,
				2.1 + (i % 2 === 0 ? 0.35 : -0.25),
				wallZ + 0.22
			],
			material:
				i % 2 === 0
					? materials.acoustic
					: materials.acousticDark,
			parent: acousticWall
		});
	}

	const print = new THREE.Group();
	print.name = 'corporate-print';
	print.position.set(31.8, 4.0, wallZ + 0.58);
	backdrop.add(print);

	addBox({
		name: 'print-frame',
		size: [5.25, 6.45, 0.28],
		position: [0, 0, 0],
		material: materials.darkTrim,
		parent: print
	});

	addBox({
		name: 'print-background',
		size: [4.8, 6.0, 0.18],
		position: [0, 0, 0.15],
		material: materials.printBackground,
		parent: print
	});

	addBox({
		name: 'print-shape-a',
		size: [2.7, 0.7, 0.08],
		position: [-0.45, 1.2, 0.29],
		rotation: [0, 0, -0.48],
		material: materials.printShapeA,
		parent: print
	});

	addBox({
		name: 'print-shape-b',
		size: [1.75, 2.4, 0.08],
		position: [0.85, -0.65, 0.29],
		rotation: [0, 0, 0.28],
		material: materials.printShapeB,
		parent: print
	});

	// A very soft local glow around the ceiling panels
	const officeGlow = new THREE.PointLight(0xf0ead8, 0.6, 28, 2);
	officeGlow.name = 'office-ceiling-glow';
	officeGlow.position.set(2, 9.5, wallZ + 4.5);
	backdrop.add(officeGlow);

	return backdrop;
}

export function createExperience(canvas, isMobile = false) {
	// State
	let animationId = null;
	let isDestroyed = false;
	const objects = [];

	// Scene setup
	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xe0e0d0, 0.05);

	// Camera — unchanged
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
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: false,
		alpha: true
	});

	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.CineonToneMapping;
	renderer.toneMappingExposure = 1.75;
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(
		window.innerWidth,
		window.innerHeight
	);
	renderer.setPixelRatio(
		Math.min(window.devicePixelRatio, 2)
	);

	// Controls — unchanged
	const controls = new OrbitControls(camera, canvas);

	controls.target.set(0, 0, -1.25);
	controls.enableDamping = true;
	controls.dampingFactor = 0.06;

	controls.minAzimuthAngle = -Math.PI * 0.3;
	controls.maxAzimuthAngle = Math.PI * 0.3;
	controls.minPolarAngle = Math.PI * 0.2;
	controls.maxPolarAngle = Math.PI * 0.48;

	controls.update();

	// Lighting
	scene.add(
		new THREE.AmbientLight(0xe0e0d0, 1.5)
	);

	const sunLight = new THREE.DirectionalLight(
		0xe0e0d0,
		1
	);

	sunLight.position.set(3.5, 2, -1.25);
	scene.add(sunLight);

	// Office backdrop
	const officeBackdrop = createOfficeBackdrop();
	scene.add(officeBackdrop);

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

		const loadModel = (model, index) =>
			new Promise((resolve, reject) => {
				loader.load(
					model.path,
					(gltf) => {
						const baseModel = gltf.scene;
						baseModel.scale.setScalar(model.scale);

						const modelPositions = positions[index];

						for (
							let i = 0;
							i < OBJECTS_PER_TYPE;
							i++
						) {
							const instance =
								i === 0
									? baseModel
									: baseModel.clone();

							const pos = modelPositions[i];

							instance.position.set(
								pos.x,
								pos.y,
								pos.z
							);

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
						onProgress?.(
							loaded / MODELS.length
						);

						resolve();
					},
					undefined,
					reject
				);
			});

		await Promise.all(
			MODELS.map((model, index) =>
				loadModel(model, index)
			)
		);

		dracoLoader.dispose();
	}

	// Animation loop
	function animate() {
		if (isDestroyed) return;

		animationId = requestAnimationFrame(animate);

		for (const object of objects) {
			object.position.y += 0.002;

			if (object.position.y > 5) {
				object.position.y = -5;
			}

			object.rotation.y += 0.001;
		}

		controls.update();
		renderer.render(scene, camera);
	}

	// Resize handler
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
		renderer.setPixelRatio(
			Math.min(window.devicePixelRatio, 2)
		);
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

			window.removeEventListener(
				'resize',
				handleResize
			);

			const disposedGeometries = new Set();
			const disposedMaterials = new Set();

			scene.traverse((child) => {
				if (!(child instanceof THREE.Mesh)) {
					return;
				}

				if (
					child.geometry &&
					!disposedGeometries.has(child.geometry)
				) {
					child.geometry.dispose();
					disposedGeometries.add(child.geometry);
				}

				const childMaterials = Array.isArray(child.material)
					? child.material
					: [child.material];

				for (const material of childMaterials) {
					if (
						material &&
						!disposedMaterials.has(material)
					) {
						material.map?.dispose();
						material.bumpMap?.dispose();
						material.roughnessMap?.dispose();
						material.normalMap?.dispose();
						material.dispose();
						disposedMaterials.add(material);
					}
				}
			});

			controls.dispose();
			renderer.dispose();
		}
	};
}