import Experience from '../Experience.js';
import Environment from './Environment.js';
import Mac from './Mac.js';

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.mouse = new Mac();
			this.environment = new Environment();
		});
	}

	update() {
		if (this.mouse) this.mouse.update();
	}
}
