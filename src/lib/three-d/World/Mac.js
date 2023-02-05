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
		this.resource = this.resources.items.mac;

		this.setModel();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.scale.set(0.05, 0.05, 0.05);
		this.model.position.y -= 1;
		this.scene.add(this.model);

		// tmpwireframe
		this.model.traverse(function (child) {
			if (child.material) {
				child.material = new THREE.MeshPhongMaterial({
					color: 0xffffff,
					wireframe: true,
					vertexColors: THREE.VertexColors
				});
			}
		});

		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
	}

	update() {
		// this.animation.mixer.update(this.time.delta * 0.001);
	}
}
