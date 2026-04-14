export function carregarImagem(input, canvas, ctx, callback) {

    const file = input.files[0]

    if (!file) {
        alert("Nenhum arquivo selecionado")
        return
    }

    const img = new Image()

    img.onload = () => {

        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        )

        callback(imageData)
    }

    img.src = URL.createObjectURL(file)
}