// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
import {
  Container,
  Row,
  Col,
  Header,
  Progress,
  Aside,
  Main,
  menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Message,
  Tooltip,
  MessageBox,
  Footer,
  Tabs,
  TabPane,
  Button,
  Input,
  Select,
  Option,
  Form,
  FormItem,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Loading,
  Card,
  Notification
} from 'element-ui';
import BaiduMap from 'vue-baidu-map';
import './assets/common/css/common.css';
import './assets/common/css/animate.css';
import vuescroll from 'vuescroll';
import ApiPath from '@/api';
import * as filters from '@/assets/common/js/filter';
import Request from '@/http';
import common from '@/assets/common/js/common.js';
import Bus from './bus.js';
// eslint-disable-next-line
import focus from '@/assets/common/js/directives';

process.env.MOCK && require('@/mock');

Vue.use(BaiduMap, {
  ak: 'zwVpEq7Soe6T65PiCynLj5qeGfnSFcjU'
});
Vue.use(vuescroll);
Vue.use(Container);
Vue.use(Row);
Vue.use(Col);
Vue.use(Header);
Vue.use(Progress);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Radio);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Loading);
Vue.use(Card);

Vue.config.productionTip = false;

Vue.prototype.$request = Request;
Vue.prototype.$api = ApiPath;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$common = common;

window.Event = Bus;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
window.vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
