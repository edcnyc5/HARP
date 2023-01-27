import { writable, readable } from 'svelte/store';

export let songs = writable([]);
export let bibAudios = writable([]);
export let expAudios = writable([]);
