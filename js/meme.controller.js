'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0


function renderMeme() {
    const meme = getMeme()
    var { lines } = meme
    var [{ txt, size, color }] = lines
    // var txt = gMeme.lines[gCuurLineIdx].txt
    // var size = gMeme.lines[gCuurLineIdx].size
    // var color = gMeme.lines[gCuurLineIdx].color
    // resizeCanvas()
    const img = new Image()
    img.src = gImg.url

    img.onload = () => {
        coverCanvasWithImg(img)
        gCtx.fillStyle = color
        gCtx.font = size + 'px Arial'
        gCtx.fillText(txt, 50, 50)
        gCtx.strokeText(txt, 50, 50)
        console.log('hi');
    }
}
// onAddDemoText()
//  onAddFrame(txt)

// window.addEventListener('resize', () => resizeCanvas())


// input.oninput = function() {
//     drawTextOnCanvas(input.value);
// }


function onAddDemoText(txt,size,color) {
    console.log('hitxte');
    var cuurSpace = 35
    var space = gCuurLineIdx * cuurSpace

    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    gCtx.fillText(txt, 50 + space, 50 + space)
    gCtx.strokeText(txt, 50 + space, 50 + space)
    renderMeme()
}


function onAddFrame(text) {
    console.log('hi');
    var cuurSpace = 35
    var space = gCuurLineIdx * cuurSpace
    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10
    // gCtx.fillText(txt, 50 + space, 50 + space)
    // space += 35
    gCtx.fillText(text, x, y)
    gCtx.strokeRect(x - padding, y - 30, textWidth + 2 * padding, 40)
    renderMeme()
}


function onSetLineTxt() {
    console.log('hi');
    gCurrLine = true
    const text = document.querySelector('[name="txt-meme"]').value
    console.log(text);
    setLineTxt(text)
    // text = ''
    renderMeme()
}

function changeFontFamily() {
    var fontSelect = document.querySelector('fontSelect').value
    document.getElementById('textToChange').style.fontFamily = fontSelect
}



function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function onSetColor() {
    document.getElementById('colorPicker').click()
    // const newColor = document.getElementById('colorPicker').value
}

function showColor() {
    // document.getElementById('colorPicker').click()
    var newColor = document.getElementById('colorPicker').value
    gMeme.lines[0].color = newColor
    renderMeme()
}



function onChangeFontSize(elSize) {
    const { lines } = gMeme
    const [{ size }] = lines

    if (elSize === 'increase') gMeme.lines[0].size = size + 5
    else if (elSize === 'decrease') gMeme.lines[0].size = size - 5
    renderMeme()
}


function onAddLines() {
    gCurrLine = true
    gCuurLineIdx++
    console.log(gCuurLineIdx);
    // text = ''
    const { lines } = gMeme
    var line = {
        txt: 'Add Text Here',
        size: 30,
        color: 'black'
    }
    var {txt,size,color} = line
    lines.push(line)
    console.log(lines);
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx);
    onAddDemoText(txt,size,color)
    onAddFrame(line.txt)
    renderMeme()
}


function onSwitchLine() {
    gCurrLine = true

    gCuurLineIdx = (gCuurLineIdx === gMeme.lines.length - 1) ? 0 : gCuurLineIdx + 1

    // gCtx.lineWidth = 2
    // gCtx.strokeRect(45, 20, 200, 45)
    onAddFrame()
    renderMeme()
}




