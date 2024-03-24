'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0
let gFrame = 0
let gCurrFrame = false
let gDeteleLine = false

const gQueryOptions = { font: 'px Verdana', strokeColor: 'black', sizeFrame: '35' }


function onloadCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    renderMeme()

    // window.addEventListener('resize', () => resizeCanvas())
}



function renderMeme() {
    const meme = getMeme()
    var { lines } = meme
    var [{ txt, size, color }] = lines

    const img = new Image()
    img.src = gImg.url

    img.onload = () => {
        coverCanvasWithImg(img)
        onAddDemoText()
        onShowLines()
    }
}


function onShowLines() {
    if (gFrame === 0) return
    const { lines } = gMeme
    lines.forEach(line => {
        var { txt, size, color, location } = line
        gCtx.fillStyle = color
        gCtx.font = size + gQueryOptions.font
        gCtx.fillText(txt, location.x, location.y)
        console.log('location.x, location.y', location.x, location.y)
    })
}


function onAddDemoText(txt, size, color) {

    if (gDeteleLine) {
        gDeteleLine = false
        return
    }
    console.log('hitext');
    var { lines } = gMeme
    var txt = lines[gCuurLineIdx].txt
    var size = lines[gCuurLineIdx].size
    var color = lines[gCuurLineIdx].color
    var location = lines[gCuurLineIdx].location

    var cuurSpace = 60
    var space = gCuurLineIdx * cuurSpace + 80
    gCtx.fillStyle = color
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gQueryOptions.strokeColor
    // gCtx.textAlign = 'center'
    gCtx.font = size + gQueryOptions.font
    var x = space - 27
    var y = space
    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
    location.x = x
    location.y = y
    console.log('x, y', x, y);
    onAddFrame(txt)
}


function checkOnCanvas(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    console.log(ev);
    const { lines } = gMeme
    var line = lines.findIndex(line => {
        var { location } = line

        var padding = 10
        console.log(location.x, location.y, location.w, location.h);
        console.log(offsetX, offsetY, clientX, clientY);
        return (offsetX >= location.x + padding && offsetX <= location.x + location.w &&
            offsetY >= location.y + padding && offsetY <= location.h)
    })

    if (line === 1) {
        gCuurLineIdx = line
    }

}



function onAddFrame(text) {
    var { lines } = gMeme
    var [{ size }] = lines
    console.log('size', size);
    if (!gFrame === gMeme.selectedLineIdx) return
    if (gCurrFrame)
    var cuurSpace = 60
    var space = gCuurLineIdx * cuurSpace
    gCtx.font = size + gQueryOptions.font

    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10
    gCtx.strokeStyle = 'black'
    // gCtx.fillText(text, x, y)
    gCtx.strokeRect(x - padding, y - padding, textWidth + 2 * padding, size + 2 * padding)
}

console.log();

function onAddLocation(text) {
    var { lines } = gMeme
    var [{ size }] = lines
 
    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10
    console.log(text);

    lines[gCuurLineIdx].location = { x: x - padding, y: y - padding, w: textWidth + 2 * padding, h: size + 2 * padding }
    console.log(lines[gCuurLineIdx].location);
}



function onSetLineTxt() {
    const text = document.querySelector('[name="txt-meme"]').value

    setLineTxt(text)
    onAddFrame(text)
    renderMeme()
}


function changeFontFamily(newFont) {
    gQueryOptions.font = 'px ' + newFont
}



function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function onSetColor() {
    document.getElementById('colorPicker').click()
}


function showColor() {
    var newColor = document.getElementById('colorPicker').value
    gMeme.lines[gCuurLineIdx].color = newColor
    renderMeme()
}

function onSetStrokeColor() {
    document.getElementById('strokeColor').click()
}

function showStrokeColor() {
    var strokeNewColor = document.getElementById('strokeColor').value
    gQueryOptions.strokeColor = strokeNewColor
    renderMeme()
}


function onChangeFontSize(elSize) {
    const { lines } = gMeme
    const [{ size }] = lines

    if (elSize === 'increase') lines[gCuurLineIdx].size = size + 5
    else if (elSize === 'decrease') lines[gCuurLineIdx].size = size - 5
    renderMeme()
}


function onAddLines() {
    gCurrLine = true
    gCurrFrame = true
    gCuurLineIdx++
    const { lines } = gMeme
    var line = {
        txt: 'Add Text Here',
        size: 35,
        color: 'white',
        location: { x: 40, y: 40, w: 300, h: 40 },
    }
    var { txt, size, color, location } = line
    lines.push(line)
    gFrame++
    gMeme.selectedLineIdx++
    document.querySelector('[name="txt-meme"]').value = ''

    onAddFrame(line.txt)
    onAddDemoText(txt, size, color, location)
}



function onSwitchLine() {
    gCurrLine = true
    gCuurLineIdx = (gCuurLineIdx === gMeme.lines.length - 1) ? 0 : gCuurLineIdx + 1
    onShowLines()
    onAddFrame()
    renderMeme()
}


function onAlignText(elAlign) {
    gCtx.textAlign = elAlign
}


function onDeleteLine() {
    gDeteleLine = true
    gCuurLineIdx
    var { lines } = gMeme
    lines.splice(gCuurLineIdx, 1)
    renderMeme()
}


function onSave() {
    gMemes.push(gMeme)

    const dataURL = gElCanvas.toDataURL()
    saveToStorage('canvas', dataURL)
}
