import eventMix from './eventMix';
import registerComp from './register.js'
import dialog from './dialog';
import spDialog from './spDialog'
const pulgins = [ eventMix, registerComp ,dialog, spDialog];
const regPlugins = (Vue) => {
	pulgins.map(p => Vue.use(p))
}
export default regPlugins
