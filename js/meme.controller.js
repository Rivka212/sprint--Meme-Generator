'use strict'

let gElCanvas
let gCtx



function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()

}


function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = 'imgs/1.jpg'

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        // gCtx.lineWidth = 1
        // gCtx.strokeStyle = 'black'
        gCtx.fillStyle = meme.lines[0].color
        gCtx.font = meme.lines[0].size+'px Arial'

        gCtx.fillText(meme.lines[0].txt, 50, 50)
        // gCtx.strokeText(gMeme.lines[0].txt, 50, 50)
    }
}



// const strHTML = images.map(img => {
//         return `<img src="${img.url}" alt="">`
//     })