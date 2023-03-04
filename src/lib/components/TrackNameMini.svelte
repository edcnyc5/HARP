<script>
// export let trackTitle;
// export let trackChurch;
    import { trackTitle, trackChurch } from "../stores";
</script>

<div class="text-xs">
    <div style="text-overflow: ellipsis;
    white-space: nowrap;
    width: 220px;
    overflow: hidden;">
        {$trackTitle}
    </div>

    {$trackChurch}
</div>

<style>
    /* div {
        text-align: center;
    } */
    
    /* h3 { */
        /* margin: 5px 0 10px; */
    /* } */
</style>