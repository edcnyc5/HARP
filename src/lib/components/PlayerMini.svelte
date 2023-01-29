<script>
	import { createEventDispatcher } from 'svelte';
    import { isPlaying } from "../stores";
	import TrackNameMini from './TrackNameMini.svelte';
    import { goto } from "$app/navigation";
	
	let dispatch = createEventDispatcher();
	
	const icons = {
		play: "https://freesvg.org/img/media-playback-start.png",
		pause: "https://freesvg.org/img/media-playback-pause.png",
		rewind: "https://freesvg.org/img/media-skip-backward.png",
		fwd: "https://freesvg.org/img/media-skip-forward.png"
	}
	
//   export let isPlaying;
	
</script>


<div class="w-full h-10" id="btn-cont">
    <div>
        <button id="rewind" on:click={() => dispatch('rewind')}>
            <img src={icons.rewind} alt="rewind"/>
        </button>
        <button id="play" on:click={() => dispatch('playPause')}>
            <img src={$isPlaying ? icons.pause : icons.play} 
                     alt="play"/>
        </button>
        <button id="forward" on:click={() => dispatch('forward')}>
            <img src={icons.fwd} alt="forward"/>
        </button>
    </div>
    <div class="self-center w-7/12 h-10 p-1" on:click={() => goto('./')}>
        <TrackNameMini/>
    </div>
    <div class="w-10" on:click={() => goto('./')}>
        <div class="text-xs ">image</div>
    </div>
</div>

<style>
	#btn-cont {
        position: absolute;
        bottom: 59px;
		display: flex;
		justify-content: space-between;
        background: indianred;
	}
	
	button {
		width: 37px;
		border: none;
		font-size: 2.3rem;
		padding: 0;
		cursor: pointer;
		margin: 0;
		background-color: transparent;
	}
	
	button:active {
		font-size: 2.2rem;
		background-color: transparent;
	}
	
	button img {
		width: 100%;
	}
</style>