'use strict'


 var gImg = { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }

var gImgs = creatImgs()

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 30,
            color: 'black'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}


function setLineTxt() {
    const text = document.querySelector('[name="txt-meme"]').value
    gMeme.lines[0].txt = text
    renderMeme()
}


function creatImgs() {
    const images = []
    for (let i = 0; i < 2; i++) {
        images.push(
            creatImg(
                i + 1, `imgs/${i + 1}.jpg`,
                ` ['funny', 'cat'] `
            )
        )
    }
    return images
}


function setImg(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    gImg = img

    console.log(gImg);
}



function creatImg(id, url, keywords) {
    return {
        id,
        url,
        keywords,
    }
}

