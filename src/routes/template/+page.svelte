<script>
    import { goto } from "$app/navigation";
	import Player from "../../lib/components/Player.svelte";
	import PlayerMini from "../../lib/components/PlayerMini.svelte";
    import { audioFile, isPlaying, trackIndex, songs, totalTrackTime, trackTitle, trackChurch, currentTimeDisplay, success } from "../../lib/stores";
    // $: console.log(`currentTimeDisplay = ${$currentTimeDisplay}`);

    
    const playPauseAudio = () => {
        if ($audioFile.paused) {
            // toggleTimeRunning();
            $audioFile.play();
            $isPlaying = true;
        } else {
            // toggleTimeRunning();
            $audioFile.pause();
            $isPlaying = false;
        }
    }

    const loadTrack = () => {
        $audioFile = new Audio($songs[$trackIndex].Url);
        $audioFile.onloadedmetadata = () => {
            $totalTrackTime = $audioFile.duration;
        }
        console.log('$audioFile: ', $audioFile);
        $trackTitle = $songs[$trackIndex].Name;
        $trackChurch = $songs[$trackIndex].Church;
    }

    const PlayNextTrack = () => {
        if ($trackIndex <= $songs.length-2){
            $trackIndex += 1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        } else {
            $trackIndex = 0;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        }
    }

    const PlayLastTrack = () => {
        if ($trackIndex >= 1){
            $trackIndex -= 1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        } else {
            $trackIndex = $songs.length-1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        }
    }


</script>

<h1 class="text-3xl font-bold p-1">Home</h1>

<h2 class="text-md font-bold p-1">{@html 'Coming Soon! :)'}</h2>

<div class="flex fixed w-screen justify-around bottom-28 text-sm font-bold ">
    Click below to return to the Welcome Screen! 
</div>
<div>
    {#if $success}
        <PlayerMini on:playPause={playPauseAudio}
                    on:forward={PlayNextTrack}
                    on:rewind={PlayLastTrack}/>
    {/if}
</div>
