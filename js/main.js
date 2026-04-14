import { loadImage } from "./imageLoader.js"
import {
    addImages,
    subtractImages,
    addConstant,
    subtractConstant,
    multiplyConstant,
    divideConstant
} from "./arithmetic.js"

import { 
    grayscale, 
    flipHorizontal, 
    flipVertical, 
    differenceImages, 
    blending, 
    averageImages,
    thresholdImage,
    negativeImage,
    histogramEqualization,
    meanFilter,
    medianFilter,
    maxFilter,
    minFilter
} from "./transform.js"


import { andOperation, orOperation, xorOperation, notOperation } from "./logic.js"



const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")

const canvas2 = document.getElementById("canvas2")
const ctx2 = canvas2.getContext("2d")

const canvasResult = document.getElementById("canvasResultado")
const ctxResult = canvasResult.getContext("2d")

/* ENTRADAS */

const inputImg1 = document.getElementById("img1")
const inputImg2 = document.getElementById("img2")

const inputBrightness = document.getElementById("brightness")
const inputContrast = document.getElementById("contrast")
const inputThreshold = document.getElementById("threshold")

const thresholdValue = document.getElementById("thresholdValue")


/* BOTÕES */

const btnAdd = document.getElementById("btnAdd")
const btnSubtract = document.getElementById("btnSubtract")
const btnSave = document.getElementById("btnSave")

const btnMultiply = document.getElementById("btnMultiply")
const btnDivide = document.getElementById("btnDivide")

const btnApplyBrightness = document.getElementById("btnApplyBrightness")

const btnGray = document.getElementById("btnGray")
const btnFlipH = document.getElementById("btnFlipH")
const btnFlipV = document.getElementById("btnFlipV")
const btnDifference = document.getElementById("btnDifference")

const inputAlpha = document.getElementById("alpha")
const btnBlending = document.getElementById("btnBlending")
const alphaValue = document.getElementById("alphaValue")

const btnAverage = document.getElementById("btnAverage")

const btnAND = document.getElementById("btnAND")
const btnOR = document.getElementById("btnOR")
const btnXOR = document.getElementById("btnXOR")
const btnNOT = document.getElementById("btnNOT")

const btnConvertBinary = document.getElementById("btnConvertBinary")
const btnNegative = document.getElementById("btnNegative")
const btnHistogram = document.getElementById("btnHistogram")


const btnMean = document.getElementById("btnMean")
const btnMedian = document.getElementById("btnMedian")
const btnMax = document.getElementById("btnMax")
const btnMin = document.getElementById("btnMin")

/* ESTADO */

let image1 = null
let image2 = null
let result = null


/* CARREGAR IMAGEM 1 */

inputImg1.addEventListener("change", () => {

    loadImage(inputImg1, canvas1, ctx1, (imgData) => {
        image1 = imgData
    })

})


/* CARREGAR IMAGEM 2 */

inputImg2.addEventListener("change", () => {

    loadImage(inputImg2, canvas2, ctx2, (imgData) => {
        image2 = imgData
    })

})


/* ADICIONAR IMAGENS */

btnAdd.addEventListener("click", () => {

    if (!image1 || !image2) {
        alert("Carregue as duas imagens")
        return
    }

    result = addImages(image1, image2, ctxResult)

    if (!result) return

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* SUBTRAIR IMAGEM */

btnSubtract.addEventListener("click", () => {

    if (!image1 || !image2) {
        alert("Carregue as duas imagens")
        return
    }

    result = subtractImages(image1, image2, ctxResult)

    if (!result) return

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* SALVAR IMAGEM */

btnSave.addEventListener("click", () => {

    if (!result) {
        alert("Nenhuma imagem processada")
        return
    }

    const link = document.createElement("a")

    link.download = "result.png"
    link.href = canvasResult.toDataURL()

    link.click()
})

/* =========================
   CONTRASTE (MULTIPLICAR)
========================= */

btnMultiply.addEventListener("click", () => {

    // verifica se existe imagem carregada
    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const constant = parseFloat(inputContrast.value)

    result = multiplyConstant(image1, constant, ctxResult)

    // ajusta o tamanho do canvas
    canvasResult.width = image1.width
    canvasResult.height = image1.height

    // desenha o resultado
    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   CONTRASTE (DIVIDIR)
========================= */

btnDivide.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const constant = parseFloat(inputContrast.value)

    // evita divisão por zero
    if (constant === 0) {
        alert("Não é possível dividir por 0")
        return
    }

    result = divideConstant(image1, constant, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   BRILHO
========================= */

btnApplyBrightness.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const value = parseInt(inputBrightness.value)

    // se valor positivo → aumenta brilho
    if (value >= 0) {
        result = addConstant(image1, value, ctxResult)
    } 
    // se valor negativo → diminui brilho
    else {
        result = subtractConstant(image1, Math.abs(value), ctxResult)
    }

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   ESCALA DE CINZA
========================= */

btnGray.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1
    result = grayscale(baseImage, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   INVERTER HORIZONTAL
========================= */

btnFlipH.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    result = flipHorizontal(image1, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   INVERTER VERTICAL
========================= */

btnFlipV.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    result = flipVertical(image1, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   DIFERENÇA ENTRE IMAGENS
========================= */

btnDifference.addEventListener("click", () => {

    if (!image1 || !image2) {
        alert("Carregue as duas imagens")
        return
    }

    result = differenceImages(image1, image2, ctxResult)

    // se falhar validação, não continua
    if (!result) return

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   BLENDING (COMBINAÇÃO LINEAR)
========================= */

// atualiza valor do slider na tela
inputAlpha.addEventListener("input", () => {
    alphaValue.textContent = inputAlpha.value
})

btnBlending.addEventListener("click", () => {

    if (!image1 || !image2) {
        alert("Carregue as duas imagens")
        return
    }

    const alpha = parseFloat(inputAlpha.value)

    result = blending(image1, image2, alpha, ctxResult)

    if (!result) return

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   MÉDIA ENTRE IMAGENS
========================= */

btnAverage.addEventListener("click", () => {

    if (!image1 || !image2) {
        alert("Carregue as duas imagens")
        return
    }

    result = averageImages(image1, image2, ctxResult)

    if (!result) return

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})

/* =========================
   AND
========================= */

btnAND.addEventListener("click", () => {

    if (!image1 || !image2) {
        alert("Carregue as duas imagens")
        return
    }

    result = andOperation(image1, image2, ctxResult)

    if (!result) return

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   OR
========================= */

btnOR.addEventListener("click", () => {

    result = orOperation(image1, image2, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   XOR
========================= */

btnXOR.addEventListener("click", () => {

    result = xorOperation(image1, image2, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})

/* =========================
   NOT
========================= */

btnNOT.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1
    result = notOperation(baseImage, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})

btnConvertBinary.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const threshold = 127 // valor fixo padrão

    result = thresholdImage(image1, threshold, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


btnNegative.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1
    result = negativeImage(baseImage, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})

inputThreshold.addEventListener("input", () => {

    thresholdValue.textContent = inputThreshold.value

    if (!image1) return

    const threshold = parseInt(inputThreshold.value)

    result = thresholdImage(image1, threshold, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})



btnHistogram.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1

    result = histogramEqualization(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMean.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1

    result = meanFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMedian.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1

    result = medianFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMax.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1

    result = maxFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMin.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem")
        return
    }

    const baseImage = result || image1

    result = minFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})