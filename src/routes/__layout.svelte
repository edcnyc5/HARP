<style>
    * {
        color: antiquewhite;
        margin: 0px;
        padding: 0px;
    }
    .settings{
        background-color: rgba(0, 255, 255, 0.18);
        height: 100vh;
        color: antiquewhite;
    }
    .close_settings{
        position: absolute;
        right: 50px;
        top: 50px;
        color: white;
    }
</style>


<script>
import Nav from "../lib/components/Nav.svelte";
import Player from "../lib/components/Player.svelte";
import Player_testing from "../lib/components/Player_testing.svelte";
import { issettings, showplayer } from "$lib/stores.js";
import { fly } from "svelte/transition";
import { goto } from "$app/navigation";

// export const prerender = true;

function settingsClose(){
    $issettings = false;
    goto('home')
}

</script>

<Nav></Nav>

<!-- {#if $showplayer}
<Player/>
{/if} -->

{#if $showplayer}
<Player_testing/>
{/if}

<!-- <iframe src="/static/audio/silence.mp3" type=”audio/mp3″ allow=”autoplay” id=”audio” style=”display:none”></iframe> -->


{#if $issettings}
<div class="settings" transition:fly="{{ x: 50, duration: 700 }}">
    <div class="close_settings" on:click={() => {settingsClose()}}>Close X</div>
    <div> 
        <h1>
            SETTINGS
        </h1> 
    </div>
</div>
{/if}

<div>
    <slot></slot>
</div>