import globalTip from "./globalTip"
import wxConfig from "./wxConfig"
import eventMix from "./eventMix"
import wxShare from "./wxShare"
import lazyFix from "./lazyFix"
const pulgins = [globalTip, wxConfig, eventMix, wxShare, lazyFix]
const regPulgins = (Vue) => {
	pulgins.map(p => Vue.use(p))
}
export default regPulgins