	export const on = ({el, type, fn}) => {
		 if (typeof window) {
		 	if (window.addEventListener) {
		 		el.addEventListener(type, fn, false)
		    } else {
		 		el.attachEvent(`on${type}`, fn)
		    }
		 }
	}
	export const off = ({el, type, fn}) => {
		if (typeof window) {
			if (window.removeEventListener) {
				el.removeEventListener(type, fn)
			} else {
				el.detachEvent(`on${type}`, fn)
			}
		}
	}
	export const once = ({el, type, fn}) => {
		const hyFn = (event) => {
			try {
				fn(event)
			}
			 finally  {
				off({el, type, fn: hyFn})
			}
		}
		on({el, type, fn: hyFn})
	}
	// 最后一个
	export const fbTwice = ({fn, time = 300}) => {
		let [cTime, k] = [null, null]
		// 获取当前时间
		const getTime = () => new Date().getTime()
		// 混合函数
		const hyFn = () => {
			const ags = argments
			return () => {
				clearTimeout(k)
				k = cTime =  null
				fn(...ags)
			}
		}
		return () => {
			if (cTime == null) {
				k = setTimeout(hyFn(...arguments), time)
				cTime = getTime()
			} else {
				if ( getTime() - cTime < 0) {
					// 清除之前的函数堆 ---- 重新记录
					clearTimeout(k)
					k = null
					cTime = getTime()
					k = setTimeout(hyFn(...arguments), time)
				}
			}}
	}
	export  const contains = function(parentNode, childNode) {
		if (parentNode.contains) {
			return parentNode != childNode && parentNode.contains(childNode)
		} else {
			// https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition
			console.log('2rd contains')
			return (parentNode.compareDocumentPosition(childNode) === 16)
		}
	}
	export const addClass = function (el, className) {
		if (typeof el !== "object") {
			return null
		}
		let  classList = el['className']
		classList = classList === '' ? [] : classList.split(/\s+/)
		if (classList.indexOf(className) === -1) {
			classList.push(className)
			el.className = classList.join(' ')
		}
	}
	export const removeClass = function (el, className) {
		let classList = el['className']
		classList = classList === '' ? [] : classList.split(/\s+/)
		classList = classList.filter(item => {
			return item !== className
		})
		el.className = 	classList.join(' ')
	}
	export const delay = ({fn, time}) => {
		let oT = null
		let k = null
		return () => {
			// 当前时间
			let cT = new Date().getTime()
			const fixFn = () => {
				k = oT = null
				fn()
			}
			if (k === null) {
				oT = cT
				k = setTimeout(fixFn, time)
				return
			}
			if (cT - oT < time) {
				oT = cT
				clearTimeout(k)
				k = setTimeout(fixFn, time)
			}
		
		}
	}
