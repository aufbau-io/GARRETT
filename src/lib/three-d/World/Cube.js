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
		this.size = 2;

		const x = Math.random() * this.size * 3 - this.size * 1.5;
		const y = Math.random() * this.size - this.size / 2;
		const z = Math.random() * this.size - this.size / 2;

		const geometry = new THREE.BoxGeometry(z / 2, z / 2, z / 2);
		// const material = new THREE.MeshNormalMaterial({ color: 0x232323 });

		let loader = new THREE.TextureLoader();
		let materialArray = [
			new THREE.MeshBasicMaterial({ map: loader.load('xpos.png') }),
			new THREE.MeshBasicMaterial({ map: loader.load('xneg.png') }),
			new THREE.MeshBasicMaterial({ map: loader.load('ypos.png') }),
			new THREE.MeshBasicMaterial({ map: loader.load('yneg.png') }),
			new THREE.MeshBasicMaterial({ map: loader.load('zpos.png') }),
			new THREE.MeshBasicMaterial({ map: loader.load('zneg.png') })
		];

		this.model = new THREE.Mesh(geometry, materialArray);
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
		this.model.position.y += 0.0005;
		if (this.model.position.y > this.size) {
			this.model.position.y = -this.size;
		}

		this.model.rotation.x += 0.001;
		this.model.rotation.y += 0.001;
		this.model.rotation.z += 0.001;
	}
}
