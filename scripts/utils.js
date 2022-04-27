// ASCII 字符
const gscale = '@%#*+=-:. '

// 根据像素 rgba 值获取代替的字符
const getChar = (r, g, b, a) => {
    // 0 ~ 127~128 ~ 255
    // 0 ~    4~5  ~ 9
    //
    // pix / 255 = index / 9
    // index = pix / 255 * 9
    const pix = (r + g + b) / 3
    const index = Math.floor(pix / (255 / 9))
    const c = gscale.charAt(index)

    if (c.length == 0) {
        console.warn(`get char empty, pix: ${pix}, index: ${index}`)
    }

    return c
}

const getColorIndicesForCoord = (x, y, width) => {
    const red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
};

function imageData2HTML(
    imageData,
    imageHeight,
    imageWidth,
    outputHeight = 100,
    outputWidth = 100
) {
    let widthRange = 1
    if (outputWidth < imageWidth) {
        widthRange = Math.round(imageWidth / outputWidth)
    }

    let heightRange = 1
    if (outputHeight < imageHeight) {
        heightRange = Math.round(imageHeight / outputHeight)
    }

    let range = Math.max(widthRange, heightRange)

    console.log(`heightRange: ${heightRange}, widthRange: ${widthRange}`)

    let content = ''
    for (let i = 0; i < imageHeight; i += range) {

        let row = ''
        for (let j = 0; j < imageWidth; j += range) {

            const [redIndex, greenIndex, blueIndex, alphaIndex] = getColorIndicesForCoord(j, i, imageWidth)

            const r = imageData.data[redIndex]
            const g = imageData.data[greenIndex]
            const b = imageData.data[blueIndex]
            const a = imageData.data[alphaIndex]

            const c = getChar(r, g, b, a)

            row += `<span>${c} </span>`
        }

        content += `${row}<span>\n</span>`
    }

    return content
}

export default imageData2HTML

