import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		svgs: null
	},
	getters: {
		getSvgs: state => {
			return state.svgs
		}
	},
	mutations: {
		setSvgs(state,data) {
			state.svgs = data
		},
	},
	actions: {
		updateSvgs: function(context, data) {
			this.commit('setSvgs', data)
		},
	}
})
