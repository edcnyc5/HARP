<script>
	import { afterUpdate, onMount } from "svelte";
// export let trackTitle;
// export let trackChurch;
    import { trackTitle, trackChurch, songsMD, trackETag, specialList } from "../stores";
    let songMD;
    songMD = $songsMD.filter(s => s.etag == $trackETag);

    onMount(() => {
        songMD = $songsMD.filter(s => s.etag == $trackETag);
    })

    $: songMD = $songsMD.filter(s => s.etag == $trackETag);

    afterUpdate(() => {
        // setTimeout(() => {
            console.log('songMD: ', songMD);
        // },300)
    })
    
</script>

<div class="pt-2">
    <span>{$trackTitle}</span>
    <br/>
    <span class="italic font-light text-sm">{$trackChurch}
        {#if !specialList}
            {songMD[0].singer1 != '' ? ' — ' + songMD[0].singer1 : songMD[0].poet1 ? ' — ' + songMD[0].poet1 : ''}
            {songMD[0].singer2 != '' ? songMD[0].singer3 != '' ? ', ' + songMD[0].singer2 : ' & ' + songMD[0].singer2 : ''}
            {songMD[0].singer3 != '' ? songMD[0].singer4 != '' ? ', ' + songMD[0].singer3 : ' & ' + songMD[0].singer3 : ''}
            {songMD[0].singer4 != '' ? songMD[0].singer5 != '' ? ', ' + songMD[0].singer4 : ' & ' + songMD[0].singer4 : ''}
            {songMD[0].singer5 != '' ? ' & ' + songMD[0].singer5 : ''}
        {/if}    
    </span>
</div>

<style>
    div {
        text-align: center;
    }
    
    h3 {
        margin: 5px 0 10px;
    }
</style>