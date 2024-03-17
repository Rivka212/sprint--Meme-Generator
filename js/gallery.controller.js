'use strict'



function renderGallery() {
    var images = gImgs
    console.log(images);
    const elImages = document.querySelector('.images-gallery')

    const strHTML = images.map(img => {
        return `<img onclick="onImgSelect(${img.id})" src="${img.url}">`
    })

    elImages.innerHTML = strHTML.join('')
    // var image = document.querySelector('.images-gallery img')
    // // var image = document.getElementById('id')
    // console.log(image);
    // image.addEventListener('click', onImgSelect)
}


function onImgSelect(imgId) {
    const elGallery = document.querySelector('.images-gallery')
    elGallery.classList.add('hidden')

    const elimgMeme = document.querySelector('.meme-editor')
    elimgMeme.classList.remove('hidden')

    setImg(imgId)
    renderMeme()
}