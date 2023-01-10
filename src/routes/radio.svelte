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
</style>

<script>
import { audiosource, autoplaystate, isplaying, currentduration, showplayer } from "$lib/stores.js";
import { onMount } from "svelte";
let choices = [{Name:'Zoe Radio',Source:'https://zoeradio.ddns.net:8443/stream',Type:'Radio'},{Name:'TEA Radio',Source:'https://stlradio.out.airtime.pro/stlradio_a',Type:'Radio'}];


// function selectSource(s){
//     $showplayer = false;
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
function selectRadioSource(s){
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
        console.log('duplicate dummy');
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

function autoplay(song){
    $audiosource = [...$audiosource, song];
    $autoplaystate = true;
    $isplaying = true;
    $showplayer = true;
    $currentduration = 0;
}

</script>

<div>
    <h1>RADIO</h1>
    {#each choices as c}
        <div on:click={() => selectRadioSource(c)}>
            {c.Name} <br>
        </div>
    {/each}
</div>



<!-- <div class="home">
    <h1>
        ZR
    </h1>
    {#each choices as c}
        {c.Name}
        <Player sources = {c.Source} ><slot></slot></Player>
    {/each}
</div> -->
