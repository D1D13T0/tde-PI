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

/* =========================
   FILTRO ORDEM
========================= */

export function orderFilter(image, order, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let valuesR = []
            let valuesG = []
            let valuesB = []

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    valuesR.push(image.data[index])
                    valuesG.push(image.data[index + 1])
                    valuesB.push(image.data[index + 2])
                }
            }

            valuesR.sort((a, b) => a - b)
            valuesG.sort((a, b) => a - b)
            valuesB.sort((a, b) => a - b)

            const i = (y * width + x) * 4

            result.data[i] = valuesR[order]
            result.data[i + 1] = valuesG[order]
            result.data[i + 2] = valuesB[order]
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   SUAVIZAÇÃO CONSERVATIVA
========================= */

export function conservativeSmoothing(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let neighborsR = []
            let neighborsG = []
            let neighborsB = []

            // percorre vizinhança 3x3 (sem o pixel central)
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    if (ky === 0 && kx === 0) continue

                    const index = ((y + ky) * width + (x + kx)) * 4

                    neighborsR.push(image.data[index])
                    neighborsG.push(image.data[index + 1])
                    neighborsB.push(image.data[index + 2])
                }
            }

            const i = (y * width + x) * 4

            const minR = Math.min(...neighborsR)
            const maxR = Math.max(...neighborsR)

            const minG = Math.min(...neighborsG)
            const maxG = Math.max(...neighborsG)

            const minB = Math.min(...neighborsB)
            const maxB = Math.max(...neighborsB)

            // aplica regra
            result.data[i] = Math.min(Math.max(image.data[i], minR), maxR)
            result.data[i + 1] = Math.min(Math.max(image.data[i + 1], minG), maxG)
            result.data[i + 2] = Math.min(Math.max(image.data[i + 2], minB), maxB)
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   FILTRO GAUSSIANO
========================= */

export function gaussianFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    const kernel = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ]

    const kernelSum = 16

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let sumR = 0
            let sumG = 0
            let sumB = 0

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const weight = kernel[ky + 1][kx + 1]

                    const index = ((y + ky) * width + (x + kx)) * 4

                    sumR += image.data[index] * weight
                    sumG += image.data[index + 1] * weight
                    sumB += image.data[index + 2] * weight
                }
            }

            const i = (y * width + x) * 4

            result.data[i] = sumR / kernelSum
            result.data[i + 1] = sumG / kernelSum
            result.data[i + 2] = sumB / kernelSum
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   SOBEL (DETECÇÃO DE BORDA)
========================= */

export function sobelFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    // primeiro converte para cinza
    const gray = []

    for (let i = 0; i < image.data.length; i += 4) {
        const r = image.data[i]
        const g = image.data[i + 1]
        const b = image.data[i + 2]

        gray.push(0.299 * r + 0.587 * g + 0.114 * b)
    }

    const Gx = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ]

    const Gy = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ]

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let sumX = 0
            let sumY = 0

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const pixel = gray[(y + ky) * width + (x + kx)]

                    sumX += pixel * Gx[ky + 1][kx + 1]
                    sumY += pixel * Gy[ky + 1][kx + 1]
                }
            }

            const magnitude = Math.sqrt(sumX * sumX + sumY * sumY)

            const i = (y * width + x) * 4

            result.data[i] = magnitude
            result.data[i + 1] = magnitude
            result.data[i + 2] = magnitude
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   LAPLACIANO (BORDA)
========================= */

export function laplacianFilter(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    // converter para cinza
    const gray = []

    for (let i = 0; i < image.data.length; i += 4) {
        const r = image.data[i]
        const g = image.data[i + 1]
        const b = image.data[i + 2]

        gray.push(0.299 * r + 0.587 * g + 0.114 * b)
    }

    const kernel = [
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0]
    ]

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let sum = 0

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const pixel = gray[(y + ky) * width + (x + kx)]
                    const weight = kernel[ky + 1][kx + 1]

                    sum += pixel * weight
                }
            }

            const value = Math.abs(sum)

            const i = (y * width + x) * 4

            result.data[i] = value
            result.data[i + 1] = value
            result.data[i + 2] = value
            result.data[i + 3] = 255
        }
    }

    return result
}


/* =========================
   DILATAÇÃO
========================= */

export function dilation(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let max = 0

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    max = Math.max(max, image.data[index])
                }
            }

            const i = (y * width + x) * 4

            result.data[i] = max
            result.data[i + 1] = max
            result.data[i + 2] = max
            result.data[i + 3] = 255
        }
    }

    return result
}


/* =========================
   EROSÃO
========================= */

export function erosion(image, ctx) {

    const result = ctx.createImageData(image)

    const width = image.width
    const height = image.height

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            let min = 255

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {

                    const index = ((y + ky) * width + (x + kx)) * 4

                    min = Math.min(min, image.data[index])
                }
            }

            const i = (y * width + x) * 4

            result.data[i] = min
            result.data[i + 1] = min
            result.data[i + 2] = min
            result.data[i + 3] = 255
        }
    }

    return result
}

/* =========================
   ABERTURA
========================= */

export function opening(image, ctx) {

    const eroded = erosion(image, ctx)
    return dilation(eroded, ctx)
}

/* =========================
   FECHAMENTO
========================= */

export function closing(image, ctx) {

    const dilated = dilation(image, ctx)
    return erosion(dilated, ctx)
}

/* =========================
   CONTORNO
========================= */

export function contour(image, ctx) {

    const result = ctx.createImageData(image)

    const eroded = erosion(image, ctx)

    for (let i = 0; i < image.data.length; i += 4) {

        const value = image.data[i] - eroded.data[i]

        result.data[i] = value
        result.data[i + 1] = value
        result.data[i + 2] = value
        result.data[i + 3] = 255
    }

    return result
}