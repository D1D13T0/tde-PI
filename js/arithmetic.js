/* =========================
   SOMA DE DUAS IMAGENS
========================= */

export function somarImagens(img1, img2, ctx) {

     if (img1.width !== img2.width || img1.height !== img2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }

    if (img1.width !== img2.width || img1.height !== img2.height) {
    alert("As imagens precisam ter o mesmo tamanho")
    return null
}
    

    const resultado = ctx.createImageData(img1)

    for (let i = 0; i < img1.data.length; i += 4) {

        resultado.data[i] =
            Math.min(img1.data[i] + img2.data[i], 255)

        resultado.data[i + 1] =
            Math.min(img1.data[i + 1] + img2.data[i + 1], 255)

        resultado.data[i + 2] =
            Math.min(img1.data[i + 2] + img2.data[i + 2], 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}


/* =========================
   SUBTRAÇÃO DE DUAS IMAGENS
========================= */

export function subtrairImagens(img1, img2, ctx) {
     if (img1.width !== img2.width || img1.height !== img2.height) {
        alert("As imagens precisam ter o mesmo tamanho")
        return null
    }


    if (img1.width !== img2.width || img1.height !== img2.height) {
    alert("As imagens precisam ter o mesmo tamanho")
    return null
}
    const resultado = ctx.createImageData(img1)

    for (let i = 0; i < img1.data.length; i += 4) {

        resultado.data[i] =
            Math.max(img1.data[i] - img2.data[i], 0)

        resultado.data[i + 1] =
            Math.max(img1.data[i + 1] - img2.data[i + 1], 0)

        resultado.data[i + 2] =
            Math.max(img1.data[i + 2] - img2.data[i + 2], 0)

        resultado.data[i + 3] = 255
    }

    return resultado
}


/* =========================
   SOMAR CONSTANTE (BRILHO)
========================= */

export function somarConstante(img, constante, ctx) {

    const resultado = ctx.createImageData(img)

    for (let i = 0; i < img.data.length; i += 4) {

        resultado.data[i] =
            Math.min(img.data[i] + constante, 255)

        resultado.data[i + 1] =
            Math.min(img.data[i + 1] + constante, 255)

        resultado.data[i + 2] =
            Math.min(img.data[i + 2] + constante, 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}


/* =========================
   SUBTRAIR CONSTANTE
========================= */

export function subtrairConstante(img, constante, ctx) {

    const resultado = ctx.createImageData(img)

    for (let i = 0; i < img.data.length; i += 4) {

        resultado.data[i] =
            Math.max(img.data[i] - constante, 0)

        resultado.data[i + 1] =
            Math.max(img.data[i + 1] - constante, 0)

        resultado.data[i + 2] =
            Math.max(img.data[i + 2] - constante, 0)

        resultado.data[i + 3] = 255
    }

    return resultado
}

/* =========================
   MULTIPLICAR CONSTANTE
   (CONTRASTE)
========================= */

export function multiplicarConstante(img, constante, ctx) {

    const resultado = ctx.createImageData(img)

    for (let i = 0; i < img.data.length; i += 4) {

        resultado.data[i] =
            Math.min(Math.max(img.data[i] * constante, 0), 255)

        resultado.data[i + 1] =
            Math.min(Math.max(img.data[i + 1] * constante, 0), 255)

        resultado.data[i + 2] =
            Math.min(Math.max(img.data[i + 2] * constante, 0), 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}


/* =========================
   DIVIDIR CONSTANTE
   (CONTRASTE)
========================= */

export function dividirConstante(img, constante, ctx) {

    const resultado = ctx.createImageData(img)

    for (let i = 0; i < img.data.length; i += 4) {

        resultado.data[i] =
            Math.min(Math.max(img.data[i] / constante, 0), 255)

        resultado.data[i + 1] =
            Math.min(Math.max(img.data[i + 1] / constante, 0), 255)

        resultado.data[i + 2] =
            Math.min(Math.max(img.data[i + 2] / constante, 0), 255)

        resultado.data[i + 3] = 255
    }

    return resultado
}