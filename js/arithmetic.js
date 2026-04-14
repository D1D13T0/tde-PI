/* =========================
   SOMA DE DUAS IMAGENS
========================= */

export function addImages(image1, image2, ctx) {

    // validação de tamanho
    if (image1.width !== image2.width || image1.height !== image2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] =
            Math.min(image1.data[i] + image2.data[i], 255)

        result.data[i + 1] =
            Math.min(image1.data[i + 1] + image2.data[i + 1], 255)

        result.data[i + 2] =
            Math.min(image1.data[i + 2] + image2.data[i + 2], 255)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   SUBTRAÇÃO DE DUAS IMAGENS
========================= */

export function subtractImages(image1, image2, ctx) {

    // validação de tamanho
    if (image1.width !== image2.width || image1.height !== image2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] =
            Math.max(image1.data[i] - image2.data[i], 0)

        result.data[i + 1] =
            Math.max(image1.data[i + 1] - image2.data[i + 1], 0)

        result.data[i + 2] =
            Math.max(image1.data[i + 2] - image2.data[i + 2], 0)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   SOMAR CONSTANTE (BRILHO)
========================= */

export function addConstant(image, constant, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        result.data[i] =
            Math.min(image.data[i] + constant, 255)

        result.data[i + 1] =
            Math.min(image.data[i + 1] + constant, 255)

        result.data[i + 2] =
            Math.min(image.data[i + 2] + constant, 255)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   SUBTRAIR CONSTANTE (BRILHO)
========================= */

export function subtractConstant(image, constant, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        result.data[i] =
            Math.max(image.data[i] - constant, 0)

        result.data[i + 1] =
            Math.max(image.data[i + 1] - constant, 0)

        result.data[i + 2] =
            Math.max(image.data[i + 2] - constant, 0)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   MULTIPLICAR CONSTANTE (CONTRASTE)
========================= */

export function multiplyConstant(image, constant, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        result.data[i] =
            Math.min(Math.max(image.data[i] * constant, 0), 255)

        result.data[i + 1] =
            Math.min(Math.max(image.data[i + 1] * constant, 0), 255)

        result.data[i + 2] =
            Math.min(Math.max(image.data[i + 2] * constant, 0), 255)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   DIVIDIR CONSTANTE (CONTRASTE)
========================= */

export function divideConstant(image, constant, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        result.data[i] =
            Math.min(Math.max(image.data[i] / constant, 0), 255)

        result.data[i + 1] =
            Math.min(Math.max(image.data[i + 1] / constant, 0), 255)

        result.data[i + 2] =
            Math.min(Math.max(image.data[i + 2] / constant, 0), 255)

        result.data[i + 3] = 255
    }

    return result
}