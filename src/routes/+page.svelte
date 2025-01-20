<script lang="ts">
    import { generatePalette } from '$lib'
    import Input from '../components/Input/Input.svelte';
    import Palette from '../components/Palette/Palette.svelte';

    let hex = "";
    let palette;

    const hexRegex = new RegExp(/[0-9A-Fa-f]{6}/g);

    const onSubmitHex = () => {
        palette = generatePalette(`#${hex}`)
        console.log(palette)
    }

</script>

{#if !palette}
    <div class='input-container'>
        <div class="description">
            <h1>Color palette generator</h1>
            <div class="text">
                <p>Generate lighter and darker shades from the hexadecimal code of your color.</p>
                <p>The generation follows the principles established <a href="https://matthewstrom.com/writing/generating-color-palettes">this article</a>.</p>
            </div>
        </div>
        <Input onsubmit={onSubmitHex} bind:value={hex}/>
    </div>
{/if}

{#if palette}

<div class='palette-container'>
    <button
        class='button-return'
        on:click={() => { palette = undefined}}
    >
    {"<"} Back
    </button>

    <Palette {hex} {palette}/>
</div>
{/if}

<style lang="scss">
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: 	#141414;
        gap: 2.4rem;
        height: 100vh;
        box-sizing: border-box;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        gap: 3.2rem;
        font-family: Arial, Helvetica, sans-serif;
        color: #FFF;

        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;

            h1, p {
                margin: 0;
            }

            .text {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.4rem;

                a {
                    color: #FFF;
                }
            }
            
        }
    }

    .palette-container {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
        padding: 2.4rem 4.8rem;
        width: 100%;
        box-sizing: border-box;
    }

    .button-return {
        border-radius: 0.8rem;
        border: solid 1px #FFFFFF;
        background: none;
        color: #FFF;
        font-size: 1rem;
        min-width: 6rem;
        padding: 0.8rem;
        align-self: flex-start;

        &:hover {
            cursor: pointer;
            background-color: rgba($color: #FFFFFF, $alpha: 0.1);
        }
    }
</style>