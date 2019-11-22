import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './mapRoute';
const NODE_ENV = process.env.NODE_ENV === 'production';
const ROUTES_INDEX = process.env.ROUTES_INDEX || 0;
const _routes = NODE_ENV ? [routes[ROUTES_INDEX]] : routes;
Vue.use(VueRouter);
const router = new VueRouter({
  routes: _routes
});

export default router;
