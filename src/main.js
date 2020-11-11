import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import {routes}from "./Routes/Routes";
import Vuetify from "vuetify";
import {store} from "./components/Store/Store";
import "vuetify/dist/vuetify.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
    routes
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
// Review

// import Vue from 'vue';
// import VueRouter from "vue-router";
// import Vuex from "vuex";
// Vue.use(Vuex);
// Vue.use(VueRouter);
// // store
// const store = new Vuex.Store({
//     state:{
//         name: "",
//         age: ""
//     },
//     getters: {
//         name: state =>{
//             return state.name
//         },
//         age: state =>{
//             return state.age
//         }
//     },
//     mutations: {
//         changeName: (state, payload) => {
//             const {name, age}= payload;
//            state.name= name;
//            state.age =  age;
//         }
//     },
//     action: ({commit}, payload) =>{
//         commit("changeName", payload);
//     }
// });
// // To change an element in the state
// // Another component
// <script>
//     export default({
//         methods:{
//             changeMyInfo: {
//                 this.$store.dispatch("changeName", {"mahmoud", 25})
//             }
//         }
//     })
// </script>
// //To read an element in the state
// // Another component or same component
// <template>
//     <p>Name: {this.$store.state.name}</p>
//     <p>Age: {this.$store.state.age}</p>
// </template>

// // routes
// const router = new VueRouter({
//     routes=[
//         {path:"/users", component: Users},

//     ]
// });
// `
//     <Vue-link to="/users">Users</Vue-link>
// `


// new Vue({
//     el: "#app",
//     components: "ff",
//     router,
//     render: h => h(App)
// });