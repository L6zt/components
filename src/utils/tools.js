   export const isServer = () => {
		return typeof window !== "object"
    }
    export const isIos = () => {
	    const u = navigator.userAgent
		return  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
	const animation = () => {
	    if (isServer()) {
	    	return {}
	    }
		const  vendors = ['webkit', 'moz']
		let requestAnimationFrame = window.requestAnimationFrame
		let cancelAnimationFrame = window.cancelAnimationFrame
		for(let i  = 0; i < vendors.length && !requestAnimationFrame; ++i) {
			requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame']
			cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']
		}
		if (!requestAnimationFrame) {
			requestAnimationFrame = (cb, element) => {
				const id = setTimeout(function() {
					cb()
				}, 13)
				return id
			}
		}
		if (!cancelAnimationFrame) {
			cancelAnimationFrame = (id) => {
				clearTimeout(id)
			}
		}
		return {requestAnimationFrame, cancelAnimationFrame}
	}
	const amObj = animation()
    const toString =  (context) => {
		return Object.prototype.toString.call(context)
    }
    const deepClone = (target) => {
		let result = Object.create({})
		if (typeof target === 'number' || typeof target === 'boolean' || typeof target === 'string') {
			return target
		}
		if (toString(target) === '[object Object]') {
			for (let k in target) {
				result[k] = deepClone(target[k])
			}
			return result
		}
		if (toString(target) === '[object Array]') {
			result = target.map(item => {
				return deepClone(item)
			})
			return result
		}
		return target
    }
	export const requestAnimationFrame = amObj.requestAnimationFrame
    export const cancelAnimationFrame = amObj.cancelAnimationFrame
