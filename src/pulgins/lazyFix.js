//  fix event
const lazyFix = {}
lazyFix.install = (Vue, options) => {
	Vue.mixin({
		// mounted () {
		// 	this.$nextTick(() => {
		// 			this.$options.metaInfo && this.$lazyFix()
		// 	})
		// },
		methods: {
			$lazyFix() {
				const els = window.document.querySelectorAll(`[data-src]`)
				setTimeout(() => {
					els.forEach(el => {
						const src = el.getAttribute('data-src')
						const img = new Image()
						img.onload = () => {
							el.setAttribute('src', src)
						}
						img.src = src
					})
				}, 200)
			}
		}
	})
}
export default lazyFix