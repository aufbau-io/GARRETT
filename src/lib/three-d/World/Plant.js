import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Plant {
	constructor(n_models, positions) {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;
		this.positions = positions;
		this.n_models = n_models;

		// Resource
		this.resource = this.resources.items.plant;
		this.setModel();
	}

	setModel() {
		this.base_size = 5;

		// this.size = 1 / this.positions[0][2];

		this.model = this.resource.scene;
		this.model.scale.set(0.07, 0.07, 0.07);
		this.scene.add(this.model);
		this.models = [this.model];

		this.model.position.x = this.positions[0][0];
		this.model.position.y = this.positions[0][1];
		this.model.position.z = this.positions[0][2];

		this.gradientTexture = this.resources.items.gradientTexture;
		this.gradientTexture.magFilter = THREE.NearestFilter;

		// let material = new THREE.MeshToonMaterial({
		// 	color: 0x1b1b1b,
		// 	gradientMap: this.gradientTexture
		// });

		// this.model.traverse(function (child) {
		// 	if (child.material) {
		// 		child.material = material;
		// 	}
		// });

		for (let i = 1; i < this.n_models; i++) {
			let model_clone = this.model.clone();
			this.scene.add(model_clone);

			let x = this.positions[i][0];
			let y = this.positions[i][1];
			let z = this.positions[i][2];

			// model_clone.scale.set(1 / z, 1 / z, 1 / z);

			model_clone.position.x = x;
			model_clone.position.y = y;
			model_clone.position.z = z;

			model_clone.rotation.x = Math.random() * 2 - 4;
			model_clone.rotation.y = Math.random() * 2 - 4;
			model_clone.rotation.z = Math.random() * 2 - 4;

			this.models.push(model_clone);
		}
	}

	update() {
		// this.animation.mixer.update(this.time.delta * 0.001);
		for (let i = 0; i < this.n_models; i++) {
			this.models[i].position.y += 0.002;
			if (this.models[i].position.y > this.base_size) {
				this.models[i].position.y = -this.base_size;
			}

			// this.models[i].rotation.x += 0.0002;
			this.models[i].rotation.y += 0.0002;
			// this.models[i].rotation.z += 0.0002;

			// console.log('x', this.models[i].position.x);
			// console.log('y', this.models[i].position.y);
			// console.log('z', this.models[i].position.z);
		}
	}
}
