import clickout from './clickout';
const directives = [clickout];
const regDirectives = (Vue) => {
	directives.map(d => Vue.directive(d.name, d))
}
export default regDirectives

