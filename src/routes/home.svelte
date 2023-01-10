<style>
    * {
        color: antiquewhite;
        margin: 0px;
        padding: 0px;
    }
    .home {
        height: 100vh;
    }
    audio {
        width: 100%;
        background-color: blue;
    }
    button {
        outline: none;
        background: transparent;
    }
    .songsFromSpace {
        height: 80px;
        max-width: 380px;
        overflow-y: overlay;
        font-size: 12px;
    }
    .songsFromSpace::-webkit-scrollbar {
        display: none;
    }
</style>

<script>
import { audiosource, autoplaystate, isplaying, ishome, issettings, spacesList, repoSongListRaw, audioList, showplayer, songList, bibleList } from "$lib/stores.js";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { each } from "svelte/internal";

let libchoices = [{Name:'Awaken Jesus (Brazil)',Source:'/songs/Awaken_Jesus_Brazil.mp3'},{Name:'Faith vs Death',Source:'/songs/faithvdeath.mp3'}];
let radiochoices = [{Name:'Zoe Radio',Source:'https://4a02-108-54-67-25.ngrok.io/stream'},{Name:'TEA Radio',Source:'https://stlradio.out.airtime.pro/stlradio_a'}];
let songSearch = '';
// let spacesList = {};


onMount(() => {
    if ($songList.length > 1){
        return
    } else {
        testAPI();
    }
})



// function selectSource(s){
//     console.log('selectedSource: ', s);
//     if ($audiosource.length < 1)
//     {
//         console.log('added s to empty[]')
//         $audiosource = [...$audiosource, s];
//         $autoplaystate = true;
//         $isplaying = true;
//         $showplayer = true;
//     } else if ($audiosource.includes(s)) {
//         console.log('duplicate dummy')
//     } else
//     {
//         $audiosource = [];
//         // $audiosource = $audiosource;
//         // $audiosource = [...$audiosource, s];
//         // $audiosource[0] = s;
//         console.log('replaced item 0 of array');
//         setTimeout(() => {
//             autoplay(s)
//         }, 5);
//     }
//     // $audiosource = $audiosource;
//     // $audiosource = s;
//     console.log('$audiosource from selectSource: ', $audiosource)
// }

function selectSource(s){
    $showplayer = false;
    console.log('selectedSource: ', s);
    if ($audiosource.length < 1)
    {
        console.log('added s to empty[]')
        $audiosource = [...$audiosource, s];
        $autoplaystate = true;
        $isplaying = true;
        $showplayer = true;
    } else if ($audiosource.includes(s)) {
        console.log('duplicate dummy')
        $showplayer = true;
        return
    } else
    {
        $audiosource = [];
        // $audiosource = $audiosource;
        // $audiosource = [...$audiosource, s];
        // $audiosource[0] = s;
        console.log('replaced item 0 of array');
        setTimeout(() => {
            autoplay(s)
        }, 5);
    }
    // $audiosource = $audiosource;
    // $audiosource = s;
    console.log('$audiosource from selectSource: ', $audiosource)
}

// function autoplay(song){
//     console.log('song: ', song)
//     $audiosource = [...$audiosource, song];
//     console.log('did this work lol, NEW audiosource: ', $audiosource);
//     $autoplaystate = true;
//     $isplaying = true;
//     $showplayer = true;
// }

function autoplay(song){
    $audiosource = [...$audiosource, song];
    $autoplaystate = true;
    $isplaying = true;
    $showplayer = true;
}



function libnav() {
    goto('library')
}
function radnav() {
    goto('radio')
}

async function testAPI(){
    if ($repoSongListRaw.length != 0){
        return;
    } else {
        const response = await fetch('${url.origin}/api/spaces.server');
        console.log('response: ', response.text());
        $spacesList = await response.json();
        console.log('contents: ', $spacesList);
        $repoSongListRaw = $spacesList.Contents;
        console.log('success');
        processList();
        return;
    }
}

function processList(){
    for (let song of $repoSongListRaw){
        // console.log(song);
        let preceding = 0;
        if (song.Key.substring(song.Key.length-1, song.Key.length) != "/"){
            preceding = song.Key.match(/(\/?[A-z]\w+\/[A-z]?[0-9]?\w+\/?)(\d+)?\/?/g)[0].length;
        }
        let firstKey = 'Name';
        let secondKey = 'Source';
        let thirdKey = 'Art'; 
        let fourthKey = 'Preceding';
        let newObj = {};

        Object.assign(newObj, { [firstKey]: song.Key});
        Object.assign(newObj, { [secondKey]: `https://zaudio.fra1.cdn.digitaloceanspaces.com/${song.Key}`});
        if (song.Key.includes('Songs') && song.Key.includes('TEA')) {
            Object.assign(newObj, { [thirdKey]: '/images/art/TEA-album.jpeg'});
        } else if (song.Key.includes('Songs') && song.Key.includes('TES')) {
            Object.assign(newObj, { [thirdKey]: '/images/art/telshaddai.jpeg'});
        } else if (song.Key.includes('Songs') && song.Key.includes('TZ')) {
            Object.assign(newObj, { [thirdKey]: '/images/art/zoe-album.jpeg'});
        } else if (song.Key.includes('Songs') && song.Key.includes('TDA')) {
            Object.assign(newObj, { [thirdKey]: '/images/art/tda.jpg'});
        } else if (song.Key.includes('Songs') && song.Key.includes('TSJ')) {
            Object.assign(newObj, { [thirdKey]: '/images/art/TSJ.jpg'});
        } else {
            Object.assign(newObj, { [thirdKey]: '/images/art/Thebride.svg'});
        }
        Object.assign(newObj, { [fourthKey]: [preceding]});
        $audioList = [...$audioList, newObj];
    }
    // console.log('repoSongList[790]: ', $repoSongListRaw[790].Key);
    // let songName = $repoSongListRaw[790].Key;
    // console.log('repoSongList[790]: ', $repoSongListRaw[790].Key.match(/(\/?[A-z]\w+\/[A-z]\w+\/)(\d+)?\/?/g));
    // console.log('repoSongList[790]: ', $repoSongListRaw[790].Key.match(/(\/?[A-z]\w+\/[A-z]\w+\/)(\d+)?\/?/g)[0].length);
    // let preceding = $repoSongListRaw[790].Key.match(/(\/?[A-z]\w+\/[A-z]\w+\/)(\d+)?\/?/g)[0].length;
    // console.log('repoSongList[790]: ', $repoSongListRaw[790].Key.substring(preceding, songName.length));
    
    console.log('processed')
    songsOnly();
    bibleOnly();
    // console.log($audioList)
}

function songsOnly() {
    $songList = [];
    console.log('started songsOnly');
    for (let song of $audioList){
        if (song.Name.includes('Songs')){
            // console.log(song.Name);
            // let preceding = 0;
            // if (song.Name.substring(song.Name.length-1, song.Name.length) != "/"){
            //     preceding = song.Name.match(/(\/?[A-z]\w+\/[A-z]\w+\/?)(\d+)?\/?/g)[0].length;
            // }
            if (song.Name.includes('.mp3')){
                song.Name = song.Name.substring(6, song.Name.length - 4);
                $songList = [...$songList, song];
            } else if (song.Name.includes('.m4a')) {
                song.Name = song.Name.substring(6, song.Name.length - 4);
                $songList = [...$songList, song];
            } else if (song.Name.substring(song.Name.length-1, song.Name.length) == "/") {
                continue;
            } else {
                song.Name = song.Name.substring(6, song.Name.length);
                $songList = [...$songList, song];
            }
        } else {
            continue;
        }
    }
    // console.log('songList:', $songList)
}
function bibleOnly() {
    $bibleList = [];
    console.log('started bibleOnly');
    for (let bibleaudio of $audioList){
        if (bibleaudio.Name.includes('Bible')){
            if (bibleaudio.Name.includes('.mp3')){
                bibleaudio.Name = bibleaudio.Name.substring(16, bibleaudio.Name.length - 4);
                $bibleList = [...$bibleList, bibleaudio];
            }
        } else {
            continue;
        }
    }
    // console.log('songList:', $songList)
}


</script>

<div>
    <h1>HOME</h1>
    <br>
    <h2>LIBRARY {$songList.length}</h2>
    <!-- {#each libchoices as c}
        <div on:click={() => libnav()}>
            {c.Name} <br>
        </div>
    {/each} -->
    <input type="text" bind:value={songSearch} placeholder="Search" />
    <div class="songlist">
        <div class="songsFromSpace">
            {#each $songList as s}
        <!-- <a href="https://zaudio.fra1.cdn.digitaloceanspaces.com/{s.Key}">{s.Key}</a><br> -->
                <div on:click={() => selectSource(s)}>
                    {s.Name}
                </div>
            {/each}
        </div>
    </div>
    <br>
    <h2>RADIO</h2>
    {#each radiochoices as c}
    <div on:click={() => radnav()}>
        {c.Name} <br>
    </div>
    {/each}
    <br>
    <h2>BIBLE</h2>
    <div class="songlist">
        <div class="songsFromSpace">
            {#each $bibleList as b}
        <!-- <a href="https://zaudio.fra1.cdn.digitaloceanspaces.com/{s.Key}">{s.Key}</a><br> -->
                <div on:click={() => selectSource(b)}>
                    {b.Name}
                </div>
            {/each}
        </div>
    </div>
</div>
<!-- <button class="test" on:click={() => testAPI()}>testAPI</button>
<button class="songListTest" on:click={() => processList()}>testProcess</button> -->
<!-- <button class="songListTest" on:click={() => songsOnly()}>testSongsOnly</button> -->
<!-- <div class="songlist">
    test songList:
    <div class="songsFromSpace">
        {#each $songList as s}
        <div on:click={() => selectSource(s)}>
            {s.Name}
        </div>
        {/each}
    </div>
</div> -->

<!-- <a href="https://zaudio.fra1.cdn.digitaloceanspaces.com/{s.Key}">{s.Key}</a><br> -->

<!-- <div class="home">
    <h1>
        ZR
    </h1>
    {#each choices as c}
        {c.Name}
        <Player sources = {c.Source} ><slot></slot></Player>
    {/each}
</div> -->
