import Vue from 'vue';
import VueRouter from 'vue-router';
const MainCon = () => import('../pages/layout.vue');
const RowCol = () => import('../pages/rowCol.vue');
const Button = () => import('../pages/button.vue');
const Select = () => import('../pages/select.vue');
const Radio = () => import('../pages/radio.vue');
const Swiper = () => import('../pages/swiper.vue');
const NotFound = () => import('../pages/notFound.vue');
const SlideMenu = () => import('../pages/slideMenu.vue');
const Table = () => import('../pages/table.vue');
const Index = () => import('../pages/index.vue');
const Slider = () => import('../pages/slider.vue');
const selectTree = () => import('../pages/selectTree.vue');
const Pagination = () => import('../pages/pagination.vue');
const Switch = () => import('../pages/switch.vue');
Vue.use(VueRouter);
const routes = [
	{
		path : "/" , component : MainCon,
		children: [
			{
				path: '',
				component: Index
			},
			{
				path: 'row-col',
				component: RowCol
			}, {
			path: 'button',
				component: Button
			}, {
			path: 'select',
				component: Select
			},
			{
				path: 'radio',
				component: Radio
			},
			{
				path: 'swiper',
				component: Swiper
			}, {
			path: 'slidemenu',
				component: SlideMenu
			}, {
			path: 'table',
				component: Table
			},
			{
				path: 'slider',
				component: Slider
			}, {
				path: 'selectTree',
				component: selectTree
			}, {
			path: 'pagination',
				component: Pagination
			}, {
			path: 'switch',
				component:  Switch
			}
		]
	},
	{
		path: '*',
		component: NotFound
	}
];
const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})
export default router
