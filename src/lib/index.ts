import { formatHex, converter } from 'culori';


const hexToOKHSL = (hex) => {
    const okhslConverter = converter('okhsl')
    return okhslConverter(hex)
}

const hexToHSL = (hex) => {
    const hslConverter = converter('hsl')
    return hslConverter(hex)
}

const computeScaleLightness = (scale) => {
    const scaleValue = scale / 100
    return 1 - scaleValue
};

const computeScaleValueFromBase = (scale, baseScale) => {
    if(scale < baseScale) {
        const interval = baseScale
        return (scale / interval * 50) / 100
    } else {
        console.log('scale', scale)
        let interval = 100 - baseScale
        return ((((scale - baseScale) / interval) * 50) + 50) / 100
    }
}

const computeScaleSaturation = (scale, baseScaleNumber, minSaturation, maxSaturation) => {
    const scaleValue = computeScaleValueFromBase(scale, baseScaleNumber)

    console.log(scaleValue)

    const chromaDifference = maxSaturation - minSaturation;
    return (
        -4 * chromaDifference * Math.pow(scaleValue, 2) +
        4 * chromaDifference * scaleValue +
        minSaturation
    );
};

const computeScaleHue = (scale, baseScaleNumber, baseHue) => {
    const scaleValue = computeScaleValueFromBase(scale, baseScaleNumber)
    return scale < baseScaleNumber
        ? baseHue + 5 * (1 - scaleValue)
        : baseHue - 5 * (1 - scaleValue)
}

const generatePalette = (
    baseHex = "#27509B",
) => {
    const rowHsl = hexToOKHSL(baseHex)
    const baseHsl =  { h: rowHsl.h, s: rowHsl.s, l: rowHsl.l }

    // base for a scale from 0 to 100
    const baseScaleNumber = 100 - Math.round(baseHsl.l * 100)

    const maxSaturation = baseHsl.s
    const minSaturation = (() => {
        const minSaturationLimit = 0.2
        let result = maxSaturation - 0.4
        return result < minSaturationLimit ? result : minSaturationLimit
    })()

    const getScaleValue = (okhsl) => ({
        okhsl,
        hex: formatHex({ mode: 'okhsl', ...okhsl})
    })

    let palette = {}
    palette.base = baseScaleNumber
    palette[baseScaleNumber] = getScaleValue(baseHsl)

    const updatePalette = (currentScale) => {
        palette[currentScale] = getScaleValue({
            h: computeScaleHue(currentScale, baseScaleNumber, baseHsl.h),
            s: computeScaleSaturation(currentScale, baseScaleNumber, minSaturation ,maxSaturation),
            l: computeScaleLightness(currentScale)
        })
    }

    for(
        let currentScale = 1;
        currentScale < 100;
        currentScale++
    ) {
        if(currentScale != palette.base) {
            updatePalette(currentScale)
        }
    }

    return palette
}

export {
    generatePalette,
    hexToOKHSL,
    hexToHSL
}





