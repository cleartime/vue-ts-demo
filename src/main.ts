import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
