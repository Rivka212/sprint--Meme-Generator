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
    setImg(imgId)
    renderMeme()
}