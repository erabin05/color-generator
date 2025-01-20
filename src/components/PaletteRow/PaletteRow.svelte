<script lang="ts">
    import PaletteSquare from "../PalletteSquare/PaletteSquare.svelte";

    export let palette: { [key: string]: { hex: string, okhsl: { s: number, h: number, l: number} }}
    export let selectedShades: { [key: string]: { hex: string, okhsl: { s: number, h: number, l: number} }}
    export let base: number

    const paletteKeys = Object.keys(palette)
</script>


<ul class="palette-row">
    {#each paletteKeys as paletteKey}
        {@const currentPalette = palette[paletteKey]}
        <li>
            <PaletteSquare
                scale={Number(paletteKey)}
                hex={currentPalette.hex}
                isBase={base === Number(paletteKey)}
                isShade={Object.keys(selectedShades).includes(`${paletteKey}`)}
            />
        </li>
    {/each}
</ul>

<style lang="scss">
    @import './palette-row.scss';
</style>
