import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/**
 * Antd 按需引入
 */
// import Button from 'ant-design-vue/lib/?????????????';
import {Button, Row, Col, Input, List, Icon, Table} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Input.name, Input);
Vue.component(List.name, List);
Vue.component(List.Item.name, List.Item);
Vue.component(Table.name, Table);
Vue.component(Icon.name, Icon);

/* 引入Antd样式 */
// import 'ant-design-vue/dist/antd.css';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
