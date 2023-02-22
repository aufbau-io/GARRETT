import Experience from '../Experience.js';
import Environment from './Environment.js';

import FaxMachine from './FaxMachine.js';
import Briefcase from './Briefcase.js';
import Handshake from './Handshake.js';

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.n_cubes = 18;
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

			console.log(positions_1);
			console.log(positions_2);
			console.log(positions_3);

			this.fax_machine = new FaxMachine(third_cubes, positions_1);
			this.briefcase = new Briefcase(third_cubes, positions_2);
			this.handshake = new Handshake(third_cubes, positions_3);

			for (let i = 0; i < this.n_cubes; i++) {
				// this.cubes[i] = new Cube();
			}
		});
	}

	make_positions(n_cubes) {
		let a = [...Array(n_cubes / 3).keys()];

		// a = a.flatMap((i) => [i, i, i]);

		// let b = [...Array(n_cubes).keys()];
		// b = b.flatMap((i) => [i, i, i]);

		// let c = [...Array(n_cubes).keys()];
		// c = c.flatMap((i) => [i, i, i]);

		let positions = [];
		for (let i = 0; i <= n_cubes; i++) {
			if (i == 6) {
				a = [...Array(n_cubes / 3).keys()];
			}

			if (i == 12) {
				a = [...Array(n_cubes / 3).keys()];
			}

			let xi = Math.floor(Math.random() * a.length);
			let x = a[xi];
			x = x * 0.75 - 1;
			a.splice(xi, 1);

			let y = i / 3 - 3;

			let z = i % 3;

			positions.push([x, y, z]);
			console.log(a);
		}

		return positions;
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
