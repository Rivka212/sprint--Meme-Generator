'use strict'



function renderGallery() {
    var images = gImgs
    // console.log(images);
    const elImages = document.querySelector('.images-gallery')

    const strHTML = images.map(img => {
        return `<img src="imgs/${img.id}.jpg" onclick="onImgSelect(this,${img.id})" id=${img.id}>`
    })

    elImages.innerHTML = strHTML.join('')
}


function onImgSelect(elImg, imgId) {
    console.log(elImg, imgId);
  
    const {img} = gImgs

    const elGallery = document.querySelector('.images-gallery')
    elGallery.classList.add('hidden')

    const elimgMeme = document.querySelector('.meme-container')
    elimgMeme.classList.remove('hidden')

    setImg(imgId)
    // coverCanvasWithImg(elImg)
    renderMeme()
}

// function onSelectImg(elImg) {
//     coverCanvasWithImg(elImg)
// }


function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    renderMeme()
}



// canvas id="myCanvas" width="400" height="200" style="border:1px solid black;"></canvas><br>
//     <input type="text" id="textInput"><br>
  
//         var texts = {
//             text1: "Hello, World!",
//             text2: "This is text 2"
//         };

//         function drawText(text) {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.font = '20px Arial';
//             ctx.fillText(texts[text], 50, 100);
//         }

//         function addText() {
//             texts.text2 = document.getElementById('textInput').value;
//             drawText('text2');
//         }

//         function changeText() {
//             texts.text1 = "New Text";
//             drawText('text1');
//         }

//         drawText('text1');
 
