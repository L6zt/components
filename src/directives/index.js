import clickout from './clickout';
import tips from './tips';
const directives = [clickout, tips];
const regDirectives = (Vue) => {
	directives.map(d => Vue.directive(d.name, d))
}
export default regDirectives

