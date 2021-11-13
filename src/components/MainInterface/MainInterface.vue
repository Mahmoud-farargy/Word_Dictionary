<template>
    <section id="mainInterface">
    <div class="upper-bar">
            <span v-if="$store.getters.getCurrentLang === 'English US'" class="options-btn-container">
             <v-icon @click="handleSideDrawer(true)" class="options-btn">mdi-dots-vertical</v-icon>
            </span>
      </div>
      <Backdrop />
      <SideDrawer/>      
        <div class="row app-layout w-100">
            <div class="col-lg-4 search-side">
                <form @submit="onSubmission" class="submission-form">
                    <input autofocus type="text" placeholder="Lookup word.." v-model="insertedText" class="text-input"/>
                    <div class="search-options"> 
                      <span v-if="insertedText !== ''" @click.stop="insertedText=''" class="empty-input" >
                          <v-icon>mdi-close</v-icon>
                      </span>
                       <v-btn type="submit" small
                                class="ma-2 search-btn"
                                :loading="loading"
                                :disabled="loading || insertedText === ''"
                                style="background:#3fb0ac; color:#fff;"
                                light
                                >
                                <v-icon>mdi-magnify</v-icon>
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon class="fas fa-spinner fa-lg text-white">mdi-spinner</v-icon>
                                    </span>
                                </template>
                        </v-btn>
                        
                    </div> 
                    </form>
                    <v-select
                        v-model="currLang"
                        :items="languageList"
                        menu-props="auto"
                        label="Select Language"
                        hide-details
                        prepend-icon="language"
                        single-line
                        color="#3fb0ac"
                        class="select-style"
                        ></v-select>

                <SuggestedWords v-if="currLang === 'English US'"  class="hide-mobile" />
            </div>
            <div class="col-lg-7">
                <Results :results="results"/>
                <SuggestedWords v-if="currLang === 'English US'" class="hide-desktop" :language="currLang" />
            </div>
            
        </div>
    </section>
</template>
<script>
//imports
import SuggestedWords from "./SuggestedWords/SuggestedWords";
import Results from  "./Results/Results";
import Backdrop from "./Backdrop.vue";
import SideDrawer from "./SideDrawer";

//---end imports -----
    export default {
        data: function(){
            return{
                insertedText:"",
                loader: null,
                loading: false,
                lang: "English US",
                languageList: ["English US", "Spanish", "French" , "German", "Italian","Chinese (Simplified)", "Japanese", "Brazilian Portuguese","Turkish", "Hindi"],
                results: {}
            }
        },
        computed: {
          currLang: {
            get(){
               return this.$store.getters.getCurrentLang;
            },
            set(x){
              this.$store.dispatch("changeCurrentLang", x);
            }
          },
          newResults() {
                return this.$store.getters.getResultsArr;
          },
        },
        methods:{
            getDefinition(word){
                this.$store.dispatch("searchThisWord", {word, isWOD: false});
            },
            onSubmission(e){
              e.preventDefault();
                this.getDefinition(this.insertedText);
            },
            handleSideDrawer(boolean){
              this.$store.dispatch("handleSideDrawer",boolean);
            },          
        },
        components:{
            SuggestedWords,
            Results,
            Backdrop,
            SideDrawer
        },
         watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]
                setTimeout(() => (this[l] = false), 3000)
                this.loader = null;
            },
            newResults(results){
                this.results = results || {};
            },
            currLang() {
              this.results = {};
             }
        },
        created(){
          if(this.currLang.toLowerCase() === "english us"){
            let randomNum = Math.floor((Math.random() * this.$store.state.suggestions?.length) +1);
              this.getDefinition(this.$store.state.suggestions[randomNum]);
          }
        }
    }
</script>
<style scoped>
    #mainInterface{
      display: grid;
      place-items:center;
      padding: 1rem 2rem;
    }
    .app-layout{
        margin:30px auto 5px auto;
        gap:15px;
        padding-bottom:40px;
    }
    .search-side{
        margin-bottom: 40px;
        margin-left:10px;
        border-right: 1px solid var(--secondary-clr);
        padding:5px 7px;
        max-height:470px; 
        background-color:var(--main-gray);
        box-shadow: 0 1px 14px rgba(0,0,0,0.1);
    }
    .submission-form{
      margin-top:10px;
        width:100%;
        position:relative;
    }
    .search-mic, .empty-input{
      cursor:pointer;
      background-color:transparent ;
      padding:5px 5px ;
      border:none;
    }
    .search-options{
      display:flex;
      position:absolute;
      top:50%;
      right:-35px;
      transform: translate(-50%,-50%);
    }
    .search-btn{
        border-radius:10px;
    }
    .search-icon{
        font-size:20px;
        padding:0px;
    }
    .empty-input{
      font-size:20px;
      font-weight:600;
    }
    .empty-input:focus, .search-mic:focus{
      outline:none;
    }
    .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  .text-input{
      background-color: rgba(255,255,255,0.9);
      border-radius:50px;
      width:100%;
      padding:8px 12px;
  }
  .text-input:focus{
      outline:none;
  }
  .select-style{
      margin-bottom:20px;
      color:#fff !important;
  }
  .upper-bar{
       position:fixed;
       top:0%;
       right:30px;
       width:35px;
       height:35px;
       z-index:300;
   }
  
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media only screen and (min-width: 1100px){
    .search-side{
        position: sticky;
        top:1rem;
    }
  }
  @media only screen and (max-width:650px){
    .search-side{
      margin:8px;
      border:none;
    }
    #mainInterface{
      padding: 0.5rem 0.1rem;
    }
  }
</style>