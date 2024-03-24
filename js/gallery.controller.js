'use strict'

function renderGallery() {
    var images = gImgs
    const elImages = document.querySelector('.images-gallery')

    const strHTML = images.map(img => {
        return `<img src="imgs/${img.id}.jpg" onclick="onImgSelect(this,${img.id})" id=${img.id}>`
    })
    elImages.innerHTML = strHTML.join('')
}


function onImgSelect(elImg, imgId) {
    const { img } = gImgs
    const elGallery = document.querySelector('.images-gallery')
    elGallery.classList.add('hidden')

    const elimgMeme = document.querySelector('.meme-container')
    elimgMeme.classList.remove('hidden')

    setImg(imgId)
    // coverCanvasWithImg(elImg)
    onloadCanvas()
}

// function onSelectImg(elImg) {
//     coverCanvasWithImg(elImg)
// }


function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}





function goToGallery() {
    const elGallery = document.querySelector('.images-gallery')
    elGallery.classList.remove('hidden')

    const elimgMeme = document.querySelector('.meme-container')
    elimgMeme.classList.add('hidden')
}



function goToSaved() {

}




function goToRandomize() {

}

