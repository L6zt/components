import { on , off , contains } from '../utils/dom';
const global = window;
export default {
	name : 'click-out' ,
	bind (el , binding , vnode) {
		const { context } = vnode;
		const { expression } = binding;
		
		const root = global.document.body;
		el._clickOut || ( el._clickOut = {} )
		const mdFn = (e) => {
			const target = e.target;
			if ( !contains ( el , target ) && el !== target ) {
				context[expression] ( e )
			}
		};
		context.$on ( 'hook:mounted' , () => {
			el._clickOut = {
				'click' : mdFn
			};
			on ( { el : root , type : 'click' , fn : mdFn } )
		} )
	} ,
	unbind (el , bind , vnode) {
		const { _clickOut } = el;
		el._clickOut = null;
		const root = global.document.body;
		_clickOut && _clickOut.click && ( off ( { el : root , type : 'click' , fn : _clickOut.click } ) )
	}
}
