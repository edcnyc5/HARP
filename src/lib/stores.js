import { writable, readable } from 'svelte/store';

export let success = writable(false);
export let isPlaying = writable(false);
export let refresh = writable(false);
export let songs = writable([]);
export let songsMD = writable([]);
export let bibAudios = writable([]);
export let expAudios = writable([]);
export let trackTitle = writable('');
export let trackChurch = writable('');
export let trackETag = writable('');
export let currentTimeDisplay = writable('');
export let totalTimeDisplay = writable('');
export let trackIndex = writable();
export let progress = writable();
export let totalTrackTime = writable();
export let audioFile = writable();
export let trackTimer = writable();
export let currHrs = writable();
export let currMins = writable();
export let currSecs = writable();
export let durHrs = writable();
export let durMins = writable();
export let durSecs = writable();
export let timeRemaining = writable();
export let songTime = writable();
