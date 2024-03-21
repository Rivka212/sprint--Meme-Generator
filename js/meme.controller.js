'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0



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
        console.log('hi');
        coverCanvasWithImg(img)
        if (gCuurLineIdx === 0) onAddDemoText()
        // onSetLineTxt()
        // if(gCuurLineIdx)
        onShowLines()
        if (gCuurLineIdx === gMeme.selectedLineIdx) {
            onAddFrame(txt)
        }
    }
}




function onShowLines() {
    console.log('hi');
    if (gCuurLineIdx === 0) return
    const { lines } = gMeme
    // var [{ txt, size, color, location }] = lines
    for (let i = 0; i < lines.length - 1; i++) {
        // var currLines = lines[0].txt
        lines.forEach(line => {
            var { txt, size, color, location } = line
            console.log(txt, size, color);

            gCtx.fillStyle = color
            gCtx.font = size + 'px Arial'
            gCtx.fillText(txt, location.x, location.y)

        })
    }
}


function onAddDemoText(txt, size, color) {
    console.log('hitext');
    var { lines } = gMeme
    var txt = lines[gCuurLineIdx].txt
    var size = lines[gCuurLineIdx].size
    var color = lines[gCuurLineIdx].color

    // console.log('hitxte');
    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    gCtx.fillText(txt, 50 + space, 50 + space)
    // gCtx.strokeText(txt, 50 + space, 50 + space)
    // renderMeme()
}


function onAddFrame(text) {

    if (!gCuurLineIdx === gMeme.selectedLineIdx) return

    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10
    // gCtx.fillText(text, x, y)
    gCtx.strokeRect(x - padding, y - 30, textWidth + 2 * padding, 40)
}


function onAddLocation(text) {
    var { lines } = gMeme
    // lines[gCuurLineIdx].location = { x, y, z, v }
    //     console.log( lines[gCuurLineIdx].location );
    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10

    lines[gCuurLineIdx].location = { x: x - padding, y: y - 30, z: textWidth + 2 * padding, v: 40 }
}



function onSetLineTxt() {
    console.log('hi');

    gCurrLine = true
    const text = document.querySelector('[name="txt-meme"]').value
    console.log(text);
    setLineTxt(text)
    onAddFrame(text)
    onAddLocation(text)
    renderMeme()
}


function changeFontFamily() {
    var fontSelect = document.querySelector('fontSelect').value
    gCtx.font = fontSelect
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

    const { lines } = gMeme
    var line = {
        txt: 'Add Text Here',
        size: 30,
        color: 'black'
    }
    var { txt, size, color } = line
    lines.push(line)
    console.log(lines);
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx);
    document.querySelector('[name="txt-meme"]').value = ''

    onAddDemoText(txt, size, color)
    onAddFrame(line.txt)
    // renderMeme()
}



function onSwitchLine() {
    gCurrLine = true
    gCuurLineIdx = (gCuurLineIdx === gMeme.lines.length - 1) ? 0 : gCuurLineIdx + 1

    onAddFrame()
    renderMeme()
}


function onAlignText(elAlign) {
    gCtx.textAlign = elAlign
}


function onChangeFont(font) {
    gCtx.font = font
}



// gCtx.lineWidth = 2
// gCtx.strokeRect(45, 20, 200, 45)

// var mouseX = ev.clientX - canvas.getBoundingClientRect().left
// var mouseY = ev.clientY - canvas.getBoundingClientRect().top

// console.log(mouseX, mouseY);

// // עדכון מיקום הטקסט בהתאם למיקום של העכבר
// textElement.style.left = mouseX + 'px';
// textElement.style.top = mouseY + 'px';
// // }


