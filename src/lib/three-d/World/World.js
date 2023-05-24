import Experience from '../Experience.js';
import Environment from './Environment.js';

import FaxMachine from './FaxMachine.js';
import Briefcase from './Briefcase.js';
import Plant from './Plant.js';

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.n_cubes = 24;
		let third_cubes = this.n_cubes / 3;
		this.positions = this.make_positions(this.n_cubes);
		let positions_1 = [];
		let positions_2 = [];
		let positions_3 = [];

		// console.log(this.positions);
		for (let i = 0; i < this.n_cubes; i++) {
			if (i % 3 == 0) {
				positions_1.push(this.positions[i]);
			} else if ((i - 1) % 3 == 0) {
				positions_2.push(this.positions[i]);
			} else {
				positions_3.push(this.positions[i]);
			}
		}

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.cubes = [];
			// this.mac = new Mac();
			this.environment = new Environment();

			this.fax_machine = new FaxMachine(third_cubes, positions_2);
			this.plant = new Plant(third_cubes, positions_1);
			this.briefcase = new Briefcase(third_cubes, positions_3);

			for (let i = 0; i < this.n_cubes; i++) {
				// this.cubes[i] = new Cube();
			}
		});
	}

	make_positions(n_cubes) {
		let positions = [];
		for (let i = 0; i <= n_cubes; i++) {
			let x = (i % 4) * 1.5 - 3;
			let y = (i / n_cubes) * 10 - 5;

			let z = -(i % 3);

			positions.push([x, y, z]);
		}
		return positions;
	}

	update() {
		// if (this.mac) this.mac.update();
		if (this.plant) this.plant.update();
		if (this.briefcase) this.briefcase.update();
		if (this.fax_machine) this.fax_machine.update();

		// if (this.cubes) {
		// 	for (let i = 0; i < this.n_cubes; i++) {
		// 		// this.cubes[i].update();
		// 	}
		// }
	}
}
