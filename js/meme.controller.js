'use strict'

let gElCanvas
let gCtx


function renderMeme() {
    const meme = getMeme()
    const { lines } = meme
    const [{ txt, size, color }] = lines

    const img = new Image()
    img.src = gImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        gCtx.fillStyle = color
        gCtx.font = size + 'px Arial'

        gCtx.fillText(txt, 50, 50)
    }
}


function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}
