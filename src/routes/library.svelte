<style>
    * {
        color: antiquewhite;
        margin: 0px;
        padding: 0px;
    }
    audio {
        width: 100%;
        background-color: blue;
    }
    .art {
        display: flex;
        flex-direction: column;
        margin: 3px;
        width: 100px;
    }
    .flex {
        display: flex;
        max-height: 223px;
        overflow-y: hidden;
    }
    .label {
        align-items: center;
        line-height: 0.5;
        position: relative;
        width: 100px;
        white-space: nowrap;
        justify-content: flex-start;
        font-size: 10px;
    }
    .ellipsis{
        position: relative;
        justify-content: flex-end;
        display: flex;
        flex: auto;
        margin-bottom: 10px;
        z-index: 1;
    }
    .menu{
        /* background-color: rgba(0, 255, 255, 0.344); */
        background: linear-gradient(rgb(50, 161, 161), 7%, black);
        width: 80vw;
        height: 100vh;
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 2;
    }
    .closeMenu{
        color: aliceblue;
        font-size: 50px;
        position: absolute;
        top: 0px;
        right: 0px;
    }
    li {
        list-style-type: none;
    }
    .menulist {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80vw;
        line-height: 40px;
        margin-top: 70px;
    }
    ::-webkit-scrollbar{
        width: 1px;
    }
    ::-webkit-scrollbar-track{
        background: none;
    }
    ::-webkit-scrollbar-thumb{
        background: none;
    }
    .art > .label > div {
        white-space: nowrap;
        overflow-x: clip;
        max-width: 95px;
    }


</style>

<script>
import { audiosource, autoplaystate, isplaying, ishome, issettings, showplayer, showMenu, menuitem, spacesList, repoSongListRaw, audioList, songList, bibleList } from "$lib/stores.js";
import { onMount } from "svelte";
import { fly } from "svelte/transition";
import CoverArt from "../lib/components/CoverArt.svelte";
let choices = [
    {
        Name:'Awaken Jesus (Brazil)',
        Source:'/songs/Awaken_Jesus_Brazil.mp3', 
        Art:'/images/art/telshaddai.jpeg'
    },
    {
        Name:'Faith vs Death',
        Source:'/songs/faithvdeath.mp3',
        Art:'/images/art/TEA-album.jpeg'
    },
    {
        Name:'El Gran Exodo',
        Source:'/songs/elgranexodo.mp3',
        Art:'/images/art/zoe-album.jpeg'
    },
    {
        Name:'Prometiste-Online-Test',
        Source:'https://zaudio.fra1.cdn.digitaloceanspaces.com/Songs/TZ/Prometiste.mp3',
        Art:'/images/art/zoe-album.jpeg'
    },
    {
        Name:'Não Me Deixara',
        Source:'https://zaudio.fra1.cdn.digitaloceanspaces.com/Songs/TES/Na%CC%83o%20Me%20Deixara.mp3',
        Art:'/images/art/telshaddai.jpeg'
    }
];




async function testAPI(){
    if ($repoSongListRaw.length != 0){
        return;
    } else {
        const response = await fetch('${url.origin}/api/spaces.server');
        console.log('response: ', response);
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

onMount(() => {
    if ($songList.length > 1){
        return
    } else {
        testAPI();
    }
})

function selectSource(s){
    $showplayer = false;
    console.log('selectedSource: ', s);
    if ($audiosource.length < 1)
    {
        console.log('added s to empty[]')
        $audiosource[0] = s;
        var randSong = $songList[Math.floor(Math.random()*$songList.length)];
            $audiosource.push(randSong);
            $audiosource.push(randSong);
            console.log('rando picked');
        $autoplaystate = true;
        $isplaying = true;
        $showplayer = true;
    } else if ($audiosource.includes(s)) {
        console.log('duplicate dummy')
        $showplayer = true;
        return
    } else
    {
        // $audiosource = [];
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

function addToQueue(s){
        $audiosource = [...$audiosource, s];
}

function autoplay(song){
    if ($audiosource[0] != null){
        $audiosource.unshift(song);
    } else {
        $audiosource[0] = song;
    }
    $autoplaystate = true;
    $isplaying = true;
    $showplayer = true;
}

function playnext(choice){
    console.log('original $audiosource: ', $audiosource);
    console.log('choice: ', choice);
    if ($audiosource.length < 1){
        $audiosource[1] = choice;
    } else {
        $audiosource.splice(1, 0, choice);
    }
    console.log('shifted $audiosource: ', $audiosource)
}
function Menu(choice){
    $menuitem = [];
    $showMenu = true;
    $menuitem = [...$menuitem, choice];
}

</script>

<div>
    <h1>LIBRARY</h1>
</div>
<div style="height: 370px; overflow: overlay;">
    <h2>TEA</h2>
    <div id="TEA" class="flex">
        {#each $songList as song}
        {#if song.Name.includes('TEA')}
        <div class='art'>
            <div class='flex label'>
                <div on:click={() => selectSource(song)}>
                    {song.Name.substring(song.Preceding - 6, song.Name.length)}
                </div>
                <div class="ellipsis" on:click={() => Menu(song)}>.<br>.<br>.</div>
            </div>
            <div on:click={() => selectSource(song)}>
                <CoverArt covers = {song.Art}></CoverArt>
            </div>
        </div>
        {/if}
        {/each}
    </div>
    <h2>TZ</h2>
    <div id="TZ" class="flex">
        {#each $songList as song}
        {#if song.Name.includes('TZ')}
        <div class='art'>
            <div class='flex label'>
                <div on:click={() => selectSource(song)}>
                    {song.Name.substring(song.Preceding - 6, song.Name.length)}
                </div>
                <div class="ellipsis" on:click={() => Menu(song)}>.<br>.<br>.</div>
            </div>
            <div on:click={() => selectSource(song)}>
                <CoverArt covers = {song.Art}></CoverArt>
            </div>
        </div>
        {/if}
        {/each}
    </div>
    <h2>TSJ</h2>
    <div id="TSJ" class="flex">
        {#each $songList as song}
        {#if song.Name.includes('TSJ')}
        <div class='art'>
            <div class='flex label'>
                <div on:click={() => selectSource(song)}>
                    {song.Name.substring(song.Preceding - 6, song.Name.length)}
                </div>
                <div class="ellipsis" on:click={() => Menu(song)}>.<br>.<br>.</div>
            </div>
            <div on:click={() => selectSource(song)}>
                <CoverArt covers = {song.Art}></CoverArt>
            </div>
        </div>
        {/if}
        {/each}
    </div>
    <br/>
    <div id="Unk" class="flex">
        {#each $songList as song}
        {#if !song.Name.includes('TEA') && !song.Name.includes('TZ') && !song.Name.includes('TSJ')}
        <div class='art'>
            <div class='flex label'>
                <div on:click={() => selectSource(song)}>
                    {song.Name.substring(song.Preceding - 6, song.Name.length)}
                </div>
                <div class="ellipsis" on:click={() => Menu(song)}>.<br>.<br>.</div>
            </div>
            <div on:click={() => selectSource(song)}>
                <CoverArt covers = {song.Art}></CoverArt>
            </div>
        </div>
        {/if}
        {/each}
    </div>
</div>
    
    
    
    
{#if $showMenu}
    <div class="menu" transition:fly="{{ x: 200, duration: 600}}">
        <ul>
            <div class="menulist">
                <li on:click={() => addToQueue($menuitem[0])}>Add to Queue</li>
                <li on:click={() => playnext($menuitem[0])}>Play Next</li>
                <li>Download</li>
                <li>Go to Album</li>
                <li>Go to Artist</li>
            </div>
        </ul>
        <div class="closeMenu" on:click={() => $showMenu = false}>x</div>
    </div>
{/if}


<!-- <div class="home">
    <h1>
        ZR
    </h1>
    {#each choices as c}
        {c.Name}
        <Player sources = {c.Source} ><slot></slot></Player>
    {/each}
</div> -->
