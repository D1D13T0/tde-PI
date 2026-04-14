/* =========================
   ESCALA DE CINZA
========================= */

export function grayscale(image, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        const r = image.data[i]
        const g = image.data[i + 1]
        const b = image.data[i + 2]

        // fórmula de conversão para cinza
        const gray = 0.299 * r + 0.587 * g + 0.114 * b

        result.data[i] = gray
        result.data[i + 1] = gray
        result.data[i + 2] = gray
        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   INVERTER HORIZONTAL
========================= */

export function flipHorizontal(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            const i = (y * width + x) * 4

            // espelha no eixo X
            const newX = width - 1 - x
            const newIndex = (y * width + newX) * 4

            result.data[newIndex] = image.data[i]
            result.data[newIndex + 1] = image.data[i + 1]
            result.data[newIndex + 2] = image.data[i + 2]
            result.data[newIndex + 3] = 255
        }
    }

    return result
}


/* =========================
   INVERTER VERTICAL
========================= */

export function flipVertical(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            const i = (y * width + x) * 4

            // espelha no eixo Y
            const newY = height - 1 - y
            const newIndex = (newY * width + x) * 4

            result.data[newIndex] = image.data[i]
            result.data[newIndex + 1] = image.data[i + 1]
            result.data[newIndex + 2] = image.data[i + 2]
            result.data[newIndex + 3] = 255
        }
    }

    return result
}


/* =========================
   DIFERENÇA ENTRE IMAGENS
========================= */

export function differenceImages(image1, image2, ctx) {

    // validação de tamanho
    if (image1.width !== image2.width || image1.height !== image2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] =
            Math.min(Math.abs(image1.data[i] - image2.data[i]), 255)

        result.data[i + 1] =
            Math.min(Math.abs(image1.data[i + 1] - image2.data[i + 1]), 255)

        result.data[i + 2] =
            Math.min(Math.abs(image1.data[i + 2] - image2.data[i + 2]), 255)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   BLENDING (COMBINAÇÃO LINEAR)
========================= */

export function blending(image1, image2, alpha, ctx) {

    // validação de tamanho
    if (image1.width !== image2.width || image1.height !== image2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] =
            Math.min((alpha * image1.data[i]) + ((1 - alpha) * image2.data[i]), 255)

        result.data[i + 1] =
            Math.min((alpha * image1.data[i + 1]) + ((1 - alpha) * image2.data[i + 1]), 255)

        result.data[i + 2] =
            Math.min((alpha * image1.data[i + 2]) + ((1 - alpha) * image2.data[i + 2]), 255)

        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   MÉDIA ENTRE IMAGENS
========================= */

export function averageImages(image1, image2, ctx) {

    // validação de tamanho
    if (image1.width !== image2.width || image1.height !== image2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    const result = ctx.createImageData(image1)

    for (let i = 0; i < image1.data.length; i += 4) {

        result.data[i] =
            Math.min((image1.data[i] + image2.data[i]) / 2, 255)

        result.data[i + 1] =
            Math.min((image1.data[i + 1] + image2.data[i + 1]) / 2, 255)

        result.data[i + 2] =
            Math.min((image1.data[i + 2] + image2.data[i + 2]) / 2, 255)

        result.data[i + 3] = 255
    }

    return result
}

/* =========================
   CONVERTER PARA BINÁRIO
========================= */

export function thresholdImage(image, threshold, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        const r = image.data[i]
        const g = image.data[i + 1]
        const b = image.data[i + 2]

        const gray = Math.round(
            0.299 * r + 0.587 * g + 0.114 * b
        )

        const value = gray > threshold ? 255 : 0

        result.data[i] = value
        result.data[i + 1] = value
        result.data[i + 2] = value
        result.data[i + 3] = 255
    }

    return result
}


/* =========================
   NEGATIVO DA IMAGEM
========================= */

export function negativeImage(image, ctx) {

    const result = ctx.createImageData(image)

    for (let i = 0; i < image.data.length; i += 4) {

        result.data[i] = 255 - image.data[i]
        result.data[i + 1] = 255 - image.data[i + 1]
        result.data[i + 2] = 255 - image.data[i + 2]
        result.data[i + 3] = 255
    }

    return result
}

/* =========================
   EQUALIZAÇÃO DE HISTOGRAMA
========================= */

export function histogramEqualization(image, ctx) {

    const result = ctx.createImageData(image)

    const histogram = new Array(256).fill(0)

    const totalPixels = image.width * image.height

    // 1. Converter para cinza e montar histograma
    const grayArray = []

    for (let i = 0; i < image.data.length; i += 4) {

        const r = image.data[i]
        const g = image.data[i + 1]
        const b = image.data[i + 2]

        const gray = Math.round(
            0.299 * r + 0.587 * g + 0.114 * b
        )

        grayArray.push(gray)
        histogram[gray]++
    }

    // 2. CDF (acumulado)
    const cdf = new Array(256).fill(0)
    cdf[0] = histogram[0]

    for (let i = 1; i < 256; i++) {
        cdf[i] = cdf[i - 1] + histogram[i]
    }

    // 3. Normalização
    const cdfMin = cdf.find(value => value > 0)

    const lut = new Array(256)

    for (let i = 0; i < 256; i++) {
        lut[i] = Math.round(
            ((cdf[i] - cdfMin) / (totalPixels - cdfMin)) * 255
        )
    }

    // 4. Aplicar na imagem
    let index = 0

    for (let i = 0; i < image.data.length; i += 4) {

        const newValue = lut[grayArray[index++]]

        result.data[i] = newValue
        result.data[i + 1] = newValue
        result.data[i + 2] = newValue
        result.data[i + 3] = 255
    }

    return result
}

/* =========================
   FILTRO MÉDIA (MEAN)
========================= */

export function meanFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let sumR = 0
            let sumG = 0
            let sumB = 0

            // percorre vizinhança 3x3
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    sumR += image.data[index]
                    sumG += image.data[index + 1]
                    sumB += image.data[index + 2]
                }
            }

            const i = (y * width + x) * 4

            result.data[i] = sumR / 9
            result.data[i + 1] = sumG / 9
            result.data[i + 2] = sumB / 9
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   FILTRO MEDIANA
========================= */

export function medianFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let valuesR = []
            let valuesG = []
            let valuesB = []

            // vizinhança 3x3
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    valuesR.push(image.data[index])
                    valuesG.push(image.data[index + 1])
                    valuesB.push(image.data[index + 2])
                }
            }

            // ordenar
            valuesR.sort((a, b) => a - b)
            valuesG.sort((a, b) => a - b)
            valuesB.sort((a, b) => a - b)

            const i = (y * width + x) * 4

            result.data[i] = valuesR[4]       // mediana
            result.data[i + 1] = valuesG[4]
            result.data[i + 2] = valuesB[4]
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   FILTRO MÁXIMO
========================= */

export function maxFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let maxR = 0
            let maxG = 0
            let maxB = 0

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    maxR = Math.max(maxR, image.data[index])
                    maxG = Math.max(maxG, image.data[index + 1])
                    maxB = Math.max(maxB, image.data[index + 2])
                }
            }

            const i = (y * width + x) * 4

            result.data[i] = maxR
            result.data[i + 1] = maxG
            result.data[i + 2] = maxB
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   FILTRO MÍNIMO
========================= */

export function minFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let minR = 255
            let minG = 255
            let minB = 255

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    minR = Math.min(minR, image.data[index])
                    minG = Math.min(minG, image.data[index + 1])
                    minB = Math.min(minB, image.data[index + 2])
                }
            }

            const i = (y * width + x) * 4

            result.data[i] = minR
            result.data[i + 1] = minG
            result.data[i + 2] = minB
            result.data[i + 3] = 255
        }
    }

    return result
}