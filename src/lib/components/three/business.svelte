<script>
	import { onMount, onDestroy } from 'svelte';
	import { show3d } from '$lib/store/store';

	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import * as THREE from 'three';
	import * as dat from 'lil-gui'
	import * as CANNON from 'cannon-es'

	// ---------------------------------------------------------------------------
	// DEBUG
	// ---------------------------------------------------------------------------
		
	const gui = new dat.GUI()
	const debugObject = {}

	debugObject.createSphere = () =>
	{
			createSphere(
					Math.random() * 0.5,
					{
							x: (Math.random() - 0.5) * 3,
							y: 3,
							z: (Math.random() - 0.5) * 3
					}
			)
	}

	gui.add(debugObject, 'createSphere')

	// debugObject.createBox = () =>
	// {
	// 		createBox(
	// 				Math.random(),
	// 				Math.random(),
	// 				Math.random(),
	// 				{
	// 						x: (Math.random() - 0.5) * 3,
	// 						y: 3,
	// 						z: (Math.random() - 0.5) * 3
	// 				}
	// 		)
	// }
	// gui.add(debugObject, 'createBox')

	// Reset
	debugObject.reset = () =>
	{
			for(const object of objectsToUpdate)
			{
					// Remove body
					object.body.removeEventListener('collide', playHitSound)
					world.removeBody(object.body)

					// Remove mesh
					scene.remove(object.mesh)
			}
			
			objectsToUpdate.splice(0, objectsToUpdate.length)
	}
	gui.add(debugObject, 'reset')

	// ---------------------------------------------------------------------------
	// BASE
	// ---------------------------------------------------------------------------

	let container, pc, id;
	onDestroy(() => cancelAnimationFrame(id));

	// Setting up the scene
	let scene = new THREE.Scene();

	// ---------------------------------------------------------------------------
	// SOUNDS
	// ---------------------------------------------------------------------------

	const hitSound = new Audio('/sounds/hit.mp3')

	const playHitSound = (collision) =>
	{
			const impactStrength = collision.contact.getImpactVelocityAlongNormal()

			if(impactStrength > 1.5)
			{
					hitSound.volume = Math.random()
					hitSound.currentTime = 0
					hitSound.play()
			}
	}

	// ---------------------------------------------------------------------------
	// TEXTTURES
	// ---------------------------------------------------------------------------

	const textureLoader = new THREE.TextureLoader()
	const cubeTextureLoader = new THREE.CubeTextureLoader()

	// ---------------------------------------------------------------------------
	// PHYSICS
	// ---------------------------------------------------------------------------

	const world = new CANNON.World()
	world.broadphase = new CANNON.SAPBroadphase(world)
	world.allowSleep = true
	world.gravity.set(0, - .982, 0)

	// Default material
	const defaultMaterial = new CANNON.Material('default')
	const defaultContactMaterial = new CANNON.ContactMaterial(
			defaultMaterial,
			defaultMaterial,
			{
					friction: 0.1,
					restitution: 0.7
			}
	)
	world.defaultContactMaterial = defaultContactMaterial

	// Floor
	const floorShape = new CANNON.Plane()
	const floorBody = new CANNON.Body()
	floorBody.mass = 0
	floorBody.addShape(floorShape)
	floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5) 
	world.addBody(floorBody)

	// ---------------------------------------------------------------------------
	// UTILS
	// ---------------------------------------------------------------------------

	const objectsToUpdate = []

	// Create sphere
	const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
	const sphereMaterial = new THREE.MeshStandardMaterial({
			metalness: 0.3,
			roughness: 0.8,
	})

	const createSphere = (radius, position) =>
	{
			// Three.js mesh
			const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
			mesh.castShadow = true
			mesh.scale.set(radius, radius, radius)
			mesh.position.copy(position)
			scene.add(mesh)

			// Cannon.js body
			const shape = new CANNON.Sphere(radius)

			const body = new CANNON.Body({
					mass: 1,
					position: new CANNON.Vec3(0, 3, 0),
					shape: shape,
					material: defaultMaterial
			})
			body.position.copy(position)
			body.addEventListener('collide', playHitSound)
			world.addBody(body)

			// Save in objects
			objectsToUpdate.push({ mesh, body })
	}

	// Create box
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
	const boxMaterial = new THREE.MeshStandardMaterial({
			metalness: 0.3,
			roughness: 0.8,
	})
	const createBox = (width, height, depth, position) =>
	{
			// Three.js mesh
			const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
			mesh.scale.set(width, height, depth)
			mesh.castShadow = true
			mesh.position.copy(position)
			scene.add(mesh)

			// Cannon.js body
			const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))

			const body = new CANNON.Body({
					mass: 1,
					position: new CANNON.Vec3(0, 3, 0),
					shape: shape,
					material: defaultMaterial
			})
			body.position.copy(position)
			body.addEventListener('collide', playHitSound)
			world.addBody(body)

			// Save in objects
			objectsToUpdate.push({ mesh, body })
	}

	// createBox(1, 1.5, 2, { x: 0, y: 3, z: 0 })


	// ---------------------------------------------------------------------------
	// FLOOR
	// ---------------------------------------------------------------------------

	// const floor = new THREE.Mesh(
	// 		new THREE.PlaneGeometry(10, 10),
	// 		new THREE.MeshStandardMaterial({
	// 				color: '#777777',
	// 				metalness: 0.3,
	// 				roughness: 0.4,
	// 				envMap: environmentMapTexture,
	// 				envMapIntensity: 0.5
	// 		})
	// )
	// floor.receiveShadow = true
	// floor.rotation.x = - Math.PI * 0.5
	// scene.add(floor)


	// ---------------------------------------------------------------------------
	// LIGHTS
	// ---------------------------------------------------------------------------

	const ambientLight = new THREE.AmbientLight(0x008080, 1)
	scene.add(ambientLight)

	const directionalLight = new THREE.DirectionalLight(0xfafafa, 0.2)
	directionalLight.castShadow = true
	directionalLight.shadow.mapSize.set(1024, 1024)
	directionalLight.shadow.camera.far = 15
	directionalLight.shadow.camera.left = - 7
	directionalLight.shadow.camera.top = 7
	directionalLight.shadow.camera.right = 7
	directionalLight.shadow.camera.bottom = - 7
	directionalLight.position.set(5, 5, 5)
	scene.add(directionalLight)

	
	// ---------------------------------------------------------------------------
	// SIZES
	// ---------------------------------------------------------------------------

	const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
	}

	window.addEventListener('resize', () =>
	{
			// Update sizes
			sizes.width = window.innerWidth
			sizes.height = window.innerHeight

			// Update camera
			camera.aspect = sizes.width / sizes.height
			camera.updateProjectionMatrix()

			// Update renderer
			renderer.setSize(sizes.width, sizes.height)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	})



	// ---------------------------------------------------------------------------
	// CAMERA
	// ---------------------------------------------------------------------------

	// Base camera
	const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
	camera.position.set(- 3, 3, 3)
	scene.add(camera)


	// Setting up the renderer. This will be called later to render scene with the camera setup above
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.setClearColor(0xd0d0d0, 0);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.enablePan = false;

	onMount(() => {
		container.appendChild(renderer.domElement);
	});
	

	// ---------------------------------------------------------------------------
	// ANIMATE
	// ---------------------------------------------------------------------------

 const clock = new THREE.Clock()
	let oldElapsedTime = 0

	const tick = () =>
	{
			const elapsedTime = clock.getElapsedTime()
			const deltaTime = elapsedTime - oldElapsedTime
			oldElapsedTime = elapsedTime

			// Update physics
			world.step(1 / 60, deltaTime, 3)
			
			for(const object of objectsToUpdate)
			{
					object.mesh.position.copy(object.body.position)
					object.mesh.quaternion.copy(object.body.quaternion)
			}

			// Update controls
			controls.update()

			// Render
			renderer.render(scene, camera)

			// Call tick again on the next frame
			id = window.requestAnimationFrame(tick)
	}



  tick()
</script>

<div bind:this={container} class:geometry={true} class:hide="{!$show3d}" />

<style>
	.geometry {
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 1;
	}

	.geometry.hide {
		opacity: 0;
	}
</style>
