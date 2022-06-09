import imageData2HTML from './utils.js'

const img = new Image();
img.crossOrigin = 'anonymous';

// 默认显示图片
img.src = 'assets/kabi.png';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const ascii = document.querySelector('#ascii');

// 上传文件
const imageInput = document.querySelector('#imageInput')
imageInput.addEventListener('change', e => {
    img.src = URL.createObjectURL(e.target.files[0])
});

// 是否开启 RGB
let enableRGB = true
const enableRGBInput = document.querySelector('#enableRGB')
enableRGBInput.addEventListener('change', () => {
    enableRGB = enableRGBInput.checked
});

// 点击按钮渲染
const renderBtn = document.querySelector('#render')
renderBtn.addEventListener('click', () => {
    showASCII(img, canvas, ctx, enableRGB)
});

// 每次图片加载后自动渲染
img.addEventListener('load', () => {
    showASCII(img, canvas, ctx, enableRGB)
})

function showASCII(img, canvas, ctx, enableRGB) {
    console.log(`img width: ${img.width}, height: ${img.height}`)

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';

    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    const content = imageData2HTML(imageData, img.height, img.width, enableRGB)
    ascii.innerHTML = content
}
