<script>
    import { createEventDispatcher } from 'svelte';
    export let sResult;

    let dispatch = createEventDispatcher();


</script>





<div class="static w-full h-10 border-solid border-2 bg-zinc-900 border-zinc-900 shadow-sm shadow-zinc-300 my-px" id="btn-cont">
    <div class="w-1/12">
    </div>
    <div class="self-center w-9/12 h-10 truncate" on:click={() => dispatch('passSong(sResult)')}>
        <span class="text-sw-full">
            {sResult.Name}
        </span>
        <br/>
        <span class="text-xs align-super">
            {sResult.Church}
        </span>
    </div>
    <div class="w-10" on:click={(e) => console.log('clicked on: ', e)}>
        <div class="text-xs ">image</div>
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