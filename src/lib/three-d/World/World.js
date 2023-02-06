import Experience from '../Experience.js';
import Environment from './Environment.js';
// import Mac from './Mac.js';
import Cube from './Cube.js';

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.n_cubes = 20;

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.cubes = [];
			// this.mac = new Mac();
			this.environment = new Environment();

			for (let i = 0; i < this.n_cubes; i++) {
				this.cubes[i] = new Cube();
			}
		});
	}

	update() {
		// if (this.mac) this.mac.update();
		if (this.cubes) {
			for (let i = 0; i < this.n_cubes; i++) {
				this.cubes[i].update();
			}
		}
	}
}
