<style>
    * {
        color: antiquewhite;
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
import Player from "../lib/components/Player.svelte";
let choices = [{Name:'Zoe Radio',Source:'https://4a02-108-54-67-25.ngrok.io/stream'},{Name:'TEA Radio',Source:'https://stlradio.out.airtime.pro/stlradio_a'}];
 
</script>



<div class="home">
    <h1>
        ZR
    </h1>
    {#each choices as c}
        {c.Name}
        <Player sources = {c.Source} ><slot></slot></Player>
    {/each}
</div>
