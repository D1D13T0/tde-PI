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
    minFilter,
    orderFilter,
    conservativeSmoothing,
    gaussianFilter,
    sobelFilter,
    laplacianFilter,
    dilation,
    erosion,
    opening,
    closing,
    contour,
    prewittFilter,
    cropRegion
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

const btnReset = document.getElementById("btnReset")

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
const btnOrder = document.getElementById("btnOrder")
const btnConservative = document.getElementById("btnConservative")
const btnGaussian = document.getElementById("btnGaussian")
const btnSobel = document.getElementById("btnSobel")
const btnLaplacian = document.getElementById("btnLaplacian")


const btnDilation = document.getElementById("btnDilation")
const btnErosion = document.getElementById("btnErosion")
const btnOpening = document.getElementById("btnOpening")
const btnClosing = document.getElementById("btnClosing")
const btnContour = document.getElementById("btnContour")

const btnPrewitt = document.getElementById("btnPrewitt")

const btnCropMode = document.getElementById("btnCropMode")
const btnApplyCrop = document.getElementById("btnApplyCrop")
const btnCancelCrop = document.getElementById("btnCancelCrop")
const cropInfo = document.getElementById("cropInfo")
const canvasOverlay = document.getElementById("canvasOverlay")
const ctxOverlay = canvasOverlay.getContext("2d")

const jpegQuality = document.getElementById("jpegQuality")
const jpegQualityValue = document.getElementById("jpegQualityValue")
const btnCompress = document.getElementById("btnCompress")
const compressionInfo = document.getElementById("compressionInfo")

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


function getBaseImage(mode = "original") {

    if (!image1) {
        alert("Carregue uma imagem")
        return null
    }

    if (mode === "result" && result) {
        return result
    }

    return image1
}


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

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    const constant = parseFloat(inputContrast.value)

    result = multiplyConstant(baseImage, constant, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   CONTRASTE (DIVIDIR)
========================= */

btnDivide.addEventListener("click", () => {
    const constant = parseFloat(inputContrast.value)
    const baseImage = getBaseImage("original")
    if (!baseImage) return


    // evita divisão por zero
    if (constant === 0) {
        alert("Não é possível dividir por 0")
        return
    }

    result = divideConstant(baseImage, constant, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   BRILHO
========================= */

btnApplyBrightness.addEventListener("click", () => {
    const value = parseInt(inputBrightness.value)
    const baseImage = getBaseImage("original")
    if (!baseImage) return
        // se valor positivo → aumenta brilho
    if (value >= 0) {
        result = addConstant(baseImage, value, ctxResult)
    } else {
        result = subtractConstant(baseImage, Math.abs(value), ctxResult)
    }

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   ESCALA DE CINZA
========================= */

btnGray.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = grayscale(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   INVERTER HORIZONTAL
========================= */

btnFlipH.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = flipHorizontal(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   INVERTER VERTICAL
========================= */

btnFlipV.addEventListener("click", () => {
    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = flipVertical(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

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

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   OR
========================= */

btnOR.addEventListener("click", () => {

    if (!image1 || !image2) {
    alert("Carregue as duas imagens")
    return
    }

    result = orOperation(image1, image2, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   XOR
========================= */

btnXOR.addEventListener("click", () => {

    if (!image1 || !image2) {
    alert("Carregue as duas imagens")
    return
    }

    result = xorOperation(image1, image2, ctxResult)

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(result, 0, 0)
})

/* =========================
   NOT
========================= */

btnNOT.addEventListener("click", () => {

    const baseImage = getBaseImage("result")
    if (!baseImage) return

    result = notOperation(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnConvertBinary.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    const threshold = 127

    result = thresholdImage(baseImage, threshold, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


btnNegative.addEventListener("click", () => {

    const baseImage = getBaseImage("result")
    if (!baseImage) return

    result = negativeImage(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

inputThreshold.addEventListener("input", () => {

    thresholdValue.textContent = inputThreshold.value


    const threshold = parseInt(inputThreshold.value)
    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = thresholdImage(baseImage, threshold, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})



btnHistogram.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = histogramEqualization(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMean.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = meanFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMedian.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = medianFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMax.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = maxFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnMin.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = minFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnOrder.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = orderFilter(baseImage, 4, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnConservative.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = conservativeSmoothing(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


btnGaussian.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = gaussianFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnSobel.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = sobelFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnLaplacian.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = laplacianFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


btnDilation.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = dilation(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnErosion.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = erosion(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnOpening.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = opening(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnClosing.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = closing(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnContour.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = contour(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})

btnReset.addEventListener("click", () => {

    if (!image1) return

    result = null

    canvasResult.width = image1.width
    canvasResult.height = image1.height

    ctxResult.putImageData(image1, 0, 0)
})


/* =========================
   PREWITT
========================= */

btnPrewitt.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    result = prewittFilter(baseImage, ctxResult)

    canvasResult.width = baseImage.width
    canvasResult.height = baseImage.height

    ctxResult.putImageData(result, 0, 0)
})


/* =========================
   RECORTE DE REGIÃO
========================= */

let cropActive = false
let cropStartDisplay = null
let cropRect = null

function getOverlayCoords(e) {
    const rect = canvasOverlay.getBoundingClientRect()
    const scaleX = canvasOverlay.width / rect.width
    const scaleY = canvasOverlay.height / rect.height
    return {
        x: Math.max(0, Math.min((e.clientX - rect.left) * scaleX, canvasOverlay.width)),
        y: Math.max(0, Math.min((e.clientY - rect.top) * scaleY, canvasOverlay.height))
    }
}

function deactivateCrop() {
    cropActive = false
    cropStartDisplay = null
    cropRect = null
    ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
    canvasOverlay.style.display = "none"
    btnCropMode.style.display = "inline-block"
    btnCancelCrop.style.display = "none"
    btnApplyCrop.disabled = true
    cropInfo.style.display = "none"
}

btnCropMode.addEventListener("click", () => {

    if (!image1) {
        alert("Carregue uma imagem primeiro")
        return
    }

    cropActive = true
    cropStartDisplay = null
    cropRect = null

    const rect = canvas1.getBoundingClientRect()
    canvasOverlay.width = Math.round(rect.width)
    canvasOverlay.height = Math.round(rect.height)
    canvasOverlay.style.display = "block"

    btnCropMode.style.display = "none"
    btnCancelCrop.style.display = "inline-block"
    btnApplyCrop.disabled = true
    cropInfo.style.display = "block"
    cropInfo.textContent = "Arraste sobre a Imagem 1 para selecionar a região"
})

btnCancelCrop.addEventListener("click", deactivateCrop)

canvasOverlay.addEventListener("mousedown", (e) => {
    if (!cropActive) return
    e.preventDefault()
    cropStartDisplay = getOverlayCoords(e)
    cropRect = null
    btnApplyCrop.disabled = true
    ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
})

canvasOverlay.addEventListener("mousemove", (e) => {
    if (!cropActive || !cropStartDisplay) return
    e.preventDefault()

    const cur = getOverlayCoords(e)
    const x = Math.min(cropStartDisplay.x, cur.x)
    const y = Math.min(cropStartDisplay.y, cur.y)
    const w = Math.abs(cur.x - cropStartDisplay.x)
    const h = Math.abs(cur.y - cropStartDisplay.y)

    ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
    ctxOverlay.fillStyle = "rgba(43, 124, 255, 0.15)"
    ctxOverlay.fillRect(x, y, w, h)
    ctxOverlay.strokeStyle = "#2b7cff"
    ctxOverlay.lineWidth = 2
    ctxOverlay.setLineDash([6, 3])
    ctxOverlay.strokeRect(x, y, w, h)
})

// mouseup no document para capturar mesmo se o mouse soltar fora da overlay
document.addEventListener("mouseup", (e) => {
    if (!cropActive || !cropStartDisplay) return

    const cur = getOverlayCoords(e)
    const dispX = Math.min(cropStartDisplay.x, cur.x)
    const dispY = Math.min(cropStartDisplay.y, cur.y)
    const dispW = Math.abs(cur.x - cropStartDisplay.x)
    const dispH = Math.abs(cur.y - cropStartDisplay.y)

    cropStartDisplay = null

    if (dispW < 2 || dispH < 2) return

    // converte coordenadas da overlay para coordenadas reais da imagem
    const scaleX = image1.width / canvasOverlay.width
    const scaleY = image1.height / canvasOverlay.height

    cropRect = {
        x: Math.round(dispX * scaleX),
        y: Math.round(dispY * scaleY),
        w: Math.round(dispW * scaleX),
        h: Math.round(dispH * scaleY)
    }

    btnApplyCrop.disabled = false
    cropInfo.textContent = `Seleção: x=${cropRect.x}, y=${cropRect.y}, w=${cropRect.w}, h=${cropRect.h} px — clique em Aplicar Recorte`
})

btnApplyCrop.addEventListener("click", () => {

    if (!cropRect || !image1) return

    const { x, y, w, h } = cropRect

    result = cropRegion(image1, x, y, w, h, ctxResult)

    canvasResult.width = w
    canvasResult.height = h

    ctxResult.putImageData(result, 0, 0)

    deactivateCrop()
})


/* =========================
   COMPRESSÃO JPEG
========================= */

jpegQuality.addEventListener("input", () => {
    jpegQualityValue.textContent = jpegQuality.value + "%"
})

btnCompress.addEventListener("click", () => {

    const baseImage = getBaseImage("original")
    if (!baseImage) return

    const quality = parseInt(jpegQuality.value) / 100

    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = baseImage.width
    tempCanvas.height = baseImage.height
    const tempCtx = tempCanvas.getContext("2d")
    tempCtx.putImageData(baseImage, 0, 0)

    const dataUrl = tempCanvas.toDataURL("image/jpeg", quality)

    const img = new Image()

    img.onload = () => {

        canvasResult.width = baseImage.width
        canvasResult.height = baseImage.height
        ctxResult.drawImage(img, 0, 0)

        result = ctxResult.getImageData(0, 0, canvasResult.width, canvasResult.height)

        const originalBytes = baseImage.width * baseImage.height * 3
        const b64 = dataUrl.substring(dataUrl.indexOf(",") + 1)
        const compressedBytes = Math.round(b64.length * 0.75)
        const reduction = (100 - (compressedBytes / originalBytes) * 100).toFixed(1)

        compressionInfo.textContent =
            `Original: ~${(originalBytes / 1024).toFixed(1)} KB  |  ` +
            `Comprimido: ~${(compressedBytes / 1024).toFixed(1)} KB  |  ` +
            `Redução: ${reduction}%`
    }

    img.src = dataUrl
})