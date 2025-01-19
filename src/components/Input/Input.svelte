<script lang="ts">
    export let onsubmit
    export let value: string

    const hexRegex = new RegExp(/[0-9A-Fa-f]{6}/g);

    const onSubmitHex = () => {
        if(!hexRegex.test(value)) {
            return
        }
        onsubmit()
    }

    const onInputHex =() => {
        value = value.replace("#", "")
    }

</script>


<form
    class='form'
    onsubmit={onSubmitHex}
>
    <label for="base-color">Base color</label>
    <div class="input-button-container">
        <div class='input-container'>
            <span>#</span>
            <input
                id="base-color"
                name="hexadecimal"
                bind:value
                placeholder="FFFFFF"
                oninput={onInputHex}
                maxlength="7"
                autocomplete="off"
            />
        </div>
        <button
            type="submit"
        >
            Create
        </button>
    </div>
</form>

<style lang="scss">
    @import './input.scss';
</style>