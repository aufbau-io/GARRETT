import Experience from '../Experience.js';
import Environment from './Environment.js';
import FaxMachine from './FaxMachine.js';
import Briefcase from './Briefcase.js';
import Handshake from './Handshake.js';
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

			this.fax_machine = new FaxMachine();
			this.briefcase = new Briefcase();
			this.handshake = new Handshake();

			for (let i = 0; i < this.n_cubes; i++) {
				// this.cubes[i] = new Cube();
			}
		});
	}

	update() {
		// if (this.mac) this.mac.update();
		if (this.handshake) this.handshake.update();
		if (this.briefcase) this.briefcase.update();
		if (this.fax_machine) this.fax_machine.update();

		// if (this.cubes) {
		// 	for (let i = 0; i < this.n_cubes; i++) {
		// 		// this.cubes[i].update();
		// 	}
		// }
	}
}
