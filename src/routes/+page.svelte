<script>
	import { afterUpdate, onMount } from "svelte";
	import Player from "../lib/components/Player.svelte";
	import Playlist from "../lib/components/Playlist.svelte";
	import ProgressBar from "../lib/components/ProgressBar.svelte";
	import TrackName from "../lib/components/TrackName.svelte";
    import { songs, bibAudios, expAudios } from "../lib/stores";

    let success = false;


    async function getSongs(){
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
                Object.assign(newObj, { [fourthKey]: c.Key.includes('TZ') ? 'Tabernáculo Zoe' : c.Key.includes('TVDA') ? 'Tabernáculo Voz de Aclamación' : c.Key.includes('TV') ? 'Tabernáculo Vida' : c.Key.includes('TSJ') ? 'Tabernáculo del Señor Jesucristo' : c.Key.includes('TIDD') ? 'Tabernáculo Iglesia de Dios' : c.Key.includes('TES') ? 'Tabernaculo El Shaddai' : c.Key.includes('TEA') ? 'Third Exodus Assembly' : c.Key.includes('TDC') ? 'Tabernáculo de Cúcuta' : c.Key.includes('TDA') ? 'Tabernáculo de Adoración' : c.Key.includes('TADA') ? 'Tabernáculo Alas de Aguila' : c.Key.includes('Misc') ? 'Misc.' : 'Unknown'});
                $songs.push(newObj);
            } else{
                console.log('unknown: ', c);
            }
            $songs = $songs.sort(randFunc);
            let test = setTimeout(() => {
                if($songs.length > 0){
                    loadTrack();
                    success = true;
                }
                if(success){
                    clearTimeout(test);
                }
            }, 500);

        });
    }

    function randFunc(a, b) {
        return 0.5 - Math.random();
    }

    onMount(() => {
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
    let trackIndex = 0;
    // let audioFile = new Audio($songs[trackIndex].Url);
    // let trackTitle = $songs[trackIndex].Name;
    let audioFile;
    let trackTitle;

    const loadTrack = () => {
        audioFile = new Audio($songs[trackIndex].Url);
        audioFile.onloadedmetadata = () => {
            totalTrackTime = audioFile.duration;
            updateTime();
        }
        trackTitle = $songs[trackIndex].Name;
    }

    const PlayNextTrack = () => {
        if (trackIndex <= $songs.length-1){
            trackIndex += 1;
            audioFile.pause();
            loadTrack();
            audioFile.play();
        } else {
            trackIndex = 0;
            audioFile.pause();
            loadTrack();
            audioFile.play();
        }
    }
    const autoPlayNextTrack = () => {
        if (trackIndex <= $songs.length-1){
            trackIndex += 1;
            // audioFile.pause();
            loadTrack();
            audioFile.play();
        } else {
            trackIndex = 0;
            audioFile.pause();
            loadTrack();
            audioFile.play();
        }
    }

    let totalTrackTime;
    $: console.log(totalTrackTime)
    if(audioFile != undefined){
        audioFile.onloadedmetadata = () => {
            totalTrackTime = audioFile.duration;
            updateTime();
        }
    }

    let totalTimeDisplay = 'loading...';
    let currentTimeDisplay = '0:00:00';
    let progress = 0;
    let trackTimer;

    function updateTime() {
		progress = audioFile.currentTime * (100 / totalTrackTime);
		
		let currHrs = Math.floor((audioFile.currentTime / 60) / 60);
		let currMins = Math.floor(audioFile.currentTime / 60);
		let currSecs = Math.floor(audioFile.currentTime - currMins * 60);
		
		let durHrs = Math.floor( (totalTrackTime / 60) / 60 );
		let durMins = Math.floor( (totalTrackTime / 60) % 60 );
		let durSecs =  Math.floor(totalTrackTime - (durHrs*60*60) - (durMins * 60));
		
		if(currSecs < 10) currSecs = `0${currSecs}`;
		if(durSecs < 10) durSecs = `0${durSecs}`;
		if(currMins < 10) currMins = `0${currMins}`;
		if(durMins < 10) durMins = `0${durMins}`;
		
		currentTimeDisplay = `${currHrs}:${currMins}:${currSecs}`;
		totalTimeDisplay = `${durHrs}:${durMins}:${durSecs}`;
		
		if (audioFile.ended) {
			toggleTimeRunning();
		}
	}

    const toggleTimeRunning = () => {
		if (audioFile.ended) {
			isPlaying = false;
			clearInterval(trackTimer);
			console.log(`Ended = ${audioFile.ended}`);
            autoPlayNextTrack();	
		} else {
			trackTimer = setInterval(updateTime, 100);
		}
	}

    // Controls
    let isPlaying = false;
    $: console.log(`isPlaying = ${isPlaying}`)

    const playPauseAudio = () => {
        if (audioFile.paused) {
            toggleTimeRunning()
            audioFile.play();
            isPlaying = true;
        } else {
            toggleTimeRunning()
            audioFile.pause();
            isPlaying = false;
        }
    }

    //Vol Slider
    let vol = 90;
    const adjustVol = () => audioFile.volume = vol / 100;

    //Playlist
    const handleTrack = (e) => {
        if (!isPlaying){
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            playPauseAudio(); //autoplay
        } else {
            isPlaying = false;
            audioFile.pause();
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            playPauseAudio(); //autoplay
        }
    }

    
</script>

<h1 class="text-3xl font-bold ">Welcome to HARP</h1>
<br/>
<!-- {#each $songs as s}
    <a href="{s.Url}">{s.Name}</a>
    <br/>
{/each} -->

{#if $songs.length > 0}
    <TrackName {trackTitle} />
    <ProgressBar {currentTimeDisplay}
                    {totalTimeDisplay}
                    {progress} />
    <Player {isPlaying}
            on:playPause={playPauseAudio}
            on:forward={PlayNextTrack}/>
    <Playlist on:click={handleTrack} />
{/if}




<style lang="postcss">
    :global(html) {
        background-color: theme(colors.black);
        color: theme(colors.white);
    }
</style>