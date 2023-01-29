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
        if ($trackIndex <= $songs.length-1){
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



</script>

<div>
    {#if $success}
        <PlayerMini on:playPause={playPauseAudio}
                    on:forward={PlayNextTrack}/>
    {/if}
</div>
<div></div>