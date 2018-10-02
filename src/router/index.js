import Vue from 'vue';
import VueRouter from 'vue-router';
const MainCon = () => import('../pages/layout.vue');
const RowCol = () => import('../pages/rowCol.vue');
const Button = () => import('../pages/button.vue');
const Select = () => import('../pages/select.vue');
Vue.use(VueRouter);
const routes = [
	{
		path : "/" , component : MainCon,
		children: [
			{
				path: 'row-col',
				component: RowCol
			}, {
			path: 'button',
				component: Button
			}, {
			path: 'select',
				component: Select
			}
		]
	}
]
const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})
export default router
