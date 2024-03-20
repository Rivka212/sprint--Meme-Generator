'use strict'

const STORAGE_KEY = 'memeDB'

var gImg
var gImgs = createImgs()
// var gLines = createLines()

var gMemes = []

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Add Text Here',
        size: 30,
        color: 'black',
        location: {x:50, y:50}
        }]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



function createMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
    _saveCarsToStorage()
}



// function createLines() {
//     const lines = []
//     for (let i = 0; i < length.lines; i++) {
//         lines.push(createLine(
//             i + 1, 'Add Text Here', 30, 'black')
//         )
//     }
//     return lines
// }


// function createLine(id, txt, size, color) {
//     return {
//         id: 1,
//         txt: 'Add Text Here',
//         size: 30,
//         color: 'black'
//     }
// }



function getMeme() {
    return gMeme
}


function setLineTxt(text) {
    var { selectedLineIdx } = gMeme
     selectedLineIdx = gCuurLineIdx 
    //  console.log(s);
    // if(g gMemes.selectedLineIdx)
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



function _saveCarsToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}
