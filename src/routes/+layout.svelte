<script>
    import "../app.css"
    import { onMount } from "svelte";
    import { songs, bibAudios, expAudios, currentTimeDisplay, audioFile, totalTrackTime, timeRemaining, songTime, trackIndex, trackTitle, trackChurch, trackETag } from "../lib/stores";
    import Player from "../lib/components/Player.svelte";
	import BotNav from "../lib/components/BotNav.svelte";

    let runningtime;
    let autoNext;

    const autoPlayNextTrack = () => {
        console.log('trackended, handling');
        if ($trackIndex <= $songs.length-2){
            $trackIndex += 1;
            // $audioFile.pause();
            loadTrack();
            $audioFile.play();
        } else {
            $trackIndex = 0;
            // $audioFile.pause();
            loadTrack();
            $audioFile.play();
        }
        console.log('finished handling ended');
    }

    const loadTrack = () => {
        $audioFile = new Audio($songs[$trackIndex].Url);
        $audioFile.onloadedmetadata = () => {
            $totalTrackTime = $audioFile.duration;
            $audioFile.setAttribute('title',$songs[$trackIndex].Name);
        }
        setTimeout(() => console.log('$audioFile: ', $audioFile),1000);
        $trackTitle = $songs[$trackIndex].Name;
        $trackChurch = $songs[$trackIndex].Church;
        $trackETag = $songs[$trackIndex].ETag;
        
    }


    $: if($audioFile) $audioFile.addEventListener('ended', autoPlayNextTrack);

    // autoNext = setInterval(() => {
    //     if($audioFile == null)
    //         return;
    //     if ($audioFile.ended) {
    //         autoPlayNextTrack();
    //     }
    // }, 300);

    runningtime = setInterval(() => {
                    if($audioFile == null)
                        return;
                    $currentTimeDisplay = $audioFile.currentTime;
                    let mins;
                    let secs;
                    let mins2;
                    let secs2;
                    let time = Math.floor($audioFile.currentTime);
                    if (time > 60){
                        mins = Math.floor((time) / 60);
                        secs = time % 60;
                    } else {
                        mins = '00';
                        secs = time;
                    }
                    $songTime = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
                    $timeRemaining = Math.floor($totalTrackTime - $currentTimeDisplay);
                    if ($timeRemaining > 60){
                        mins2 = Math.floor(($timeRemaining) / 60);
                        secs2 = $timeRemaining % 60;
                    } else {
                        mins2 = '00';
                        secs2 = $timeRemaining;
                    }
                    $timeRemaining = "-" + String(mins2).padStart(2, '0') + ':' + String(secs2).padStart(2, '0');
                    // console.log('runningTime running');
                    // if ($audioFile.ended) {
                    //     autoPlayNextTrack();
                    // }
                }, 1000);

</script>



<slot></slot>

<main class="h-full">
    <BotNav/>
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.black);
        color: theme(colors.white);
    }
</style>