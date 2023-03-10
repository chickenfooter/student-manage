import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import breadcrumb from './breadcrumb'
import admin from './admin'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user, breadcrumb, admin
    }
})