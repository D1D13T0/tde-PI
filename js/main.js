import { carregarImagem } from "./imageLoader.js"
import {
    somarImagens,
    subtrairImagens,
    somarConstante,
    subtrairConstante,
    multiplicarConstante,
    dividirConstante
} from "./arithmetic.js"
import { grayscale, flipHorizontal, flipVertical, diferencaImagens, blending, mediaImagens } from "./transform.js"

const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")

const canvas2 = document.getElementById("canvas2")
const ctx2 = canvas2.getContext("2d")

const canvasResultado = document.getElementById("canvasResultado")
const ctxResultado = canvasResultado.getContext("2d")

const inputImg1 = document.getElementById("img1")
const inputImg2 = document.getElementById("img2")

const inputConstante = document.getElementById("constante")

const btnSomar = document.getElementById("btnSomar")
const btnSubtrair = document.getElementById("btnSubtrair")
const btnSalvar = document.getElementById("btnSalvar")
const btnMultiplicar = document.getElementById("btnMultiplicar")
const btnDividir = document.getElementById("btnDividir")
const inputContraste = document.getElementById("contraste")
const btnAplicarBrilho = document.getElementById("btnAplicarBrilho")
const btnGray = document.getElementById("btnGray")
const btnFlipH = document.getElementById("btnFlipH")
const btnFlipV = document.getElementById("btnFlipV")
const btnDiferenca = document.getElementById("btnDiferenca")
const inputAlpha = document.getElementById("alpha")
const btnBlending = document.getElementById("btnBlending")
const valorAlpha = document.getElementById("valorAlpha")
const btnMedia = document.getElementById("btnMedia")

let imagem1 = null
let imagem2 = null
let resultado = null

/* CARREGAR IMAGEM 1 */

inputImg1.addEventListener("change", () => {

    carregarImagem(inputImg1, canvas1, ctx1, (imgData) => {
        imagem1 = imgData
    })

})

/* CARREGAR IMAGEM 2 */

inputImg2.addEventListener("change", () => {

    carregarImagem(inputImg2, canvas2, ctx2, (imgData) => {
        imagem2 = imgData
    })

})

/* SOMAR */

btnSomar.addEventListener("click", () => {

    if (!imagem1 || !imagem2) {
        alert("Carregue as duas imagens")
        return
    }

    if (img1.width !== img2.width || img1.height !== img2.height) {
    alert("As imagens precisam ter o mesmo tamanho")
    return null
}

  resultado = somarImagens(imagem1, imagem2, ctxResultado)

if (!resultado) return

canvasResultado.width = imagem1.width
canvasResultado.height = imagem1.height

ctxResultado.putImageData(resultado, 0, 0)
})

/* SUBTRAIR */

btnSubtrair.addEventListener("click", () => {

    if (!imagem1 || !imagem2) {
        alert("Carregue as duas imagens")
        return
    }

    if (img1.width !== img2.width || img1.height !== img2.height) {
    alert("As imagens precisam ter o mesmo tamanho")
    return null
}

resultado = subtrairImagens(imagem1, imagem2, ctxResultado)

if (!resultado) return

canvasResultado.width = imagem1.width
canvasResultado.height = imagem1.height

ctxResultado.putImageData(resultado, 0, 0)
})



/* SALVAR */

btnSalvar.addEventListener("click", () => {

    if (!resultado) {
        alert("Nenhuma imagem processada")
        return
    }

    const link = document.createElement("a")

    link.download = "resultado.png"

    link.href = canvasResultado.toDataURL()

    link.click()
})

btnMultiplicar.addEventListener("click", () => {

    if (!imagem1) {
        alert("Carregue uma imagem")
        return
    }

    const constante = parseFloat(inputContraste.value)

    resultado = multiplicarConstante(imagem1, constante, ctxResultado)

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado,0,0)

})

btnDividir.addEventListener("click", () => {

    if (!imagem1) {
        alert("Carregue uma imagem")
        return
    }

   const constante = parseFloat(inputContraste.value)

    if(constante === 0){
        alert("Não é possível dividir por 0")
        return
    }

    resultado = dividirConstante(imagem1, constante, ctxResultado)

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado,0,0)

})

btnAplicarBrilho.addEventListener("click", () => {

    if (!imagem1) {
        alert("Carregue uma imagem")
        return
    }

    const valor = parseInt(inputConstante.value)

    if (valor >= 0) {
        resultado = somarConstante(imagem1, valor, ctxResultado)
    } else {
        resultado = subtrairConstante(imagem1, Math.abs(valor), ctxResultado)
    }

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)

})

btnGray.addEventListener("click", () => {

    if (!imagem1) {
        alert("Carregue uma imagem")
        return
    }

    resultado = grayscale(imagem1, ctxResultado)

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)

})

btnFlipH.addEventListener("click", () => {

    if (!imagem1) {
        alert("Carregue uma imagem")
        return
    }

    resultado = flipHorizontal(imagem1, ctxResultado)

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)

})

btnFlipV.addEventListener("click", () => {
    if (!imagem1) {
        alert("Carregue uma imagem")
        return
    }

    resultado = flipVertical(imagem1, ctxResultado)

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)
})

btnDiferenca.addEventListener("click", () => {

    if (!imagem1 || !imagem2) {
        alert("Carregue as duas imagens")
        return
    }

    resultado = diferencaImagens(imagem1, imagem2, ctxResultado)

    if (!resultado) return

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)

})

inputAlpha.addEventListener("input", () => {
    valorAlpha.textContent = inputAlpha.value
})

btnBlending.addEventListener("click", () => {

    if (!imagem1 || !imagem2) {
        alert("Carregue as duas imagens")
        return
    }

    const alpha = parseFloat(inputAlpha.value)

    resultado = blending(imagem1, imagem2, alpha, ctxResultado)

    if (!resultado) return

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)

})

btnMedia.addEventListener("click", () => {

    if (!imagem1 || !imagem2) {
        alert("Carregue as duas imagens")
        return
    }

    resultado = mediaImagens(imagem1, imagem2, ctxResultado)

    if (!resultado) return

    canvasResultado.width = imagem1.width
    canvasResultado.height = imagem1.height

    ctxResultado.putImageData(resultado, 0, 0)

})