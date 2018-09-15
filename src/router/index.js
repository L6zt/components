import Vue from 'vue';
import VueRouter from 'vue-router';
const MainCon = () => import('../pages/layout.vue');
const RowCol = () => import('../pages/rowCol.vue');
Vue.use(VueRouter);
const routes = [
	{
		path : "/" , component : MainCon,
		children: [
			{
				path: 'row-col',
				component: RowCol
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
