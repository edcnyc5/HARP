<script>
	import { afterUpdate, onDestroy, onMount } from "svelte";
	import { fade,fly } from "svelte/transition";
    import { trackChurch } from "../stores";
    // console.log(window.screen);
    // console.log(window.screen.width);
    let sWidth = window.screen.width;
    let num = Math.floor(Math.random()*7);
    // console.log('num: ', num);

    let churchAbb;
    let cover;

    onMount(() => {
        setAbb();
    })

    // onDestroy(() => {
    //     fade(cover,)
    // })

    afterUpdate(() => {
        setAbb();
    })
    
    function setAbb() {
        switch ($trackChurch) {
            case 'Tabernáculo Zoe':
                churchAbb = 'TZ';
                break;
            case 'Tabernáculo de Adoración':
                churchAbb = 'TDA';
                break;
            case 'Third Exodus Assembly':
                churchAbb = 'TEA';
                break;
            case 'Tabernáculo del Señor Jesucristo':
                churchAbb = 'TSJ';
                break;
            case 'Tabernáculo Voz de Aclamación':
                churchAbb = 'TVDA';
                break;
            case 'Tabernaculo El Shaddai':
                churchAbb = 'TES';
                break;
            case 'Tabernáculo Alas de Aguila':
                churchAbb = 'TADA';
                break;
            case 'Tabernáculo de Cúcuta':
                churchAbb = 'TDC';
                break;
            case 'Tabernáculo Iglesia de Dios':
                churchAbb = 'TIDD';
                break;
            case 'Tabernáculo Vida':
                churchAbb = 'TV';
                break;
            case 'Santa Biblia':
                churchAbb = 'BIB';
                break;
            case 'Exposición':
                churchAbb = 'EXP';
                break;
            default:
                churchAbb = 'MISC'
                break;
    }
    }

    // console.log('churchAbb: ', churchAbb);

    // let albumColors = ['#330505','#1D0533','#050C33','#052F33','#665014', '#14664E', '#145566'];
    // let currColor = albumColors[Math.floor(Math.random()*7)];
    // console.log('currColor: ',currColor);
    // if(cover)
    //     cover.style.background = currColor;

</script>


<div class="flex justify-around">
        <div 
        class:from-blue-900={num == 1} 
        class:from-red-900={num == 2} 
        class:from-teal-900={num == 3} 
        class:from-indigo-900={num == 4} 
        class:from-fuchsia-900={num == 5} 
        class:from-sky-500={num == 6} 
        class:from-rose-500={num == 0} 
        class:via-blue-900={num == 3} 
        class:via-red-900={num == 4} 
        class:via-teal-900={num == 5} 
        class:via-indigo-900={num == 6} 
        class:via-fuchsia-900={num == 0} 
        class:via-sky-500={num == 1} 
        class:via-rose-500={num == 2} 
        class:to-blue-900={num == 4} 
        class:to-red-900={num == 5} 
        class:to-teal-900={num == 6} 
        class:to-indigo-900={num == 0} 
        class:to-fuchsia-900={num == 1} 
        class:to-sky-500={num == 2} 
        class:to-rose-500={num == 3} 
        class="bg-gradient-to-r via-cyan-200 to-black ring-1 ring-white rounded-lg shadow-sm shadow-white drop-shadow-2xl" 
        style="height: {sWidth*0.57}px; max-height: 15rem; width: {sWidth*0.57}px; max-width: 15rem;">
            <!-- <div class="static" style="height: {sWidth}px;">test</div> -->
            {#if churchAbb}
                <img class="w-full" src="https://zaudio.fra1.cdn.digitaloceanspaces.com/Images/{churchAbb}-album.gif" alt="album-cover-{$trackChurch}">
            {/if}
            <div></div>
            <div></div>
        </div>
</div>


