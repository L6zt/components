import eventMix from "./eventMix";
import registerComp from './register.js'
import dialog from './dialog';
const pulgins = [ eventMix,registerComp ,dialog];
const regPlugins = (Vue) => {
	pulgins.map(p => Vue.use(p))
}
export default regPlugins
