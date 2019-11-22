import { Route } from './type'

const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: () =>
    import(/* webpackChunkName: 'Home' */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue')
  }
];

export default routes