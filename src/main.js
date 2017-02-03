import Vue from 'vue'
import VueRouter from 'vue-router'
import vueI18n from 'vue-i18n'
import pt from './pt'
import en from './en'
import About from './About.vue'
import Mapa from './Mapa.vue'

Vue.use(VueRouter)

Vue.use(vueI18n)

let locales = {pt, en}

Vue.config.lang = 'pt'

Object.keys(locales).forEach(function (lang) {
	Vue.locale(lang, locales[lang])
})

const routes = [
	{
		path: '/about',
		component: About
	},
	{
		path: '/mapa',
		component: Mapa
	}
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router
})
