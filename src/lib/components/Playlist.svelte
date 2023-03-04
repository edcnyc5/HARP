<script>
	import { songs, bibAudios, expAudios } from "../stores";
	import { createEventDispatcher } from "svelte";
	
	let listIsShowing = false;
	let dispatch = createEventDispatcher();
	
	const showPlayList = () => listIsShowing = !listIsShowing
</script>


<section id="playlist-cont w-full h-36">
	<button class="accordion bg-zinc-900"
					class:active={listIsShowing}
					on:click={showPlayList}>&#9776; Playlist</button>

	<ul class:show-list={listIsShowing}>
		{#each $songs as {Name, Url, Church}, i}
		<li data-track-id={i}
				on:click={() => dispatch('playList', {data: i, url: Url})}>
			<span>
				{Name} - 
			</span>
			<span class="italic font-light text-sm">
				{Church}
			</span>
		</li>
		{/each}
	</ul>
</section>


<style>
	/* section#playlist-cont { */
		/* width: 298px;	 */
		/* box-shadow: 0 0 5px #222;
		border-radius: 0 0 5px 5px;
		background: #333; */
	/* } */
	
	/* Style the buttons that are used to open and close the accordion panel */
	button.accordion {		
		/* background: #222; */
		/* color: #bbb; */
		margin: 0;
		padding: 5px 15px;
		width: 100%;
/* 		text-align: left; */
		border: none;
		outline: none;
		cursor: pointer;
		transition: 0.4s;
	}

	/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
	button.active {
		background-color: #888;
		color: black;
	}
	
	ul {
		list-style-type: none;
		background: #222;
		color: #ddd;
		margin: 0;
		padding: 0;
		border-radius: 0 0 5px 5px;
		height: 0;
		overflow: auto;
		transition: height .3s;
	}
	
	li {
		line-height: 150%;
		padding: 5px 5px 5px 20px;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
	}
	
	li:active, li:hover {
		background-color: #444;
	}
	
	.show-list {
		height: 9rem;
	}
</style>