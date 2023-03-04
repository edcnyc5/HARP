<script>
// export let trackTitle;
// export let trackChurch;
    import { trackTitle, trackChurch } from "../stores";
</script>

<div class="pt-2">
    <span>{$trackTitle}</span>
    <br/>
    <span class="italic font-light text-sm">{$trackChurch}</span>
</div>

<style>
    div {
        text-align: center;
    }
    
    h3 {
        margin: 5px 0 10px;
    }
</style>