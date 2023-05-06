<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
	import Player from "../../lib/components/Player.svelte";
	import PlayerMini from "../../lib/components/PlayerMini.svelte";
	import SearchResults from "../../lib/components/SearchResults.svelte";
    import { audioFile, isPlaying, trackIndex, songs, totalTrackTime, trackTitle, trackChurch, currentTimeDisplay, success,refresh, songsMD, trackETag, allChurches, allSBs, expSpnPList, bibSpnPList, customPList, specialList } from "../../lib/stores";
	import CoverArtMid from "../../lib/components/CoverArtMid.svelte";
    // $: console.log(`currentTimeDisplay = ${$currentTimeDisplay}`);

    let usrSearch;
    

    onMount(() => {
        if(!$success){
            goto('./');
        } else{
            sortFishYates($allChurches);
        }
    })
    
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
        $refresh = true;
        console.log('$ref:', $refresh);
        $audioFile = new Audio($songs[$trackIndex].Url);
        $audioFile.onloadedmetadata = () => {
            $totalTrackTime = $audioFile.duration;
        }
        console.log('$audioFile: ', $audioFile);
        $trackTitle = $songs[$trackIndex].Name;
        $trackChurch = $songs[$trackIndex].Church;
        $trackETag = $songs[$trackIndex].ETag;
        setTimeout(() => {
            $refresh = false;
            console.log('$refAft: ', $refresh);
        }, 100);
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

    function searchFunc() {
        // console.log('usrSearch: ', usrSearch);
        $songs = $songs;
    }

    function receivedSong(s) {
        console.log('receivedSong: ', s);
        let sIndex = $songs.indexOf(s);
        console.log('found in $songs list, at position: ', sIndex);
        $trackIndex = sIndex;
        $audioFile.pause();
        loadTrack();
        playPauseAudio();
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

    function sortFishYates(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    
    function libraryClick(libItem) {
        console.log('clicked libItem: ', libItem);
        if(libItem == 'Exposición'){
            $specialList = true;
            goto('./exp-spn');
        }
        if(libItem == 'Santa Biblia'){
            $specialList = true;
            goto('./bib-spn');
        }
    }
    
</script>

<h1 class="text-3xl font-bold p-1">Library</h1>
<div class="flex w-screen justify-around">
    <div class="bg-zinc-900 rounded-full w-4/5 h-10">
        <input class="w-full h-full bg-transparent px-3 focus:outline-none" type="text" bind:value={usrSearch} on:keyup={() => searchFunc()} name="search" id="search" placeholder="Search">
    </div>
</div>

{#if usrSearch}
    <div class="relative bg-zinc-900 w-screen h-96 mt-5" id="searchList">
        <div class="static h-96 overflow-auto">
            {#if $songs.filter(s => s.Name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.Church.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())).length > 0}
                By Song Title / Church:                
            {/if}
            {#each $songs.filter(s => s.Name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.Church.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())) as song (song)}
                <SearchResults sResult={song}
                                on:passSong={receivedSong(song)}/>
            {/each}
            {#if $songsMD.filter(s => s.singer1.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer2.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer3.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer4.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer5.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())).length > 0}
                By Worshipper:            
            {/if}
            {#each $songsMD.filter(s => s.singer1.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer2.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer3.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer4.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || s.singer5.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(usrSearch.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())) as song (song)}
                <SearchResults sResult={$songs.find(s => s.ETag == song.etag)}
                                on:passSong={receivedSong($songs.find(s => s.ETag == song.etag))}/>
            {/each}
        </div>
    </div>
{:else}
    <div class="relative mt-5">
        <span class="text-lg font-bold pt-12 pl-1">Churches:</span>
        <div class="mt-1 grid overflow-x-auto grid-rows-1 grid-flow-col gap-4 shadow shadow-zinc-900">
            {#each $allChurches as churchName}
                <div>
                    <CoverArtMid churchFull={churchName}></CoverArtMid>
                    <span class="text-xs grid leading-snug">{churchName}</span>
                </div>
            {/each}
        </div>
    </div>
    <div class="relative mt-5">
        <span class="text-lg font-bold pt-12 pl-1">Audio-Books:</span>
        <div class="mt-1 grid overflow-x-auto grid-rows-1 grid-flow-col gap-4 shadow shadow-zinc-900">
            {#each $allSBs as SBName}
                <div on:click={() => libraryClick(SBName)}>
                    <CoverArtMid churchFull={SBName}></CoverArtMid>
                    <span class="text-xs text-center grid leading-snug">{SBName}</span>
                </div>
            {/each}
        </div>
    </div>
{/if}


<div>
    {#if $success}
        <PlayerMini on:playPause={playPauseAudio}
                    on:forward={PlayNextTrack}
                    on:rewind={PlayLastTrack}/>
    {/if}
</div>