export function andOperation(image1, image2, ctx) {

    // valida tamanho
    if (image1.width !== image2.width || image1.height !== image2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] =
            image1.data[i] & image2.data[i]

        result.data[i + 1] =
            image1.data[i + 1] & image2.data[i + 1]

        result.data[i + 2] =
            image1.data[i + 2] & image2.data[i + 2]

        result.data[i + 3] = 255
    }

    return result
}

export function orOperation(image1, image2, ctx) {

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] = image1.data[i] | image2.data[i]
        result.data[i + 1] = image1.data[i + 1] | image2.data[i + 1]
        result.data[i + 2] = image1.data[i + 2] | image2.data[i + 2]
        result.data[i + 3] = 255
    }

    return result
}


export function xorOperation(image1, image2, ctx) {

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] = image1.data[i] ^ image2.data[i]
        result.data[i + 1] = image1.data[i + 1] ^ image2.data[i + 1]
        result.data[i + 2] = image1.data[i + 2] ^ image2.data[i + 2]
        result.data[i + 3] = 255
    }

    return result
}


export function notOperation(image, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        result.data[i] = (~image.data[i]) & 255
        result.data[i + 1] = (~image.data[i + 1]) & 255
        result.data[i + 2] = (~image.data[i + 2]) & 255
        result.data[i + 3] = 255
    }

    return result
}