<script lang="ts">
    export let hex: string
    export let scale: number
    export let isBase: boolean
</script>

<div
    class="palette-square"
    class:base={isBase}
    style:background-color={hex}
    style:color={scale < 50 ? "#000" : "#FFF"}
>
    <p class='scale-name'>{scale}</p>
    <p class='scale-hex'>{hex}</p>
</div>

<style lang="scss">
    @import './palette-square.scss';
</style>
