<script>
	import { afterUpdate, onMount } from "svelte";
// export let trackTitle;
// export let trackChurch;
    import { trackTitle, trackChurch, songsMD, trackETag } from "../stores";
    let songMD;
    songMD = $songsMD.filter(s => s.etag == $trackETag);

    onMount(() => {
        songMD = $songsMD.filter(s => s.etag == $trackETag);
    })

    afterUpdate(() => {
        songMD = $songsMD.filter(s => s.etag == $trackETag);
        console.log('songMD: ', songMD);
    })
</script>

<div class="pt-2">
    <span>{$trackTitle}</span>
    <br/>
    <span class="italic font-light text-sm">{$trackChurch}
        {songMD[0].singer1 != '' ? ' — ' + songMD[0].singer1 : songMD[0].poet1 ? ' — ' + songMD[0].poet1 : ''}
        {songMD[0].singer2 != '' ? songMD[0].singer3 != '' ? ', ' + songMD[0].singer2 : ' & ' + songMD[0].singer2 : ''}
        {songMD[0].singer3 != '' ? songMD[0].singer4 != '' ? ', ' + songMD[0].singer3 : ' & ' + songMD[0].singer3 : ''}
        {songMD[0].singer4 != '' ? songMD[0].singer5 != '' ? ', ' + songMD[0].singer4 : ' & ' + songMD[0].singer4 : ''}
        {songMD[0].singer5 != '' ? ' & ' + songMD[0].singer5 : ''}
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