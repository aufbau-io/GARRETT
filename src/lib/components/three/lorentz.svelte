<script>
	import { onMount, onDestroy } from 'svelte';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import * as THREE from 'three';

	let container, pc, id;
	onDestroy(() => cancelAnimationFrame(id));

	// Setting up the scene
	let scene = new THREE.Scene();

	let height = window.innerHeight;
	let width = window.innerWidth;

	// Setting up a camera
	let camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 800);
	camera.position.z = 100;

	// Setting up the renderer. This will be called later to render scene with the camera setup above
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.setClearColor(0xd0d0d0, 0);
	onMount(() => {
		container.appendChild(renderer.domElement);
	});

	let controls = new OrbitControls(camera, renderer.domElement);
	controls.maxDistance = 250;
	controls.minDistance = 50;
	controls.enablePan = false;


	let step = 0;

	let render = function () {
		renderer.render(scene, camera);
		id = requestAnimationFrame(render);
	};

	window.addEventListener(
		'resize',
		function () {
			let height = window.innerHeight;
			let width = window.innerWidth;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		},
		false
	);

	render();
</script>

<div bind:this={container} class:geometry={true} />

<style>
	.geometry {
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: -1;
	}
</style>
