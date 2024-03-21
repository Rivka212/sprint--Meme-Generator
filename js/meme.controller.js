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

    // var { lines } = gMeme
    // var [{ txt, size, color }] = lines
    // gCtx.fillStyle = color
    // gCtx.font = size + 'px Arial'
    // gCtx.fillText(txt, 50, 50)
    // gCtx.strokeText(txt, 50, 50)
    // console.log('hi');


    // window.addEventListener('resize', () => resizeCanvas())
}

// var txt = gMeme.lines[gCuurLineIdx].txt
// var size = gMeme.lines[gCuurLineIdx].size
// var color = gMeme.lines[gCuurLineIdx].color


function renderMeme() {
    const meme = getMeme()
    var { lines } = meme
    var [{ txt, size, color }] = lines

    const img = new Image()
    img.src = gImg.url

    img.onload = () => {
        console.log('hi');
        coverCanvasWithImg(img)
        onAddDemoText()
        if (gCuurLineIdx === gMeme.selectedLineIdx) {
            onAddFrame(txt)
        }
    }
}
// resizeCanvas()


// window.addEventListener('resize', () => resizeCanvas())


// input.oninput = function() {
//     drawTextOnCanvas(input.value);
// }



function onAddDemoText(txt, size, color) {
    var txt = gMeme.lines[gCuurLineIdx].txt
    var size = gMeme.lines[gCuurLineIdx].size
    var color = gMeme.lines[gCuurLineIdx].color

    console.log('hitxte');
    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    gCtx.fillText(txt, 50 + space, 50 + space)
    // gCtx.strokeText(txt, 50 + space, 50 + space)
    // renderMeme()
}


function onAddFrame(text) {
    console.log(gCuurLineIdx, gMeme.selectedLineIdx);

    if (!gCuurLineIdx === gMeme.selectedLineIdx) return

    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10
    //    gCtx.clearRect(x - padding, y - 30, textWidth + 2 * padding, 40)
    // gCtx.fillText(text, x, y)
    gCtx.strokeRect(x - padding, y - 30, textWidth + 2 * padding, 40)

    // onAddLocation(x - padding, y - 30, textWidth + 2 * padding, 40)

    // renderMeme()
    // var place = textWidth.getBoundingClientRect()
    // console.log(place);
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
    // text = ''

}
// saveText(text)
// text = ''
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
    var { txt, size, color } = line
    lines.push(line)
    console.log(lines);
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx);
    document.querySelector('[name="txt-meme"]').value = ''
    // console.log(document.querySelector('[name="txt-meme"]').value = '');
    onAddDemoText(txt, size, color)
    onAddFrame(line.txt)
    // renderMeme()
}


function onShowLines() {
    const { lines } = gMeme
    const { txt } = lines
    for (let i = 0; i < lines.length; i++) {
        const element = array[i];

    }


    // element.getBoundingClientRect()
}


function onSwitchLine() {
    gCurrLine = true

    gCuurLineIdx = (gCuurLineIdx === gMeme.lines.length - 1) ? 0 : gCuurLineIdx + 1

    // gCtx.lineWidth = 2
    // gCtx.strokeRect(45, 20, 200, 45)
    onAddFrame()
    renderMeme()
}


function onAlignText(elAlign) {
    gCtx.textAlign = elAlign
}


function onChangeFont(font) {
    gCtx.font = font
}



// function onMouseMove(ev) {
// ?const { offsetX, offsetY, pageX, pagetY } = ev
// const { offsetX, offsetY, clientX, clientY } = ev

// var mouseX = ev.clientX - canvas.getBoundingClientRect().left
// var mouseY = ev.clientY - canvas.getBoundingClientRect().top

// console.log(mouseX, mouseY);

// // עדכון מיקום הטקסט בהתאם למיקום של העכבר
// textElement.style.left = mouseX + 'px';
// textElement.style.top = mouseY + 'px';
// // }


// console.log();
// :TODO - find the hovered star

// const star = gStars.find(star => {
//     var { x, y, rate } = star

//     return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
//             offsetY >= y && offsetY <= y + rate)
// })
