import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    store => ['auth']
      .forEach(ns => store.dispatch(`${ns}/$init`, store))
  ],
  modules: {
    auth
  }
});
