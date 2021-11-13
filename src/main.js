import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import {routes}from "./Routes/Routes";
import Vuetify from "vuetify";
import {store} from "./Store/Store";
import "vuetify/dist/vuetify.min.css";
import "./design/bootstrap/css/bootstrap.min.css";
import "./design/bootstrap/css/bootstrap-grid.min.css";
import "./design/style.css";
import "./design/MaterialDesign-Webfont-master/css/materialdesignicons.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
    routes,
    mode: 'history',
})
export default new Vuetify({
    theme:{
        dark: false
    }
})
//vue root instance
new Vue({
    el:"#App",
    router,
    store,
    vuetify: new Vuetify(),
    render: h => h(App)
})