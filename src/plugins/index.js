import eventMix from "./eventMix"
import dialog from './dialog'
const pulgins = [ eventMix, dialog]
const regPlugins = (Vue) => {
	pulgins.map(p => Vue.use(p))
}
export default regPlugins
