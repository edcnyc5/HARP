import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	//identify a base path for the app
	//config.kit.prerender

	kit: {
		adapter: adapter({
			out: 'build'
		}),
		vite: {
			server: {
				// hmr: {
				// 	clientPort: 443,
				// 	host: 'f381-108-6-20-18.ngrok.io',
				// },
				// fs: {
				// 	allow: ['./static']
				// },
				// cors: true
			}
		}

	}
};

export default config;
