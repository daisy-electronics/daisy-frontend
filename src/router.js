import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard';
import LoginForm from './components/LoginForm';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Dashboard },
    { path: '/login', component: LoginForm }
  ]
});
