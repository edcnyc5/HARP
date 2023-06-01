<script>
    import { goto } from "$app/navigation";

    

</script>

<style>
    .navbar {
        /* height: 10vh; */
        /* color: aliceblue; */
        /* bottom: 0px;
        position: absolute; */
        /* align-items: center; */
        /* justify-content: space-evenly; */
    }
</style>

<div class="absolute bottom-1 justify-around flex w-full h-10">
    <button class="rounded-full self-end bg-zinc-900 py-3 px-7" on:click={() => goto('./home')}>Home</button>
    <button class="rounded-full self-end bg-zinc-900 py-3 px-7" on:click={() => goto('./library')}>Library</button>
    <button class="rounded-full self-end bg-zinc-900 py-3 px-7" on:click={() => goto('./account')}>Account</button>
</div>
