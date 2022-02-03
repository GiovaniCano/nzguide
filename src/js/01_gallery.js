// gallery creation
for (let i = 1; i <= 10; i++) {
    const gallery__pictures = document.querySelector('.gallery__pictures')

    const picture = document.createElement('picture')
    gallery__pictures.appendChild(picture)

    const source = document.createElement('source')
    source.srcset = `build/img/nz-thumb-${i}.webp`
    source.type = 'image/webp'
    picture.appendChild(source)

    const img = document.createElement('img')
    img.src = `build/img/nz-thumb-${i}.jpg`
    img.loading = 'lazy'
    img.alt = 'Image New Zealand'
    img.dataset.imageId = i
    img.onclick = createImageFullSize
    picture.appendChild(img)
}

// click image  // header .below   // body .noscroll
function createImageFullSize(e) {
    const body = document.querySelector('body')
    const header = document.querySelector('header')
    body.classList.add('noscroll')
    header.classList.add('below')

    // create image full size
    const imgBig = document.createElement('div')
    imgBig.classList.add('imgBig')
    body.appendChild(imgBig)

    const imgBig__top = document.createElement('div')
    imgBig__top.classList.add('imgBig__top')
    imgBig.appendChild(imgBig__top)
    const imgBig__bot = document.createElement('p')
    imgBig__bot.classList.add('imgBig__bot')
    imgBig__bot.textContent = 'X'
    imgBig.appendChild(imgBig__bot)

    const imgBig__leftArrow = document.createElement('p')
    imgBig__leftArrow.classList.add('imgBig__leftArrow')
    imgBig__leftArrow.textContent = '<'
    imgBig__top.appendChild(imgBig__leftArrow)
    const imgBig__image = document.createElement('div')
    imgBig__image.classList.add('imgBig__image')
    imgBig__top.appendChild(imgBig__image)
    const imgBig__rightArrow = document.createElement('p')
    imgBig__rightArrow.classList.add('imgBig__rightArrow')
    imgBig__rightArrow.textContent = '>'
    imgBig__top.appendChild(imgBig__rightArrow)

    const picture = document.createElement('picture')
    imgBig__image.appendChild(picture)

    let imageId = parseInt(e.target.dataset.imageId)
    const source = document.createElement('source')
    source.srcset = `build/img/nz-${imageId}.webp`
    source.type = 'image/webp'
    const img = document.createElement('img')
    img.src = `build/img/nz-${imageId}.jpg`
    img.alt = 'Image New Zealand'
    picture.appendChild(source)
    picture.appendChild(img)

    // onclicks
    // close image
    //diferent ways to close the image according to the device width
    if (window.innerWidth > 768) { 
        imgBig.onclick = closeImage
    } else {
        img.onclick = closeImage
        imgBig__bot.onclick = closeImage
    }
    function closeImage(e) {
        if (e.target !== imgBig__leftArrow && e.target !== imgBig__rightArrow) {
            body.classList.remove('noscroll')
            header.classList.remove('below')
            imgBig.remove()
        }
    }
    // previus & next image
    imgBig__leftArrow.onclick = () => {
        if (imageId == 1) {
            imageId = 10
        } else {
            imageId--
        }
        source.srcset = `build/img/nz-${imageId}.webp`
        img.src = `build/img/nz-${imageId}.jpg`
    }
    imgBig__rightArrow.onclick = () => {
        if (imageId == 10) {
            imageId = 1
        } else {
            imageId++
        }
        source.srcset = `build/img/nz-${imageId}.webp`
        img.src = `build/img/nz-${imageId}.jpg`
    }
}