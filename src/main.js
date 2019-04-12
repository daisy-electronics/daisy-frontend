import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as ws from './ws';

import Button from './components/base/Button';
import Field from './components/base/Field';

ws.connect();

Vue.config.productionTip = false;

Vue.component('Button', Button);
Vue.component('Field', Field);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
