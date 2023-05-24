import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
	constructor(screenTypeENUM) {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.scaleFactor = screenTypeENUM == 3 ? 1 : 1.5;

		console.log('screenTypeENUM', screenTypeENUM);

		this.setInstance();
		this.setControls();
	}

	setInstance() {
		const aspectRatio = this.sizes.width / this.sizes.height;
		this.instance = new THREE.OrthographicCamera(
			-this.scaleFactor * aspectRatio,
			this.scaleFactor * aspectRatio,
			this.scaleFactor,
			-this.scaleFactor,
			0.1,
			100
		);
		this.instance.position.set(6, 4, 8);
		this.scene.add(this.instance);
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.left = -this.scaleFactor * this.instance.aspect;
		this.instance.right = this.scaleFactor * this.instance.aspect;
		this.instance.top = this.scaleFactor;
		this.instance.bottom = -this.scaleFactor;

		this.instance.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}
