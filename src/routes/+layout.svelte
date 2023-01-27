<script>
    import "../app.css"
    import { onMount } from "svelte";
    import { songs, bibAudios, expAudios } from "../lib/stores";
    import Player from "../lib/components/Player.svelte";

</script>



<slot></slot>