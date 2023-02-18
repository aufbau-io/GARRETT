import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Mac {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;

		// Resource
		this.resource = this.resources.items.briefcase;
		this.setModel();
	}

	setModel() {
		this.base_size = 2.5;
		let x = Math.random() * this.base_size * 2 - this.base_size;
		let y = Math.random() * this.base_size * 2 - this.base_size;
		let z = (Math.random() * this.base_size) / 2;

		this.size = z;
		this.n_models = 5;

		this.model = this.resource.scene;
		this.model.scale.set(0.01, 0.01, 0.01);
		this.scene.add(this.model);
		this.models = [this.model];

		this.model.position.x = x;
		this.model.position.y = y;
		this.model.position.z = z;

		this.gradientTexture = this.resources.items.gradientTexture;
		this.gradientTexture.magFilter = THREE.NearestFilter;

		let material = new THREE.MeshToonMaterial({
			color: 0xe0e0d0,
			gradientMap: this.gradientTexture
		});

		// tmpwireframe
		this.model.traverse(function (child) {
			if (child.material) {
				child.material = material;
			}
		});

		for (let i = 0; i < this.n_models - 1; i++) {
			let model_clone = this.model.clone();
			this.scene.add(model_clone);

			x = Math.random() * this.base_size * 2 - this.base_size;
			y = Math.random() * this.base_size * 2 - this.base_size;
			z = (Math.random() * this.base_size) / 2;

			// model_clone.scale.set(z, z, z);

			model_clone.position.x = x;
			model_clone.position.y = y;
			model_clone.position.z = z;

			model_clone.rotation.x = Math.random() / 3 - 0.3;
			model_clone.rotation.y = Math.random();
			model_clone.rotation.z = Math.random() / 3 - 0.3;

			this.models.push(model_clone);
		}
	}

	update() {
		// this.animation.mixer.update(this.time.delta * 0.001);
		for (let i = 0; i < this.n_models; i++) {
			this.models[i].position.y += this.size * 0.002;
			if (this.models[i].position.y > this.base_size) {
				this.models[i].position.y = -this.base_size;
			}

			// this.models[i].rotation.x += 0.001;
			this.models[i].rotation.y += 0.001;
			// this.models[i].rotation.z += 0.001;
		}
	}
}
