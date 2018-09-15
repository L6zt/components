import Vue from 'vue';
import router from './router/index';
import App from './app.vue';
import regDirectives from  './directives/index';
regDirectives(Vue);
const app = new Vue({
	router,
	render (h) {
		return h("App")
	},
	components: {App}
})
app.$mount("#app")
