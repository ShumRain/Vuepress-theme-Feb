
export function formatDate(fmt) {
    if (fmt == null) return ''
    const date = new Date(fmt)

    const monthAbbr = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    return `${date.getDate()} ${monthAbbr[date.getMonth()]} ${date.getFullYear()}`
}


export function bgiLazy() {
    let lazyBg = Array.from(document.getElementsByClassName('lazy-bg'))

	lazyBg.forEach(i => {
		let tempImg = new Image()
		tempImg.src = i.getAttribute('data-lazy')
		
		tempImg.addEventListener('load', () => {
			i.style.backgroundImage = `url(${tempImg.src})`
			i.removeAttribute('data-lazy')
			tempImg = null
		})
	})
}