import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import ws from './ws';
import views from './views';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    store => ['ws', 'auth', 'views']
      .forEach(ns => store.dispatch(`${ns}/$init`, store))
  ],
  modules: {
    auth,
    ws,
    views
  }
});
