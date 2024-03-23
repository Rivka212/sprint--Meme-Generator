'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0
let gFrame = 0
let gCurrFrame = false

const gQueryOptions = { font: 'px Verdana' }


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
    //    if(gCuurLineIdx === 0)

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
    // gCtx.textAlign = 'center'
    gCtx.font = size + gQueryOptions.font
    var x = space
    var y = space
    gCtx.fillText(txt, x, y)
    // }
    gMeme.lines[gCuurLineIdx].location.x = x
    gMeme.lines[gCuurLineIdx].location.y = y

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

    var line = lines.find(line => {
        var { location } = line
        // var { x, y, w, h } = location
        // var rate = w * h
        //  [{ location }] = lines
        console.log(line);
        console.log(lines[gCuurLineIdx].location.x)

        console.log(location.x, location.y, location.w, location.h);
        console.log(offsetX, offsetY, clientX, clientY);
        return (offsetX >= location.x && offsetX <= location.x + location.w &&
            offsetY >= location.y && offsetY <= location.h)
        // return (offsetX >= x && offsetX <= x + w &&
        //         offsetY >= y && offsetY <= y + rate)
    })

    if (line) {
        console.log('coco');
    }

}



function onAddFrame(text) {
    console.log('hi frame');
    if (!gFrame === gMeme.selectedLineIdx) return
    if(gCurrFrame)
    console.log('baymi');
    var cuurSpace = 40
    var space = gCuurLineIdx * cuurSpace
    const textWidth = gCtx.measureText(text).width
    const x = 50 + space
    const y = 50 + space
    const padding = 10
    // gCtx.fillText(text, x, y)
    gCtx.strokeRect(x - padding, y - 30, textWidth + 2 * padding, 40)
   console.log(x - padding, y - 30, textWidth + 2 * padding, 40);
    // onShowLines()

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

    lines[gCuurLineIdx].location = { x: x - padding, y: y - 30, w: textWidth + 2 * padding, h: 40 }
    console.log(lines[gCuurLineIdx].location);
}



function onSetLineTxt() {
    console.log('set-text');

    gCurrLine = true
    const text = document.querySelector('[name="txt-meme"]').value

    setLineTxt(text)

    // onAddFrame(text)
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
    gCurrFrame = true
    gCuurLineIdx++
    const { lines } = gMeme
    var line = {
        txt: 'Add Text Here',
        size: 30,
        color: 'black',
        location: { x: 40, y: 20, w: 230, h: 40 },
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





// gCtx.lineWidth = 2
// gCtx.strokeRect(45, 20, 200, 45)

// var mouseX = ev.clientX - canvas.getBoundingClientRect().left
// var mouseY = ev.clientY - canvas.getBoundingClientRect().top

// console.log(mouseX, mouseY);

// // עדכון מיקום הטקסט בהתאם למיקום של העכבר
// textElement.style.left = mouseX + 'px';
// textElement.style.top = mouseY + 'px';
// // }


