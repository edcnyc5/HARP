<script>
    import { goto } from "$app/navigation";
	import Player from "../../lib/components/Player.svelte";
	import PlayerMini from "../../lib/components/PlayerMini.svelte";
	import SearchResults from "../../lib/components/SearchResults.svelte";
    import { audioFile, isPlaying, trackIndex, songs, totalTrackTime, trackTitle, trackChurch, currentTimeDisplay, success } from "../../lib/stores";
    // $: console.log(`currentTimeDisplay = ${$currentTimeDisplay}`);

    let usrSearch;
    
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

    function searchFunc() {
        console.log('usrSearch: ', usrSearch);
    }

    function receivedSong(s) {
        console.log('receivedSong: ', s);
        let sIndex = $songs.indexOf(s);
        console.log('found in $songs list, at position: ', sIndex);
        $trackIndex = sIndex;
        $audioFile.pause();
        loadTrack();
        $audioFile.play();
    }



</script>

<h1 class="text-3xl font-bold p-1">Library</h1>
<div class="flex w-screen justify-around">
    <div class="bg-zinc-900 rounded-full w-4/5 h-10">
        <input class="w-full h-full bg-transparent px-3 focus:outline-none" type="text" bind:value={usrSearch} on:keyup={() => searchFunc()} name="search" id="search">
    </div>
</div>

{#if usrSearch}
    <div class="relative bg-zinc-900 w-screen h-[40rem] mt-5" id="searchList">
        <div class="static h-[40rem] overflow-auto">
            {#each $songs.filter(s => s.Name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.toLowerCase()) || s.Church.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.toLowerCase())) as sResult}
                <SearchResults {sResult}
                                on:passSong(sResult)={receivedSong(sResult)}/>
            {/each}
        </div>
    </div>
{/if}


<div>
    {#if $success}
        <PlayerMini on:playPause={playPauseAudio}
                    on:forward={PlayNextTrack}/>
    {/if}
</div>