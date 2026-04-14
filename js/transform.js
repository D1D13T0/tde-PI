export function grayscale(img, ctx) {

    const resultado = ctx.createImageData(img)

    for (let i = 0; i < img.data.length; i += 4) {

        const r = img.data[i]
        const g = img.data[i + 1]
        const b = img.data[i + 2]

        const cinza = 0.299 * r + 0.587 * g + 0.114 * b

        resultado.data[i] = cinza
        resultado.data[i + 1] = cinza
        resultado.data[i + 2] = cinza
        resultado.data[i + 3] = 255
    }

    return resultado
}

export function flipHorizontal(img, ctx) {

    const resultado = ctx.createImageData(img)

    const width = img.width
    const height = img.height

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            const i = (y * width + x) * 4

            const novoX = width - 1 - x
            const novoIndex = (y * width + novoX) * 4

            resultado.data[novoIndex] = img.data[i]
            resultado.data[novoIndex + 1] = img.data[i + 1]
            resultado.data[novoIndex + 2] = img.data[i + 2]
            resultado.data[novoIndex + 3] = 255
        }
    }

    return resultado
}

export function flipVertical(img, ctx) {

    const resultado = ctx.createImageData(img)

    const width = img.width
    const height = img.height

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            const i = (y * width + x) * 4

            const novoY = height - 1 - y
            const novoIndex = (novoY * width + x) * 4

            resultado.data[novoIndex] = img.data[i]
            resultado.data[novoIndex + 1] = img.data[i + 1]
            resultado.data[novoIndex + 2] = img.data[i + 2]
            resultado.data[novoIndex + 3] = 255
        }
    }

    return resultado
}

export function diferencaImagens(img1, img2, ctx) {

    // validação de tamanho
    if (img1.width !== img2.width || img1.height !== img2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const resultado = ctx.createImageData(img1)

    for (let i = 0; i < img1.data.length; i += 4) {

        resultado.data[i] =
            Math.min(Math.abs(img1.data[i] - img2.data[i]), 255)

        resultado.data[i + 1] =
            Math.min(Math.abs(img1.data[i + 1] - img2.data[i + 1]), 255)

        resultado.data[i + 2] =
            Math.min(Math.abs(img1.data[i + 2] - img2.data[i + 2]), 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}

export function blending(img1, img2, alpha, ctx) {

    // valida tamanho
    if (img1.width !== img2.width || img1.height !== img2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const resultado = ctx.createImageData(img1)

    for (let i = 0; i < img1.data.length; i += 4) {

        resultado.data[i] =
            Math.min((alpha * img1.data[i]) + ((1 - alpha) * img2.data[i]), 255)

        resultado.data[i + 1] =
            Math.min((alpha * img1.data[i + 1]) + ((1 - alpha) * img2.data[i + 1]), 255)

        resultado.data[i + 2] =
            Math.min((alpha * img1.data[i + 2]) + ((1 - alpha) * img2.data[i + 2]), 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}

export function mediaImagens(img1, img2, ctx) {

    // validação de tamanho
    if (img1.width !== img2.width || img1.height !== img2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const resultado = ctx.createImageData(img1)

    for (let i = 0; i < img1.data.length; i += 4) {

        resultado.data[i] =
            Math.min((img1.data[i] + img2.data[i]) / 2, 255)

        resultado.data[i + 1] =
            Math.min((img1.data[i + 1] + img2.data[i + 1]) / 2, 255)

        resultado.data[i + 2] =
            Math.min((img1.data[i + 2] + img2.data[i + 2]) / 2, 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}