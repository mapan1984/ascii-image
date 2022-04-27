import imageData2HTML from './utils.js'

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'assets/kabi.png';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const ascii = document.querySelector('#ascii');

img.addEventListener('load', () => {
    console.log(`img width: ${img.width}, height: ${img.height}`)

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';

    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    const content = imageData2HTML(imageData, img.height, img.width)
    ascii.innerHTML = content
})

// 上传文件
const imageInput = document.querySelector('#imageInput')
imageInput.addEventListener('change', e => {
    img.src = URL.createObjectURL(e.target.files[0])
});
