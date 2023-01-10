export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/home.svelte"),
	() => import("../../src/routes/home_dep.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/library.svelte"),
	() => import("../../src/routes/radio.svelte"),
	() => import("../../src/routes/radio_dep.svelte"),
	() => import("../../src/routes/settings_dep.svelte")
];

export const dictionary = {
	"": [[0, 4], [1]],
	"home": [[0, 2], [1]],
	"home_dep": [[0, 3], [1]],
	"library": [[0, 5], [1]],
	"radio": [[0, 6], [1]],
	"radio_dep": [[0, 7], [1]],
	"settings_dep": [[0, 8], [1]]
};