<script>
    import { afterUpdate, createEventDispatcher } from 'svelte';
	import { songsMD } from '../stores';
	import CoverArtMiniRes from './CoverArtMiniRes.svelte';
    export let sResult;

	let songMD;
    songMD = $songsMD.filter(s => s.etag == sResult.ETag);
	
    let dispatch = createEventDispatcher();
	
	afterUpdate(() => {
		songMD = $songsMD.filter(s => s.etag == sResult.ETag);
	})


</script>





<div class="static w-full h-10 border-solid border-2 bg-zinc-900 border-zinc-900 shadow-sm shadow-zinc-300 my-px" id="btn-cont">
    <div class="w-1/12">
    </div>
    <div class="self-center w-10/12 h-10 truncate" on:click={() => dispatch('passSong')}>
        <span class="text-sw-full">
            {sResult.Name}
        </span>
        <br/>
        <span class="text-xs align-super">
            {sResult.Church}
			{songMD[0].singer1 != '' ? ' — ' + songMD[0].singer1 : songMD[0].poet1 ? ' — ' + songMD[0].poet1 : ''}
			{songMD[0].singer2 != '' ? songMD[0].singer3 != '' ? ', ' + songMD[0].singer2 : ' & ' + songMD[0].singer2 : ''}
			{songMD[0].singer3 != '' ? songMD[0].singer4 != '' ? ', ' + songMD[0].singer3 : ' & ' + songMD[0].singer3 : ''}
			{songMD[0].singer4 != '' ? songMD[0].singer5 != '' ? ', ' + songMD[0].singer4 : ' & ' + songMD[0].singer4 : ''}
			{songMD[0].singer5 != '' ? ' & ' + songMD[0].singer5 : ''}
        </span>
    </div>
    <div class="w-10" on:click={(e) => console.log('clicked on: ', e)}>
        <CoverArtMiniRes churchFull={sResult.Church}/>
    </div>
</div>


<style>
	#btn-cont {
		display: flex;
		justify-content: space-between;
        /* background: indianred; */
	}
	
	button {
		width: 37px;
		border: none;
		font-size: 2.3rem;
		padding: 0;
		cursor: pointer;
		margin: 0;
		background-color: transparent;
	}
	
	button:active {
		font-size: 2.2rem;
		background-color: transparent;
	}
	
	button img {
		width: 100%;
	}
</style>