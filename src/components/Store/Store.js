import Vue from "vue"; //pay attention to the store formula
import Vuex from "vuex";
import englishWords from "./englishWordList.json";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        suggestions: englishWords,
        history: [],
        favorites: [],
        word: "",
        activeNavBtn: 0,
        openBackdrop: false,
        openSideDrawer: false,
        firebaseDataObj: {favorites: [], history: []}
    },
    getters:{
        history: state =>{
            return state.history;
        },
        favorites: state =>{
            return state.favorites;
        },
        word: state =>{
            return state.word;
        },
        activeNavBtn: state =>{
            return state.activeNavBtn;
        },
        firebaseDataObj: state =>{
            return state.firebaseDataObj;
        }
    },
    mutations:{
        updateData: (state, payload) =>{
            const {location, word} = payload;
            state[location].push(word);
            
               state[location] = [...new Set(state[location])];
            setTimeout(()=>{ //removes copied elements from the array
            state.firebaseDataObj= {favorites: state.favorites, history: state.history};
            },400);
        },
        searchThisWord: (state, payload)=>{
            return state.word = payload;
        },
        updateActiveBtn: (state,payload) =>{
            return state.activeNavBtn = payload;
        },
        deleteItem: (state,payload) =>{
            const {location, index , word} = payload;
            if(confirm(`Delete ${word} from ${location}?`)){
                state[location].splice(index, 1);
            }
        },
        handleSideDrawer: (state, boolean)=>{
            state.openBackdrop = boolean;
            state.openSideDrawer = boolean;
            // if(state === true){
              // document.body.style.overflow-x = "hidden";
            // }
        },
        updateDataFromFirebase: (state,payload) =>{
                state.history = payload.history ? payload.history : state.history;
                state.favorites = payload.favorites ? payload.favorites : state.favorites;
        }
    },
    actions:{
        updateData: ({commit},payload) =>{
            commit("updateData", payload);
        },
        searchThisWord: ({commit}, payload)=>{
            commit("searchThisWord", payload);
        },
        updateActiveBtn: ({commit}, payload) =>{
            commit("updateActiveBtn", payload);
        },
        deleteItem: ({commit}, payload) =>{
            commit("deleteItem", payload);
        },
        handleSideDrawer: ({commit}, payload)=>{
            commit("handleSideDrawer", payload);
        },
        updateDataFromFirebase: ({commit}, payload)=>{
            commit("updateDataFromFirebase", payload);
        }
    }
})