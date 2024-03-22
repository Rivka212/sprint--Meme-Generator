'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0
let gFrame = 0



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
        if (gFrame === gMeme.selectedLineIdx) {
            onAddFrame(txt)
        }
    }
}




function onShowLines() {
    console.log('hi');
    if (gCuurLineIdx === 0) return
    const { lines } = gMeme

    lines.forEach(line => {
        var { txt, size, color, location } = line
        gCtx.fillStyle = color
        gCtx.font = size + 'px Arial'
        gCtx.fillText(txt, location.x, location.y)
    })
}


function onAddDemoText(txt, size, color) {
    console.log('hitext');
    var { lines } = gMeme
    var txt = lines[gCuurLineIdx].txt
    var size = lines[gCuurLineIdx].size
    var color = lines[gCuurLineIdx].color
    var location = lines[gCuurLineIdx].location
    // console.log(lines[gCuurLineIdx].location);
    // console.log(location);
    // console.log('hitxte');
    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace + 50
    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    var x = space
    var y = space
    if (gCuurLineIdx === 0) gCtx.fillText(txt, x, y)

    if (gCuurLineIdx !== 0) {
        x += location.x
        y += location.y
        gCtx.fillText(txt, x, y)
    }


    gMeme.lines[gCuurLineIdx].location.x = x
    gMeme.lines[gCuurLineIdx].location.y = y

    // console.log( gMeme.lines[gCuurLineIdx].location);
    // gCtx.strokeText(txt, 50 + space, 50 + space)
    // renderMeme()
}

function checkOnCanvas(event) {

    console.log();
}



function onAddFrame(text) {
    console.log('hi mi');
    if (!gFrame === gMeme.selectedLineIdx) return
    console.log('baymi');
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
    console.log(text);

    lines[gCuurLineIdx].location = { x: x - padding, y: y - 30, z: textWidth + 2 * padding, v: 40 }
    console.log(lines[gCuurLineIdx].location);
}



function onSetLineTxt() {
    console.log('hi');

    gCurrLine = true
    const text = document.querySelector('[name="txt-meme"]').value
    console.log(text);
    setLineTxt(text)
    onAddFrame(text)
    // onAddLocation(text)
    renderMeme()
}


function changeFontFamily(ev) {
    var fontSelect = document.querySelector('fontSelect').value
    // gCtx.font = fontSelect 'px Arial'
    console.log('px fontSelect');
    console.log(ev);
    console.log(gMeme.lines[gCuurLineIdx].font);
    gMeme.lines[gCuurLineIdx].font = fontSelect
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
    gMeme.lines[gCuurLineIdx].color = newColor
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
    gCuurLineIdx++
    console.log(gCuurLineIdx);

    const { lines } = gMeme
    var line = {
        txt: 'Add Text Here',
        size: 30,
        color: 'black',
        location: { x: 0, y: 0, z: 0, v: 0 },
    }
    var { txt, size, color, location } = line
    lines.push(line)
    console.log(lines);
    gFrame++
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx);
    document.querySelector('[name="txt-meme"]').value = ''

    onAddDemoText(txt, size, color, location)
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


