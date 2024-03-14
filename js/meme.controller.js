'use strict'

let gElCanvas
let gCtx



var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 20,
            color: 'red'
        }
    ]
}


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }




function onInit() {
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

}


function renderMeme() {
    const img = new Image()
    img.src = 'imgs/1.jpg'

    img.onload = () => 
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
} 



// const strHTML = images.map(img => {
//         return `<img src="${img.url}" alt="">`
//     })