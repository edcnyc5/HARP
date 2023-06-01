<script>
    import { goto } from "$app/navigation";
	import Player from "../../lib/components/Player.svelte";
	import { onMount } from "svelte";
    import PlayerMini from "../../lib/components/PlayerMini.svelte";
    import { audioFile, isPlaying, trackIndex, songs, totalTrackTime, trackTitle, trackChurch, currentTimeDisplay, success,refresh } from "../../lib/stores";
	import { bind } from "svelte/internal";
    // $: console.log(`currentTimeDisplay = ${$currentTimeDisplay}`);

    onMount(() => {
        if(!$success){
            goto('./');
        }
    })

    const pLang = ['Select an option', 
                    'Seleccione una opción', 
                    'Selecione uma opção', 
                    'Pumili lamang ng opsyon',
                    'Silakan pilih salah satu opsi',
                    'Пожалуйста, выберите один из вариантов'
                ];
    let register = false;
    let pass;
    let showPassword = false;
    let showConfirm = false;
    let passConfirm;
    let passMatch = false;
    let passUnder;
    let langPH = pLang[0];
    let selLang;

    function checkMatch() {
        console.log('passConfirm: ', passConfirm.value);
        console.log('passConfirm: ', passConfirm.value.length);
        console.log('pass: ', pass.value);
        console.log('pass: ', pass.value.length);
        if(!passConfirm || passConfirm.value == ''){
            passConfirm.setCustomValidity('');
            return;
        }
        if(passConfirm && passConfirm.value && passConfirm.value.length < 8){
            passConfirm.setCustomValidity('Password must have 8 or more characters');
            // passConfirm.setAttribute("invalid",'');
            passConfirm.reportValidity();
            passMatch = false;
            return;
        }
        if(pass.value == passConfirm.value){
            // pass.setCustomValidity('')
            passConfirm.setCustomValidity('');
            passMatch = true;
        }
        else{
            passConfirm.setCustomValidity('Passwords do not match!');
            // passConfirm.setAttribute("invalid",'');
            passConfirm.reportValidity();
            passMatch = false;
        }
    }

    setInterval(() => {
        let oldPH = langPH.toString();
        langPH = pLang[Math.floor(Math.random()*5)];
        if(oldPH === langPH)
            langPH = pLang[Math.floor(Math.random()*5)];
        langPH = langPH;
    }, 3000)


    
    const playPauseAudio = () => {
        if ($audioFile.paused) {
            // toggleTimeRunning();
            $audioFile.play();
            $isPlaying = true;
        } else {
            // toggleTimeRunning();
            $audioFile.pause();
            $isPlaying = false;
        }
    }

    const loadTrack = () => {
        $refresh = true;
        console.log('$ref:', $refresh);
        $audioFile = new Audio($songs[$trackIndex].Url);
        $audioFile.onloadedmetadata = () => {
            $totalTrackTime = $audioFile.duration;
        }
        console.log('$audioFile: ', $audioFile);
        $trackTitle = $songs[$trackIndex].Name;
        $trackChurch = $songs[$trackIndex].Church;
        setTimeout(() => {
            $refresh = false;
            console.log('$refAft: ', $refresh);
        }, 100);
    }

    const PlayNextTrack = () => {
        if ($trackIndex <= $songs.length-2){
            $trackIndex += 1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        } else {
            $trackIndex = 0;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        }
    }

    const PlayLastTrack = () => {
        if ($trackIndex >= 1){
            $trackIndex -= 1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        } else {
            $trackIndex = $songs.length-1;
            $audioFile.pause();
            loadTrack();
            $audioFile.play();
        }
    }


</script>

<h1 class="text-3xl font-bold p-1">Account</h1>

<div class="flex items-baseline">
    <h2 class:opacity-50={register} class:text-sm={register} class:font-extralight={register} class="text-md font-bold p-1" on:click={() => register = false}>
        <div class="flex">
            Sign In
            {#if register}
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
            {/if}
        </div>
    </h2>
    <h2 class:opacity-50={!register} class:text-sm={!register} class:font-extralight={!register} class="text-md font-bold p-1" on:click={() => register = true}>
        <div class="flex">
            Register
            {#if !register}
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
            {/if}
        </div> 
    </h2>
</div>

{#if !register}
    <!-- <h2 class="text-md font-bold p-1">Sign in</h2> -->
    <div class="flex flex-col p-2">
        <label class="mt-1" for="email">Email:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="email" name="email" placeholder="Email Address" id="email">
        <label class="mt-1" for="pass">Password:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="password" name="pass" placeholder="Password" id="pass">
    </div>
{:else}
    <!-- <h2 class="text-md font-bold p-1">Register</h2> -->
    <div class="flex flex-col p-2">
        <label class="mt-1" for="email">Email:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="email" name="email" placeholder="Email" id="email">
        <label class="mt-1" for="first">First Name:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="text" name="first" placeholder="First" id="first">
        <label class="mt-1" for="last">Last Name:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="text" name="last" placeholder="Last" id="last">
        <label class="mt-1" for="church">Church:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="text" name="church" placeholder="Church" id="church">
        <label class="mt-1" for="reference">Reference:</label>
        <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="text" name="reference" placeholder="Name of person who referred you" id="reference">
        <label class="mt-1" for="lang">Preferred Language:</label>
        <select class:text-slate-400={selLang == ''} class="p-1 text-slate-900 focus:outline-none focus:ring 
        focus:ring-blue-500" name="pref-lang" bind:value={selLang} id="pref-lang">
            <option value="">{langPH}</option>
            <option value="English">English is my preferred language</option>
            <option value="Spanish">Español es mi lenguaje preferido</option>
            <option value="Portuguese">Português é a minha língua preferida</option>
            <option value="Filipino">Filipino ang aking ginustong wika</option>
            <option value="Bahasa">Bahasa Indonesia adalah bahasa pilihan saya</option>
            <option value="Russian">Русский язык - мой любимый язык</option>
            <option value="Other">Other...</option>
        </select>
        {#if selLang == 'Other'}
            <input class="text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
        focus:ring-blue-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="text" name="lang" placeholder="Preferred Language" id="lang">
        {/if}
        <label class="mt-1" for="pass">Password:</label>
        <div class="relative">
            <input class:text-pink-600={passUnder}
            class:focus:border-pink-500={passUnder} 
            class:focus:ring-pink-500={passUnder}
            class="w-full text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
            focus:ring-blue-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type={showPassword?'text':'password'} name="pass" placeholder="Create Password (8+ characters)" id="pass" bind:this={pass} on:keyup={()=> { if(pass && pass.value && pass.value.length < 8) passUnder = true; if(pass && pass.value && pass.value.length >= 8) passUnder = false; checkMatch()} }>
            <label on:click={()=> showPassword = !showPassword} class="absolute top-1 right-1 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer mt-0.5" for="toggle">{showPassword?'hide':'show'}</label>
        </div>
        <label class="mt-1" for="pass-match">Confirm Password:</label>
        <div class="relative">
            <input class:text-pink-600={(passConfirm && passConfirm.value && passConfirm.value.length >= 8 && passMatch === false) || (passConfirm && passConfirm.value.length < 8)}
            class:focus:border-pink-500={(passConfirm && passConfirm.value && passConfirm.value.length >= 8 && passMatch === false) || (passConfirm && passConfirm.value.length < 8)} 
            class:focus:ring-pink-500={(passConfirm && passConfirm.value && passConfirm.value.length >= 8 && passMatch === false) || (passConfirm && passConfirm.value.length < 8)} 
            class="w-full peer text-slate-900 rounded-md p-1 mt-1 focus:outline-none focus:ring 
            focus:ring-blue-500" type={showConfirm?'text':'password'} name="pass-match" placeholder="Confirm Password" id="pass-match" bind:this={passConfirm} on:keyup={checkMatch}>
            <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"></p>
            <label on:click={()=> showConfirm = !showConfirm} class="absolute top-1 right-1 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer mt-0.5" for="toggle">{showConfirm?'hide':'show'}</label>
        </div>
        <!-- {#if passConfirm && passConfirm.length >= 8 && !passMatch}
            <span>Password doesn't match!</span>
        {/if} -->
    </div>
{/if}


<div class="flex fixed w-screen justify-around bottom-28 text-sm font-bold animate-bounce">
    Click below to return to the Welcome Screen! 
</div>
<div>
    {#if $success}
        <PlayerMini on:playPause={playPauseAudio}
                    on:forward={PlayNextTrack}
                    on:rewind={PlayLastTrack}/>
    {/if}
</div>
