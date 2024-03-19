'use strict'


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // renderMeme()

    // addListeners()
    // resizeCanvas()

    renderGallery()
    // window.addEventListener('resize', () => resizeCanvas())

}


// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//         gElCanvas.width = elContainer.clientWidth
// }