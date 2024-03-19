'use strict'

let gElCanvas
let gCtx
let gCurrLine = false
let gCuurLineIdx = 0


function renderMeme() {
    const meme = getMeme()
    const { lines } = meme
    const [{ txt, size, color }] = lines
    var space = 0
    // resizeCanvas()

    const img = new Image()
    img.src = gImg.url

    img.onload = () => {
        coverCanvasWithImg(img)
        // gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        for (let i = 0; i < lines.length; i++) {
            gCtx.fillStyle = color
            gCtx.font = size + 'px Arial'

            gCtx.fillText(txt, 50 + space, 50 + space)
            space += 35
            onAddFrame(txt)
         }
    }  
    // window.addEventListener('resize', () => resizeCanvas())
}

// function onAddDemoText(){
//     gCtx.fillStyle = color
//             gCtx.font = size + 'px Arial'

//             gCtx.fillText(txt, 50 + space, 50 + space)
//             space += 35
// }




function onAddFrame(text){

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
    gCurrLine = true
    
    const text = document.querySelector('[name="txt-meme"]').value
    console.log(text);
    setLineTxt(text)
    text = ''
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
    const { lines } = gMeme
    var line = {
        txt: 'Add Text Here',
        size: 30,
        color: 'black'
    }
    lines.push(line)
console.log(lines);
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx);
    onAddFrame(line.txt)
    // renderMeme()
}


function onSwitchLine() {
    gCurrLine = true
    // gCuurLineIdx = (gCuurLineIdx === gCurrMeme.lines.length - 1)?
    // 0: gCuurLineIdx + 1
    const {selectedLineIdx } = gMeme
    if(selectedLineIdx)
   
    gMeme.selectedLineIdx
    // gCtx.lineWidth = 2
    // gCtx.strokeRect(45, 20, 200, 45)

    // renderMeme()
}



 
