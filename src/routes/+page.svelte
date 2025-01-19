<script lang="ts">
    import { generatePalette } from '$lib'
    import Input from '../components/Input/Input.svelte';
    import Palette from '../components/Palette/Palette.svelte';

    let hex = "";
    let palette;

    const hexRegex = new RegExp(/[0-9A-Fa-f]{6}/g);

    const onSubmitHex = () => {
        palette = generatePalette(`#${hex}`)
    }

</script>

<Input onsubmit={onSubmitHex} bind:value={hex}/>

{#if palette}
    <Palette {hex} {palette}/>
{/if}

<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2.4rem;
        background-color: 	#141414;
        gap: 2.4rem;
    }
</style>