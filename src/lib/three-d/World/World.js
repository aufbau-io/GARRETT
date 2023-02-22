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

		this.n_cubes = 18;
		let third_cubes = this.n_cubes / 3;
		this.positions = this.make_positions(this.n_cubes);

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.cubes = [];
			// this.mac = new Mac();
			this.environment = new Environment();

			this.fax_machine = new FaxMachine(third_cubes, this.positions.slice(0, third_cubes));
			this.briefcase = new Briefcase(
				third_cubes,
				this.positions.slice(third_cubes, third_cubes * 2)
			);
			this.handshake = new Handshake(
				third_cubes,
				this.positions.slice(third_cubes * 2, this.n_cubes)
			);

			for (let i = 0; i < this.n_cubes; i++) {
				// this.cubes[i] = new Cube();
			}
		});
	}

	make_positions(n_cubes) {
		let a = [...Array(n_cubes / 3).keys()];
		console.log(a);
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
			// x = x * 2 - this.n_cubes / 9;
			x = x * 0.75 - 0.5;
			a.splice(xi, 1);

			// let yi = Math.floor(Math.random() * b.length);
			// let y = b[yi];
			let y = i / 3 - 3;
			// b.splice(yi, 1);

			// let zi = Math.floor(Math.random() * c.length);
			// let z = c[zi];
			// z = z * 2 - this.n_cubes / 9;
			// z = z - this.n_cubes / 9;
			// z = z / 2;
			//z = z / 6;
			//z += 1;
			// if (z > 3) z = 4;
			let z = 1.5;
			// c.splice(zi, 1);

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
