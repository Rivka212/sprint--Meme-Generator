'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0
let gFrame = 0
let gCurrFrame = false

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
        console.log('hi');
        coverCanvasWithImg(img)
        // if (gCuurLineIdx === 0) onAddDemoText()
        onAddDemoText()
        onShowLines()
    }
}




function onShowLines() {
    console.log('hi-show');
    if (gFrame === 0) return
    const { lines } = gMeme
    lines.forEach(line => {
        var { txt, size, color, location } = line
        gCtx.fillStyle = color
        gCtx.font = size + gQueryOptions.font
        gCtx.fillText(txt, location.x, location.y)
        console.log('location.x, location.y', location.x, location.y);

    })

    // console.log('location.x, location.y', location.x, location.y);
}


function onAddDemoText(txt, size, color) {
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
    gMeme.lines[gCuurLineIdx].location.x = x
    gMeme.lines[gCuurLineIdx].location.y = y
    console.log('x, y', x, y);
    onAddFrame(txt)
}


function checkOnCanvas(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    console.log(ev);
    const { lines } = gMeme
    // console.log(lines);
    // var [{ location }] = lines
    // var { x, y, w, h } = location
    // console.log(lines[0].location)
    // var rate = w * h
    console.log(gMeme.lines[gCuurLineIdx].location.x);

    // (x - padding, y - padding, textWidth + 2 * padding, size + 2 * padding)


    var line = lines.find(line => {
        var { location } = line
        // var { x, y, w, h } = location
        // var rate = w * h
        //  [{ location }] = lines
        var padding = 10
        console.log(line);
        console.log(lines[gCuurLineIdx].location.x)

        console.log(location.x, location.y, location.w, location.h);
        console.log(offsetX, offsetY, clientX, clientY);
        return (offsetX >= location.x - padding && offsetX <= location.x + location.w + 2 * padding &&
            offsetY >= location.y + padding && offsetY <= location.h)
        // return (offsetX >= x && offsetX <= x + w &&
        //         offsetY >= y && offsetY <= y + rate)
    })

    if (line) {
        console.log('cocojknlsknblkfml');
    }

}



function onAddFrame(text) {
    console.log('hi frame');
    var { lines } = gMeme
    var [{ size }] = lines
    console.log('size', size);
    if (!gFrame === gMeme.selectedLineIdx) return
    if (gCurrFrame)
        console.log('baymi');
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
    console.log(x - padding, y - padding, textWidth + 2 * padding, 40);
    // gMeme.lines[gCuurLineIdx].location.x = x-padding
    // gMeme.lines[gCuurLineIdx].location.y = y-padding
    // // onShowLines()
    // renderMeme()
    // onAddLocation()
    // lines[gCuurLineIdx].location = { x: x - padding, y: y - padding, w: textWidth + 2 * padding, h: size + 2 * padding }

}

console.log();

function onAddLocation(text) {
    var { lines } = gMeme
    var [{ size }] = lines
    // lines[gCuurLineIdx].location = { x, y, z, v }
    //     console.log( lines[gCuurLineIdx].location );
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
    console.log('set-text');

    gCurrLine = true
    const text = document.querySelector('[name="txt-meme"]').value

    setLineTxt(text)

    onAddFrame(text)
    console.log(text);
    // onAddLocation(text)
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
    console.log(lines);
    gFrame++
    gMeme.selectedLineIdx++
    document.querySelector('[name="txt-meme"]').value = ''

    onAddFrame(line.txt)
    onAddDemoText(txt, size, color, location)
    // onAddFrame(line.txt)
    // renderMeme()
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
    gCuurLineIdx
    var { lines } = gMeme
    lines.splice(gCuurLineIdx, 1)
    renderMeme()
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

function onSave() { 
    gMemes.push(gMeme)

    const dataURL = gElCanvas.toDataURL()
    saveToStorage('canvas', dataURL)
}
