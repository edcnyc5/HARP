<script>
	import { afterUpdate, onMount } from "svelte";
	import CoverArt from "../lib/components/CoverArt.svelte";
	import Player from "../lib/components/Player.svelte";
	import Playlist from "../lib/components/Playlist.svelte";
	import ProgressBar from "../lib/components/ProgressBar.svelte";
	import TrackName from "../lib/components/TrackName.svelte";
    import { songs, bibAudios, expAudios, success, trackTitle, trackChurch, 
        totalTrackTime, isPlaying, trackIndex, currentTimeDisplay, totalTimeDisplay, 
        progress, audioFile, trackTimer, currHrs, currMins, currSecs, durHrs, durMins, 
        durSecs, refresh } from "../lib/stores";

    let sWidth; 
    console.log('g');
    

    async function getSongs(){
        if($success)
            return;
        const response = await fetch("./api/dOs");
        let resp = await response.json();
        console.log('response', resp);
        resp.Contents.forEach(c => {

            let firstKey = 'Name';
            let secondKey = 'Url';
            let thirdKey = 'Art'; 
            let fourthKey = 'Church';
            let newObj = {};

            // console.log(c.Key.substring(c.Key.length - 1)); 
            if(c.Key.includes('backup')){
                console.log('skip');
            } else if(c.Key.substring(c.Key.length - 1) == '/'){
                console.log('folder');
            } else if(c.Key.includes('Bible')) {
                Object.assign(newObj, { [firstKey]: c.Key.replace(/(([A-z])*(-)*([A-z])*(-)*([A-z])*([0-9])*\/)*(?=[^\.])*(\.mp3)*/, '')});
                Object.assign(newObj, { [secondKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [thirdKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                // Object.assign(newObj, { [fourthKey]: 'church'});
                $bibAudios.push(newObj);
            } else if(c.Key.includes('Exposition')){
                Object.assign(newObj, { [firstKey]: c.Key.replace(/(([A-z])*(-)*([A-z])*(-)*([A-z])*([0-9])*\/)*(?=[^\.])*(\.mp3)*/, '')});
                Object.assign(newObj, { [secondKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [thirdKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                // Object.assign(newObj, { [fourthKey]: 'church'});
                $expAudios.push(newObj);
            } else if(c.Key.includes('Songs')){
                Object.assign(newObj, { [firstKey]: c.Key.replace(/(([A-z])*(-)*([A-z])*(-)*([A-z])*([0-9])*\/)*(?=[^\.])*(\.mp3)*/g, '')});
                Object.assign(newObj, { [secondKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [thirdKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [fourthKey]: c.Key.includes('TZ') ? 'Tabern??culo Zoe' : c.Key.includes('TVDA') ? 'Tabern??culo Voz de Aclamaci??n' : c.Key.includes('TV') ? 'Tabern??culo Vida' : c.Key.includes('TSJ') ? 'Tabern??culo del Se??or Jesucristo' : c.Key.includes('TIDD') ? 'Tabern??culo Iglesia de Dios' : c.Key.includes('TES') ? 'Tabernaculo El Shaddai' : c.Key.includes('TEA') ? 'Third Exodus Assembly' : c.Key.includes('TDC') ? 'Tabern??culo de C??cuta' : c.Key.includes('TDA') ? 'Tabern??culo de Adoraci??n' : c.Key.includes('TADA') ? 'Tabern??culo Alas de Aguila' : c.Key.includes('Misc') ? 'Misc.' : 'Unknown'});
                $songs.push(newObj);
            } else{
                console.log('unknown: ', c);
            }
        });

        $songs = $songs.sort(randFunc);
            // let test = setTimeout(() => {
            //     if($songs.length > 0){
            //         loadTrack();
            //         success = true;
            //     }
            //     if(success){
            //         clearTimeout(test);
            //     }
            // }, 500);

            if($songs.length > 0){
                $trackIndex = 0;
                $progress = 0;
                $totalTimeDisplay = 'loading...';
                $currentTimeDisplay = '0:00:00';
                loadTrack();
                $success = true;
                console.log('success, data loaded');
            }
        console.log('$songs: ', $songs);
    }

    function randFunc(a, b) {
        return 0.5 - Math.random();
    }

    onMount(() => {
        sWidth = window.screen.width;
        getSongs();
    })

    // afterUpdate(() => {
    //     if($songs.length > 0){
    //         $songs = $songs;
    //         console.log('songs.length: ', $songs.length);
    //         console.log('songs: ', $songs);
    //         if(!success){

    //         }
    //     }
    // })

    // onMount(() => {
    //     $songs = $songs;
    //     console.log('songs.length: ', $songs.length);
    //     console.log('songs: ', $songs);
    // })

        // Get Audio track
    // let trackIndex = 0;
    // let audioFile = new Audio($songs[trackIndex].Url);
    // let trackTitle = $songs[trackIndex].Name;
    // let audioFile;
    // let trackTitle;
    // let trackChurch;

    const loadTrack = () => {
        $refresh = true;
        $audioFile = new Audio($songs[$trackIndex].Url);
        $audioFile.onloadedmetadata = () => {
            $totalTrackTime = $audioFile.duration;
            updateTime();
        }
        console.log('$audioFile: ', $audioFile);
        $trackTitle = $songs[$trackIndex].Name;
        $trackChurch = $songs[$trackIndex].Church;
        setTimeout(() => {
            $refresh = false;
            console.log('$refAfter: ', $refresh);
        }, 510);
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
    const autoPlayNextTrack = () => {
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
    }

    // let totalTrackTime;
    $: console.log($totalTrackTime)
    if($audioFile != undefined){
        $audioFile.onloadedmetadata = () => {
            $totalTrackTime = $audioFile.duration;
            updateTime();
        }
    }

    // if($totalTimeDisplay == '')
    //     $totalTimeDisplay = 'loading...';
    // if($currentTimeDisplay == '')
    //     $currentTimeDisplay = '0:00:00';
    // let trackTimer;

    function updateTime() {
		// $progress = $audioFile.currentTime * (100 / $totalTrackTime);
		
		// $currHrs = Math.floor(($audioFile.currentTime / 60) / 60);
		// $currMins = Math.floor($audioFile.currentTime / 60);
		// $currSecs = Math.floor($audioFile.currentTime - $currMins * 60);
		
		// $durHrs = Math.floor( ($totalTrackTime / 60) / 60 );
		// $durMins = Math.floor( ($totalTrackTime / 60) % 60 );
		// $durSecs =  Math.floor($totalTrackTime - ($durHrs*60*60) - ($durMins * 60));
		
		// // let currHrs = Math.floor(($audioFile.currentTime / 60) / 60);
		// // let currMins = Math.floor($audioFile.currentTime / 60);
		// // let currSecs = Math.floor($audioFile.currentTime - currMins * 60);
		
		// // let durHrs = Math.floor( ($totalTrackTime / 60) / 60 );
		// // let durMins = Math.floor( ($totalTrackTime / 60) % 60 );
		// // let durSecs =  Math.floor($totalTrackTime - (durHrs*60*60) - (durMins * 60));
		
		// if($currSecs < 10) $currSecs = `0${$currSecs}`;
		// if($durSecs < 10) $durSecs = `0${$durSecs}`;
		// if($currMins < 10) $currMins = `0${$currMins}`;
		// if($durMins < 10) $durMins = `0${$durMins}`;
		
		// $currentTimeDisplay = `${$currHrs}:${$currMins}:${$currSecs}`;
		// $totalTimeDisplay = `${$durHrs}:${$durMins}:${$durSecs}`;
		
		// if ($audioFile.ended) {
		// 	toggleTimeRunning();
		// }
        console.log('updateTime runs');
	}

    const toggleTimeRunning = () => {
		if ($audioFile.ended) {
			$isPlaying = false;
			clearInterval($trackTimer);
			console.log(`Ended = ${$audioFile.ended}`);
            autoPlayNextTrack();	
		} else {
			$trackTimer = setInterval(updateTime, 100);
		}
	}

    // Controls
    // let isPlaying = false;
    $: console.log(`isPlaying = ${$isPlaying}`)
    // $: console.log(`currentTimeDisplay = ${$currentTimeDisplay}`)

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

    //Vol Slider
    let vol = 90;
    const adjustVol = () => $audioFile.volume = vol / 100;

    //Playlist
    const handleTrack = (e) => {
        if (!$isPlaying){
            // console.log('e: ', e);
            // console.log('e.target: ', e.target);
            // console.log('e.detail: ', e.detail);
            // console.log('e.target.dataset.trackId: ',e.target.dataset.trackId);
            $trackIndex = Number(e.detail.data);
            loadTrack();
            playPauseAudio(); //autoplay
        } else {
            // console.log('e.target.dataset.trackId: ', e.target.dataset.trackId);
            $isPlaying = false;
            $audioFile.pause();
            $trackIndex = Number(e.detail.data);
            loadTrack();
            playPauseAudio(); //autoplay
        }
    }

    const PlayLastTrack = () => {
        if ($trackIndex >= 1){
            console.log('trackIndex >= 1 (from PlayLastTrack)');
            $trackIndex -= 1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        } else {
            console.log('else (from PlayLastTrack)');
            $trackIndex = $songs.length-1;
            console.log('$trackIndex: ', $trackIndex);
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        }
    }

    
</script>

<h1 class="text-3xl font-bold p-1">Welcome to H.A.R.P.</h1>
<br/>
<!-- {#each $songs as s}
    <a href="{s.Url}">{s.Name}</a>
    <br/>
{/each} -->

{#if $success}
    {#if !$refresh}
        <CoverArt/>
    {:else}
        <div style="height: 13.9rem; width: 4rem"></div>
    {/if}
    <TrackName/>
    <ProgressBar/>
    <Player on:playPause={playPauseAudio}
            on:forward={PlayNextTrack}
            on:rewind={PlayLastTrack}/>
    <Playlist on:playList={handleTrack} />
{/if}





<!-- <style lang="postcss">
    :global(html) {
        background-color: theme(colors.black);
        color: theme(colors.white);
    }
</style> -->