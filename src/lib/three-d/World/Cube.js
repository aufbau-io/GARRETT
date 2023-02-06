import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Mac {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;

		this.setModel();
	}

	setModel() {
		this.base_size = 2.5;

		const x = Math.random() * this.base_size * 2 - this.base_size;
		const y = Math.random() * this.base_size * 2 - this.base_size;
		const z = (Math.random() * this.base_size) / 2;

		this.size = z;

		const geometry = new THREE.BoxGeometry(z / 2, z / 2, z / 2);
		const material = new THREE.MeshToonMaterial({ color: 0x0b0b0b });

		// let loader = new THREE.TextureLoader();
		// let materialArray = [
		// 	new THREE.MeshBasicMaterial({ map: loader.load('xpos.png') }),
		// 	new THREE.MeshBasicMaterial({ map: loader.load('xneg.png') }),
		// 	new THREE.MeshBasicMaterial({ map: loader.load('ypos.png') }),
		// 	new THREE.MeshBasicMaterial({ map: loader.load('yneg.png') }),
		// 	new THREE.MeshBasicMaterial({ map: loader.load('zpos.png') }),
		// 	new THREE.MeshBasicMaterial({ map: loader.load('zneg.png') })
		// ];

		this.model = new THREE.Mesh(geometry, material);
		this.scene.add(this.model);

		this.model.position.x = x;
		this.model.position.y = y;
		this.model.position.z = z;

		this.model.rotation.x = x;
		this.model.rotation.y = y;
		this.model.rotation.z = z;

		// this.model.traverse((child) => {
		// 	if (child instanceof THREE.Mesh) {
		// 		child.castShadow = true;
		// 	}
		// });
	}

	update() {
		// this.animation.mixer.update(this.time.delta * 0.001);
		this.model.position.y += this.size * 0.002;
		if (this.model.position.y > this.base_size) {
			this.model.position.y = -this.base_size;
		}

		this.model.rotation.x += 0.001;
		this.model.rotation.y += 0.001;
		this.model.rotation.z += 0.001;
	}
}
