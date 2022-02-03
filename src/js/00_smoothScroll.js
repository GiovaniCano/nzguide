// smooth scroll to sections
const aHeader = document.querySelectorAll('.header__content a')
aHeader.forEach(a => {
    a.onclick = e => {
        e.preventDefault()
        const idToScroll = document.querySelector(e.currentTarget.attributes.href.value)
        idToScroll.scrollIntoView({behavior: 'smooth'})
    }
})