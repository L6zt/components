import { on , off , contains } from '../utils/dom';

export default {
	name : 'click-out' ,
	bind (el , binding , vnode) {
		const { context } = vnode;
		const { expression } = binding;
		const root = window.document.body;
		el._clickOut || ( el._clickOut = {} )
		const mdFn = (e) => {
			if ( !contains ( el , e.target ) ) {
				context[expression] ( e )
			}
		};
		console.log(el, context);
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
		const root = window.document.body;
		_clickOut && _clickOut.click && ( off ( { el : root , type : 'click' , fn : _clickOut.click } ) )
	}
}
