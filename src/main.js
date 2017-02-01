import Vue from 'vue'
import VueRouter from 'vue-router'
import vueI18n from 'vue-i18n'
import pt from './pt'
import en from './en'
import App from './App.vue'
import Mapa from './mapa.vue'

Vue.use(VueRouter)

Vue.use(vueI18n)

let locales = {pt, en}

Vue.config.lang = 'pt'

Object.keys(locales).forEach(function (lang) {
	Vue.locale(lang, locales[lang])
})

const routes = [
	{
		path: '/',
		component: App
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