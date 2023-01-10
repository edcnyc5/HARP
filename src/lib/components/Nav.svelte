<style>
    .navbar {
        width: 100vw;
        height: 10vh;
        color: aliceblue;
        bottom: 0px;
        position: absolute;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    .homeicon{
        filter: invert(1);
    }
    .library{
        filter: invert(0);
    }
    .radio{
        filter: invert(1);
    }
</style>

<script>
    import { goto } from "$app/navigation";
    import { issettings } from "$lib/stores.js";
</script>

<div class="navbar">
    <div class='homeicon' on:click={() => goto('home')}>
        <!-- <a href="home" on:click={() => $issettings = false}>HOME</a> -->
        <img src="/images/home.svg" alt="HOME">
    </div>
    <div class='library' on:click={() => goto('library')}>
        <!-- <a href="library" on:click={() => $issettings = false}>LIBRARY</a> -->
        <img src="/images/library.svg" alt="LIBRARY">
    </div>
    <div class="radio" on:click={() => goto('radio')}>
        <!-- <a href="radio" on:click={() => $issettings = false}>RADIO</a> -->
        <img src="/images/radio.svg" alt="RADIO">
    </div>
    <!-- <div>
        <a href="#" on:click={() => $issettings = true}>SETTINGS</a>
    </div> -->
</div>