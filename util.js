const throttle = (fn, interval = 250) => {
	let timer,
		firstTime = true
	return function () {
		let args = arguments,
			me = this
		if (firstTime) {
			fn.apply(me, args)
			return firstTime = false
		}
		if (timer) {
			return false
		}
		timer = setTimeout(() => {
			clearTimeout(timer)
			timer = null
			fn.apply(me, args)
		}, interval)
	}
}


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

export function lazyload(container) {
	const DEFAULT = {
		container: container || document,
		offset: 100,
		throttle: 250
	}

	const inView = (ele, view) => {
		const rect = ele.getBoundingClientRect()
		return (
			rect.right >= view.l && 
			rect.left <= view.r && 
			rect.top <= view.b &&
			rect.bottom >= view.t 
		)
	}

	class Lazy {
		constructor(opts = {}) {
			this.opts = Object.assign({}, DEFAULT, opts)
			this.init()
		}

		init() {
			this.view = {
				l: 0 - this.opts.offset,
				t: 0 - this.opts.offset,
				b: window.innerHeight + this.opts.offset,
				r: window.innerWidth + this.opts.offset
			}

			this.rander()

			this.throttleRander = throttle(() => {
				this.rander()
			}, 1000)

			window.addEventListener('scroll', this.throttleRander)
		}

		rander() {
			let imgs = this.opts.container.querySelectorAll('[data-lazy]'),
				number = Array.from(imgs).length,
				srcCache = null
			
			Array.from(imgs).forEach(ele => {
				if (inView(ele, this.view)) {
					ele.src !== (srcCache = ele.getAttribute('data-lazy')) && (ele.src = srcCache)

					ele.removeAttribute('data-lazy')
				}
			})

			if (!number) {
				this.detach()
			}
		}

		detach() {
			window.removeEventListener('scroll', this.throttleRander)
		}
	}

	new Lazy()
}

import Gitment from 'gitment'

export function comments(config, container) {
	config = config || {}

	let gitment = new Gitment(config)

	return {
		render() {
			if (!gitment) gitment = new Gitment(config)
			container ? gitment.render(container) :
			document.body.appendChild(gitment.render())
		},
		destory() {
			gitment = null
		}
	}
}