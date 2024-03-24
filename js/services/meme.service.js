'use strict'

// const STORAGE_KEY = 'memeDB'

var gImg
var gImgs = createImgs()
var gMemes = []

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Add Text Here',
        size: 35,
        color: 'white',
        location: { x: 40, y: 40, w: 300, h: 40 }
    }]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



function createMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
    _saveCarsToStorage()
}


function getMeme() {
    return gMeme
}


function setLineTxt(text) {
    var { selectedLineIdx } = gMeme
    selectedLineIdx = gCuurLineIdx
    gMeme.lines[selectedLineIdx].txt = text
}


function createImgs() {
    const images = []
    for (let i = 0; i < 17; i++) {
        images.push(
            createImg(
                i + 1, `imgs/${i + 1}.jpg`,
                ` ['funny', 'cat'] `
            )
        )
    }
    return images
}


function setImg(imgId) {
    console.log();
    const img = gImgs.find(img => img.id === imgId)
    gImg = img
}



function createImg(id, url, keywords) {
    return {
        id,
        url,
        keywords,
    }
}



// function _saveCarsToStorage() {
//     saveToStorage(STORAGE_KEY, gMemes)
// }


