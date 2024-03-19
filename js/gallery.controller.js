'use strict'



function renderGallery() {
    var images = gImgs
    // console.log(images);
    const elImages = document.querySelector('.images-gallery')

    const strHTML = images.map(img => {
        return `<img onclick="onImgSelect(${img.id})" src="${img.url}">`
    })

    elImages.innerHTML = strHTML.join('')
}


function onImgSelect(imgId) {
    const elGallery = document.querySelector('.images-gallery')
    elGallery.classList.add('hidden')

    const elimgMeme = document.querySelector('.meme-container')
    elimgMeme.classList.remove('hidden')

    setImg(imgId)
    renderMeme()
}