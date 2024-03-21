'use strict'


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // addListeners()
    renderGallery()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
        gElCanvas.width = elContainer.clientWidth
}


function toggleMenu() {
    document.body.classList.toggle('menu-open')
}