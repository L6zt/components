import Vue from 'vue';
import router from './router/index';
import App from './app.vue';
import regDirectives from  './directives/index';
import regPlugins from './plugins/index';
import { transform } from '@l6zt/cutils'

console.log(transform);

regDirectives(Vue);
regPlugins(Vue);
const app = new Vue({
	router,
	render (h) {
		return h("App")
	},
	components: {App}
});
app.$mount("#app");
