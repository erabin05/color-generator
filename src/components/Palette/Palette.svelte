<script lang="ts">
    import { hexToHSL } from '$lib'
    import PaletteRow from '../PaletteRow/PaletteRow.svelte';
    import PaletteSquare from '../PalletteSquare/PaletteSquare.svelte';

    export let hex;
    export let palette;

    const categories = Array.from({length: 10}, (_, index) => index * 10)

    const getPalette = (category) => {
        const scales = Array.from({length: 10}, (_, index) => index + category)
        let shades = {}
        scales.forEach((scale) => {
            if(!palette[`${scale}`]) { return }
            shades[scale] = palette[scale]
        })
        return shades
    }

    $: {
        getPalette(20)
    }

    const numberOfShadesPerHalf = 4
    $: paletteBottomScaleLimit = palette.base < 50 ? 0 : palette.base - 50
    $: lightInterval = Math.ceil((palette.base - paletteBottomScaleLimit) / (numberOfShadesPerHalf + 1))
    $: paletteTopScaleLimit = palette.base > 50 ? 100 : palette.base + 50
    $: darkInterval = Math.ceil((paletteTopScaleLimit - palette.base) / (numberOfShadesPerHalf + 1))

    $: {
        console.log(paletteTopScaleLimit)
    }

    $: selectedShades = (() => {
        let shadesPalette = {}
        shadesPalette[`${palette.base}`] = palette[`${palette.base}`]

        for(
            let currentScale = palette.base - lightInterval;
            currentScale > paletteBottomScaleLimit;
            currentScale -= lightInterval
        ) {
            shadesPalette[currentScale] = palette[currentScale]
        }

        for(
            let currentScale = palette.base + darkInterval;
            currentScale < paletteTopScaleLimit;
            currentScale += darkInterval
        ) {
            shadesPalette[currentScale] = palette[currentScale]
        }

        return shadesPalette
    })()

</script>

<article class='palette'>
    {#if hex}
        <h1> Palette color-{Math.round(hexToHSL(hex).h)}</h1>
    {/if}
    <section class='base'>
        <h2>Base</h2>
        <PaletteSquare
            scale={palette.base}
            hex={palette[`${palette.base}`].hex}
        />
    </section>

    <section class="shades">
        <h2>Shades</h2>
        <ul>
            {#each Object.keys(selectedShades) as scale}
                {@const currentShade = selectedShades[scale]}
                <li>
                    <PaletteSquare
                        scale={scale}
                        hex={currentShade.hex}
                    />
                </li>
            {/each}
        </ul>
    </section>

    <section class='all-shades'>
        <h2>All shades</h2>
        <ul>
            {#each categories as category}
                <li class='row'>
                    <h3>
                        {category}
                    </h3>
                    <PaletteRow base={palette.base} palette={getPalette(category)} selectedShades={selectedShades}/>
                </li>
            {/each}
        </ul>
    </section>
</article>

<style lang="scss">
    @import './palette.scss';
</style>
