<style>
    * {
        color: antiquewhite;
    }
</style>

<script>
import { onMount } from "svelte";
import { ishome, issettings } from "$lib/stores.js";

    onMount(() => {
        $ishome = false;
        $issettings = true;
    })
</script>