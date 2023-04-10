import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["draco/draco_decoder.js","draco/draco_decoder.wasm","draco/draco_encoder.js","draco/draco_wasm_wrapper.js","draco/gltf/draco_decoder.js","draco/gltf/draco_decoder.wasm","draco/gltf/draco_encoder.js","draco/gltf/draco_wasm_wrapper.js","draco/README.md","favicon.ico","fonts/test-financier-display-semibold.woff2","fonts/test-untitled-sans-regular.woff2","models/briefcase.glb","models/desk.glb","models/fax_machine.glb","models/handshake-orig.glb","models/handshake-phone.glb","models/plant.glb","robots.txt","textures/gradients/3.jpg","textures/gradients/5.jpg"]),
	mimeTypes: {".js":"application/javascript",".wasm":"application/wasm",".md":"text/markdown",".ico":"image/vnd.microsoft.icon",".woff2":"font/woff2",".glb":"model/gltf-binary",".txt":"text/plain",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-105ecca1.js","imports":["_app/immutable/start-105ecca1.js","_app/immutable/chunks/index-b8616c92.js","_app/immutable/chunks/singletons-ec68f809.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
