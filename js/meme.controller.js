'use strict'

let gElCanvas
let gCtx
let gCurrLine = false


function renderMeme() {
    const meme = getMeme()
    const { lines } = meme
    const [{ txt, size, color }] = lines
    var space = 0

    const img = new Image()
    img.src = gImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        for (let i = 0; i < lines.length; i++) {
            gCtx.fillStyle = color
            gCtx.font = size + 'px Arial'

            gCtx.fillText(txt, 50 + space, 50 + space)
            space += 25
        }

        if (gCurrLine) {
            // gCtx.lineWidth = 2
            // gCtx.strokeRect(45, 20, 200, 45)
            const textWidth = gCtx.measureText(txt).width
            const x = 50
            const y = 50
            const padding = 10

            gCtx.fillText(txt, x, y)
            gCtx.strokeRect(x - padding, y - 30, textWidth + 2 * padding, 40)
        }
    }
}




function onSetLineTxt(txt) {
    gCurrLine = true
    console.log(txt)
    setLineTxt()

    renderMeme()
}




function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function onSetColor() {
    const { lines } = gMeme
    const [{ color }] = lines

    // const elColorPicker = document.querySelector('colorPicker')
    // elColorPicker.style.remove('hidden')
    // style = "display: none;"

    var selectedColor = document.querySelector('selectedColor')
    selectedColor.style.backgroundColor = this.value
    console.log(this.value);
    selectedColor.innerText = color + this.value


    // var newColor = document.createElement('INPUT')
    // newColor.setAttribute('type', 'color')
    // document.body.appendChild(newColor)

    color = newColor
}



function onChangeFontSize(elSize) {
    const { lines } = gMeme
    const [{ size }] = lines

    if (elSize === 'increase') gMeme.lines[0].size = size + 5
    else if (elSize === 'decrease') gMeme.lines[0].size = size - 5

    renderMeme()
}


function onAddLines() {
    const { lines } = gMeme
    var line =
    {
        txt: 'Add Text Here',
        size: 30,
        color: 'black'
    }
    lines.push(line)
    renderMeme()
}


function onSwitchLine() {
    const { lines } = gMeme
    for (let i = 0; i < lines.length; i++) {
        lines[i] = 1
    }

    gCtx.lineWidth = 2
    gCtx.strokeRect(45, 20, 200, 45)

    renderMeme()
}
