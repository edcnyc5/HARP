<style>
    * {
        color: antiquewhite;
        margin: 0px;
        padding: 0px;
    }
    #play {
        filter: invert(1);
        height: 100px;
    }
    #pause{
        filter: invert(1);
        height: 100px;
    }
    #prev{
        filter: invert(1);
        height: 50px;
    }
    #next{
        filter: invert(1);
        height: 50px;
    }
    .player{
        width: 100vw;
        height: 18vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        bottom: 100px;
    }
    .hide{
        width: 0px;
        filter: invert(1);
    }
    .mini{
        transform: scale(0.5);
        flex-direction: row;
        bottom: 50px;
    }
    .inv{
        transform: scale(0.01);
        position:absolute;
        bottom: 0px;
        right: 0px;
    }
    button{
        background: none;
        border: none;
    }
    .controls{
        display: flex;
        align-items: center;
        margin-top: -10px;
    }
    .songtimes{
        width: 350px;
        display: flex;
        justify-content: space-between;
    }
    .seekdiv{
        margin-bottom: 0px;
    }


input[type=range] {
  height: 10px;
  -webkit-appearance: none;
  margin: 0px 0;
  width: 350px;
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

<script>
    import { onMount, onDestroy, afterUpdate } from "svelte";
    //import { audioData } from "$lib/audioData.js";
    import { isplaying, audiosource, autoplaystate, showplayer, currenttime, currentduration, lastvol, prevsource, songList } from "$lib/stores.js";
    import CoverArt from "./CoverArt.svelte";
    import Player from "./Player.svelte";

    let intervalClear = false;
    
    // let sources = $audiosource;
    
    // onMount(() => {
    //     if ($audiosource.length > 0){
    //         start();
    //         console.log('$audiosource.length from onMount>Player: ', $audiosource.length)
    //     } else {
    //         console.log('else activated');
    //         console.log('else activated, $audiosource: ', $audiosource);
    //         console.log('else activated, $audiosource length: ', $audiosource.length)
    //         return
    //     }
    //     console.log('$audiosource: ', $audiosource);
    // })

    onMount(() => {
        console.log('player created');
    })

    onDestroy(() => {
        console.log('player destroyed');
        clearInterval(runningtime); 
        // intervalClear = true;
        // setTimeout(() => {
        //     intervalClear = false;
        // }, 1000)
    })
        
    let runningtime;
    var player;
    var vol;
    var divshow;
    var seek;
    let songTime;
    let timeRemaining;

    function start() {
        player.controls = false;
    }

    function play_audio() {
        player.play();
        console.log('source from play_audio: ', $audiosource[0].Source)
        $isplaying = true;
        // $currentduration = 0;
        console.log('player.currentTime: ', player.currentTime);
        $currenttime = player.currentTime;
    } 
    function pause_audio() {
        player.pause();
        $isplaying = false;
    }
    function stop_audio() {
        player.pause();
        player.currentTime = 0;
        $audiosource = [];
    }
    function change_vol(){
        player.volume=vol.value;
        $lastvol = player.volume;
        console.log('$lastvol: ', $lastvol);
        console.log('vol: ', vol);
        console.log('player.volume: ', player.volume);
    }
    function seek_to(){
        let seekval = seek.value;
        player.currentTime = seekval 
    }
    function next(){
        $prevsource = [...$prevsource, $audiosource[0]];
        if ($audiosource.length < 3){
            var randSong = $songList[Math.floor(Math.random()*$songList.length)];
            var randSong2 = $songList[Math.floor(Math.random()*$songList.length)];
            $audiosource.push(randSong);
            $audiosource.push(randSong2);
            console.log('rando picked');
            console.log($audiosource);
        }
        $audiosource.shift();
        setTimeout(() => {
            $autoplaystate = true;
            $showplayer = true;
        }, 2);
        console.log('player is: ', player);
        player.load();
        // fetchAudioAndPlay();
        $showplayer = false;
        
        // var playPromise = player.play();

        // if (playPromise !== undefined) {
        //     playPromise.then(_ => {
        //         //auto playback started
        //         //playing
        //     })
        //     .catch(error => {
        //         //auto play prevented
        //         //paused
        //         console.log('error: ', error)
        //     });
        // }


        // function fetchAudioAndPlay() {
        //     console.log('started fetchAudioAndPlay');
        //     fetch($audiosource[0].Source)
        //     .then(response => {response.blob(); console.log(response);})
        //     .then(blob => {
        //         // console.log(blob);
        //         // const stream = new MediaStream()
        //         // stream.addTrack(blob)
        //         audio_player.srcObject = blob;
        //         return audio_player.play()
        //     })
        //     .then(_ => {
        //         //audio playback started
        //         console.log('cool');
        //         auto_play();
        //     })
        //     .catch(e => {
        //         //playback failed
        //         console.log('error: ', e)
        //     })
        // }

        auto_play();
        console.log('audiosource: ', $audiosource)
        console.log('prevsource: ', $prevsource)
    }
    function prev(){
        if ($prevsource.length < 1){
            var randSong = $songList[Math.floor(Math.random()*$songList.length)];
            $prevsource.push(randSong);
            console.log('rando picked');
        }
        $audiosource.unshift($prevsource[$prevsource.length - 1]);
        $prevsource.pop();
        $showplayer = false;
        setTimeout(() => {
            $autoplaystate = true;
            $showplayer = true;
        }, 3);
        auto_play();
        console.log('audiosource: ', $audiosource)
        console.log('prevsource: ', $prevsource)
    }
    function autonext(){
        // if (player.ended){
        //     next();
        // }
    }

    function auto_play(){
        if ($autoplaystate){
            setTimeout(() => {
                // console.log('player: ', player);
                // player.load();
                //console.log('not cool')
                audio_player.play();
                runningtime = setInterval(() => {
                    $currenttime = player.currentTime;
                    let mins;
                    let secs;
                    let mins2;
                    let secs2;
                    let time = Math.floor(player.currentTime);
                    if (time > 60){
                        mins = Math.floor((time) / 60);
                        secs = time % 60;
                    } else {
                        mins = '00';
                        secs = time;
                    }
                    songTime = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
                    timeRemaining = Math.floor($currentduration - $currenttime);
                    if (timeRemaining > 60){
                        mins2 = Math.floor((timeRemaining) / 60);
                        secs2 = timeRemaining % 60;
                    } else {
                        mins2 = '00';
                        secs2 = timeRemaining;
                    }
                    timeRemaining = "-" + String(mins2).padStart(2, '0') + ':' + String(secs2).padStart(2, '0');
                    autonext();
                }, 1000);
                setTimeout(() => {
                    $currentduration = player.duration;
                    console.log("current duration: ", player.duration);
                }, 5500);
            }, 10);
            console.log('autoplay activated');
            $autoplaystate = false;
        } else {
            console.log('???')
            console.log('is autoplay... not true?: ', $autoplaystate)
        }
    }

    // function volval(){
    //     if (){
    //         console.log('test1');
    //         return $lastvol;
    //     } else {
    //         console.log('test2');
    //         return 1;
    //     }
    // }

    // function hotupdatesong() {
    //     let source = $audiosource;
    //     console.log('source.Source: ', source[0].Source);
    //     return source[0].Source;
    // }

    //console.log('from player_testing: ',audioData[0].resources[2]);
    let trackIndex = 0;
    // let audioFile;
    // let audioFile = new Audio(audioData[0].resources[2]);
    console.log('audiosource: ', $audiosource)
    let audioFile = new Audio($audiosource[1].Source);
    let audioFile2 = async () => new Audio($audiosource[2].Source);
    // audioFile.play();
    if ($audiosource.length < 3){
        let randSong = $songList[Math.floor(Math.random()*$songList.length)];
            $audiosource.push(randSong);
            console.log('rando picked');
    }

    const autoPlayNextTrack = () => {
        if (trackIndex == 0) {
            audio_player.play();
        }
    }
    // const pause2 = () => {
    //     if (audioFile.paused){
    //         audioFile.play();
    //     } else {
    //         audioFile.pause();
    //     }
    // }

    function pause2() {
        // audioFile.play();
    }

    let autoCount = 0;

    console.log('activated myAddListener');
    function myAddListener() {
        setTimeout(() => {
            const endCheck = setInterval(() => {
                if (player && player.ended){
                    autoCount++;
                    console.log('player present');
                    player.addEventListener('ended', next(), false);
                    audioFile.autoplay = true;

                    var playPromise = audioFile.play();

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            //auto playback started
                            //playing
                            audioFile = audioFile;
                        })
                        .catch(error => {
                            //auto play prevented
                            //paused
                            console.log('error: ', error);
                            audioFile2.autoplay = true;
                            
                            var playPromise2 = audioFile2.play();

                            if (playPromise2 !== undefined) {
                                playPromise2.then(_ => {
                                    //auto playback started
                                    //playing
                                })
                                .catch(error => {
                                    //auto play prevented
                                    //paused
                                    console.log('error: ', error)
                                });
                            }



                        });
                    }


                    audioFile.play();
                    audioFile.addEventListener('ended', next(), false);
                if (audioFile && audioFile.ended) {
                        audioFile2.play();
                        audioFile2.addEventListener('ended', next(), false);
                    } 
                if (audioFile2 && audioFile2.ended) {
                        autoCount = 0;
                        let randSong = $songList[Math.floor(Math.random()*$songList.length)];
                        let audioFile3 = new Audio(randSong.Source);
                        audioFile3.play();
                        audioFile3.addEventListener('ended', next(), false);
                        audioFile = audioFile;
                        audioFile2 = audioFile2;
                        autoCount++
                    }
                    clearInterval(endCheck);
                } else if (intervalClear) {
                    clearInterval(endCheck);
                }
            }, 1000)
        }, 2000); 
    }
    
    
    // function stopInterval(){
    //     clearInterval(endCheck)
    // }

    // if (trackIndex == 0){
    //     autoPlayNextTrack();
    // }

    // this.load.audiosprite('test', '.../static/audio/audio.json');
    // this.music = this.sound.addAudioSprite('test');
    // this.music.play('elgranexodo')

</script>

{#if $showplayer}
<!-- <div class="player" class:mini={$ishome} class:inv={$issettings}> -->
<div class="player" on:load={myAddListener()}>
    <audio autoplay id="audio_player" bind:this={player}>
        <!-- <source src="https://4a02-108-54-67-25.ngrok.io/stream"/> -->
        <!-- <source src={$audiosource[0].Source}/> -->
        <!-- <source src={$audiosource[0].Source}/> -->
        <!-- {#each $audiosource as song} -->
        <source src={$audiosource[0].Source} use:auto_play/>
            <!-- <source src={song.Source} use:auto_play/> -->
        <!-- {/each} -->
    </audio>
    {#if $currentduration > 0}
        <div class="seekdiv">
            <input type="range" id="seek" bind:this={seek} on:change={() => seek_to()} step="1" min="0" max={$currentduration} value={$currenttime}>
        <br>
        </div>
        <div class="songtimes">
            <div>
                {songTime}
            </div>
            <div>
                {timeRemaining}
            </div>
        </div>
    {/if}
    <div>
        <br>
        {$audiosource[0].Name.substring($audiosource[0].Name.match(/([A-z]\w+\/(\d+)?\/?)/g)[0].length, $audiosource[0].Name.length)}
        {#if $audiosource[0].Type == 'Radio'}
            {#if $currenttime == 0}
                <br>Connecting...
            {/if}
        {/if}
    </div>
    <div class="controls">
        <input type="image" id='prev' src="prev.svg" alt="prev" on:click={() => prev()}>
        <!-- <button type="button" on:click={() => play_audio()}>pressplay</button> -->
        <input type="image" class:hide={$isplaying} id="play" src="play.svg" on:click={() => play_audio()} alt="playbutton">
        <!-- <button type="button" on:click={() => pause_audio()}>presspause</button> -->
        <input type="image" class:hide={!$isplaying} id="pause" src="pause.svg" on:click={() => pause_audio()} alt="pausebutton">
        <!-- <button type="button" on:click={() => stop_audio()}>pressstop</button> -->
        <input type="image" id="next" src="next.svg" alt="next" on:click={() => next()}>
        <!-- <input type="image" src=".../static/images/stop.svg" onclick="stop_aud()" alt="stopbutton"> -->
        <!-- <img src=".../static/images/volume.svg" alt="vol_img"> -->
    </div>
    <!-- <div>
        <input type="range" id="vol" bind:this={vol} on:change={() => change_vol()} step="0.05" min="0" max="1" value="1">
    </div> -->
    <slot></slot>
</div>
<!-- {:else}
<div class="player"></div> -->
{/if}