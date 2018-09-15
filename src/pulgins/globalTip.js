import exTip from "../packages/tip/index"
const globalTip = {

}
globalTip.install = (Vue, options) => {
	Vue.prototype.$globalTip = ({type, text}) => {
		if (typeof window !== "undefined") {
			const vm = exTip()
			const root = window.document.createElement("div")
			const body = window.document.body
			body.appendChild(root)
			let vmElem
			//挂载到 root 上面
			vm.$on("son::destroyed", () => {
				// 问题
				vm.$destroy()
			})
			vm.$mount(root)
			Object.assign(vm, {
				type,
				text
			})
		}
	}
}
export default globalTip