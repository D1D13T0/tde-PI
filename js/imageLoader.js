export function loadImage(input, canvas, ctx, callback) {

    const file = input.files[0]

    // verifica se algum arquivo foi selecionado
    if (!file) {
        alert("Nenhum arquivo selecionado")
        return
    }

    const image = new Image()

    image.onload = () => {

        // ajusta o canvas para o tamanho da imagem
        canvas.width = image.width
        canvas.height = image.height

        // desenha a imagem no canvas
        ctx.drawImage(image, 0, 0)

        // captura os pixels da imagem
        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        )

        // retorna os dados da imagem via callback
        callback(imageData)
    }

    // cria URL temporária da imagem
    image.src = URL.createObjectURL(file)
}