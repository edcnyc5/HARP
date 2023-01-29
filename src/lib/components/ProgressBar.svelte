<script>
    import { currentTimeDisplay, totalTimeDisplay, progress, audioFile, totalTrackTime, songTime, timeRemaining } from "../stores";
	// export let currentTimeDisplay;
	// export let totalTimeDisplay;
	// export let progress;

    // let songTime;
    // let timeRemaining;
    // let runningtime;
    let seek;

    function seek_to(){
        let seekval = seek.value;
        $audioFile.currentTime = seekval 
    }


</script>


<div id="time">
	<span id="progress-time">{$songTime}</span>
	<!-- <span id="progress-time">{$audioFile.currentTime}</span> -->
	<span id="track-duration">{$timeRemaining}</span>
</div>

<div class="seekdiv">
	<!-- <span id="bar" style="width: {$currentTimeDisplay}%"></span> -->
    <input type="range" id="seek" bind:this={seek} on:change={() => seek_to()} step="1" min="0" max={$totalTrackTime} value={$currentTimeDisplay}>
</div>


<style>
	#time {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	/* #progress-bar-cont {
		width: 100%;
		height: 10px;
		margin: .5rem 0 .5rem;
		display: flex;
		align-items: center;
		border: 1px solid #888;
		cursor: pointer;
	}

	#bar {
		width: 0%;
		height: 10px;
		background-color: goldenrod;
	} */

    .seekdiv{
        margin-bottom: 0px;
    }


    input[type=range] {
    height: 10px;
    -webkit-appearance: none;
    margin: 0px 0;
    /* width: 350px; */
    width: 100vw;
    }
    input[type=range]:focus {
    outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #ffffff;
    border: 1px solid #000000;
    }
    input[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 0px solid #000000;
    height: 17px;
    width: 10px;
    background: #eae1e1;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ffffff;
    }
    input[type=range]::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #3071A9;
    border-radius: 5px;
    border: 1px solid #000000;
    }
    input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 10px;
    width: 15px;
    background: #000000;
    cursor: pointer;
    }
    input[type=range]::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
    }
    input[type=range]::-ms-fill-lower {
    background: #3071A9;
    border: 1px solid #000000;
    box-shadow: 1px 1px 1px #000000;
    }
    input[type=range]::-ms-fill-upper {
    background: #3071A9;
    border: 1px solid #000000;
    box-shadow: 1px 1px 1px #000000;
    }
    input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 30px;
    width: 15px;
    background: #000000;
    cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
    background: #3071A9;
    }
    input[type=range]:focus::-ms-fill-upper {
    background: #3071A9;
    }
</style>