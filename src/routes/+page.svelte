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


    

    let data;
    let dataTwo;
    let csvData = '';

    function export2CSV() {
        csvData = '';
        let csv = [];
        let colHeaders = '';
        let now = (new Date().toString()).split('GMT')[0];
        csv.push(['Id(ETag)', 'Title']);
        // csv[0] = csv[0].filter(entry => /\S/.test(entry));
        // console.log('csv: ', csv.join(','));
        colHeaders = csv.join(',');
        data.forEach((c, index) => {
        // dataTwo.forEach((c, index) => {
            csv.push([c.ETag, c.Key.normalize("NFD").replace(/\p{Diacritic}/gu, "")]);
            // csv.push([c.ETag, JSON.stringify(c.Metadata)]);
            // csv[index+1] = csv[index+1].filter(entry => /\S/.test(entry));
        });
        // console.log('csv: ', csv);
        csv.forEach((row, index) => {
            csv.splice(index,1,row.join(','));
        });
        csvData += csv.join('\n');
        // console.log('csv (string): ', csv.join('\n'));

        const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8,'});
        const objURL = URL.createObjectURL(blob);
        const csvLink = document.createElement('a');
        csvLink.setAttribute('href', objURL);
        csvLink.setAttribute('download', 'HARP SongList ' + now + '.csv');
        csvLink.setAttribute('display', 'none');
        csvLink.click();
    }

    let sWidth; 
    // console.log('g');

// IMPORTING INTO DB (!!WARNING!! – MAY OVERWRITE)    
    // async function attempt(){
    //     const att = await fetch('./api/mon');
    //     let attResp = await att.json();
    //     console.log('attResp: ', attResp);
    // }
    

    async function getSongs(){
        if($success)
            return;
        // const response = await fetch("./api/dOs");
        const response = await fetch("./api/dOs");
        let resp = await response.json();
        console.log('response', resp);

        const monResponse = await fetch('./api/monKey');
        let monRes = await monResponse.json();
        console.log('monRes: ', monRes);

        // const res = await fetch('./api/dOsMeta', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(resp)});
        // let resMeta =  await res.json();
        // let testMeta = [];
        // console.log('resMeta:', resMeta);
        // resMeta.forEach(m => {
        //     console.log(Object.keys(m.Metadata));
        //     let tempArr = [];
        //     tempArr = [...tempArr, Object.keys(m.Metadata)];
        //     console.log('tA: ', tempArr);
        //     if(m.Metadata && Object.keys(m.Metadata) && Object.keys(m.Metadata).length > 0)
        //         testMeta.push({ ETag: m.ETag , Metadata : m.Metadata });
        // });
        // console.log('metaFixed: ', testMeta);

        resp.Contents.forEach(c => {

            let firstKey = 'Name';
            let secondKey = 'Url';
            let thirdKey = 'Art'; 
            let fourthKey = 'Church';
            let fifthKey = 'eTag';
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
                Object.assign(newObj, { [fifthKey]: c.ETag});
                $bibAudios.push(newObj);
            } else if(c.Key.includes('Exposition')){
                Object.assign(newObj, { [firstKey]: c.Key.replace(/(([A-z])*(-)*([A-z])*(-)*([A-z])*([0-9])*\/)*(?=[^\.])*(\.mp3)*/, '')});
                Object.assign(newObj, { [secondKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [thirdKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                // Object.assign(newObj, { [fourthKey]: 'church'});
                Object.assign(newObj, { [fifthKey]: c.ETag});
                $expAudios.push(newObj);
            } else if(c.Key.includes('Songs')){
                Object.assign(newObj, { [firstKey]: c.Key.replace(/(([A-z])*(-)*([A-z])*(-)*([A-z])*([0-9])*\/)*(?=[^\.])*(\.mp3)*/g, '')});
                Object.assign(newObj, { [secondKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [thirdKey]: 'https://zaudio.fra1.cdn.digitaloceanspaces.com/' + c.Key});
                Object.assign(newObj, { [fourthKey]: c.Key.includes('TZ') ? 'Tabernáculo Zoe' : c.Key.includes('TVDA') ? 'Tabernáculo Voz de Aclamación' : c.Key.includes('TV') ? 'Tabernáculo Vida' : c.Key.includes('TSJ') ? 'Tabernáculo del Señor Jesucristo' : c.Key.includes('TIDD') ? 'Tabernáculo Iglesia de Dios' : c.Key.includes('TES') ? 'Tabernaculo El Shaddai' : c.Key.includes('TEA') ? 'Third Exodus Assembly' : c.Key.includes('TDC') ? 'Tabernáculo de Cúcuta' : c.Key.includes('TDA') ? 'Tabernáculo de Adoración' : c.Key.includes('TADA') ? 'Tabernáculo Alas de Aguila' : c.Key.includes('Misc') ? 'Misc.' : 'Unknown'});
                Object.assign(newObj, { [fifthKey]: c.ETag});
                $songs.push(newObj);
            } else{
                // console.log('unknown: ', c);
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
        data = resp.Contents;
        // dataTwo = testMeta;
        // console.log('data: ', data);
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
 <!-- <h5 on:click={() => export2CSV()}>download CSV</h5> -->
 <!-- <h5 on:click={() => attempt()}>import CSV to mon</h5> -->

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