<template>
    <section class="p-2">
    <div class="upper-bar">
            <v-container>
             <v-icon @click="handleSideDrawer(true)" class="options-btn">mdi-dots-vertical</v-icon>
            </v-container>
      </div>
      <Backdrop />
      <SideDrawer/>      
        <div class="row app-layout w-100">
            <div class="col-lg-4 search-side">
                <div v-on:submit.prevent="onSubmit" class="submission-form">
                    <input autofocus type="text" placeholder="Lookup word.." v-model="insertedText" class="text-input"/>
                    <div class="search-options"> 
                      <button v-if="insertedText !== ''" @click.stop="insertedText=''" class="empty-input" >
                          <v-icon>mdi-close</v-icon>
                      </button>
                       <v-btn @click="onSubmit" type="submit" small
                                class="ma-2 search-btn"
                                :loading="loading"
                                :disabled="loading || insertedText === ''"
                                style="background:#3fb0ac; color:#fff;"
                                light
                                >
                                <i class="fas fa-search fa-lg"/>
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <i class="fas fa-spinner fa-lg text-white"/>
                                    </span>
                                </template>
                        </v-btn>
                        
                    </div>
                    <v-select
                        v-model="lang"
                        :items="languageList"
                        menu-props="auto"
                        label="Select Language"
                        hide-details
                        prepend-icon="language"
                        single-line
                        color="#3fb0ac"
                        class="select-style"
                        ></v-select>
                </div>
                <SuggestedWords v-if="this.lang === 'English US'"  class="hide-mobile" :newSearch="getDefinition" />
            </div>
            <div class="col-lg-7">
                <Results :results="results" :newSearch="getDefinition" :currentWord="currentWord" :lang="lang" :loading="loading" />
                <SuggestedWords v-if="this.lang === 'English US'" class="hide-desktop" :language="this.lang" :newSearch="getDefinition" />
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
                results:[],
                currentWord: "",
            }
        },
        methods:{
            onSubmit(){
                this.getDefinition(this.insertedText);
                // this.insertedText = "";
            },
            handleSideDrawer(boolean){
              this.$store.dispatch("handleSideDrawer",boolean);
              // if(state === true){
                // document.body.style.overflow-x = "hidden";
              // }
            },
            getDefinition(word){ //Main function of the App
                let currentLang; 
                this.loading = true;
                this.loader = "loading";
            if(word){
              this.$store.dispatch("updateData", {location: "history" , word: word});
                switch(this.lang){
                  case "English US":
                    currentLang = "en";
                  break;
                  case "Spanish":
                    currentLang = "es";
                  break;
                  case "French":
                    currentLang = "fr";
                  break;
                  case "Brazilian Portuguese":
                    currentLang = "pt-BR";
                  break;
                  case "Italian":
                    currentLang = "it";
                  break;
                  case "German":
                    currentLang = "de";
                  break;
                  case "Hindi":
                    currentLang = "hi";
                  break;
                  case "Turkish":
                    currentLang = "tr";
                  break;
                  case "Chinese (Simplified)":
                    currentLang = "zh-CN";
                  break;
                  default:
                    currentLang = "en";
                  break;
                }
                  let refineWord = word.trim();
                  
                  word.match(/\s/) ? refineWord = word.toString().replace(/\s/g, "%20") : refineWord = word;
                  word.match(/[-]/) ? refineWord = word.toString().replace(/[-]/g, "%2D") : refineWord = word;
                  word.match(/[']/) ? refineWord = word.toString().replace(/[']/g, "%27") : refineWord = word;
                    
                  
                  this.$http.get(`https://api.dictionaryapi.dev/api/v2/entries/${currentLang}/${refineWord.toLowerCase()}`)
                        .then(res =>{
                          if(res.body[0] && res.body.status !== 0 || res.body.status !== 404){
                            this.results = res.body;
                            this.currentWord = word;
                            window.scrollTo(0,30);
                            this.loader = null;
                            this.loading = false;
                          }
                            
                        })
                        .catch(err=>{
                          if(navigator.onLine && err.status !== 0 ){
                                alert("Word is not found. Please make sure to type it correctly or choose the right language.");
                                this.loader = null;
                                  this.loading = false;
                            
                            }else{
                              alert("You are offline. Please reconnect and try again!");
                            }
                          })
                          
              }else{
                alert("The search field should not be empty");
              }
                
            }            
        },
        components:{
            SuggestedWords,
            Results,
            Backdrop,
            SideDrawer
        },
        computed:{
            newSearchWord(){
              return this.$store.state.word;
            }
        },
         watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]
                setTimeout(() => (this[l] = false), 3000)
                this.loader = null;
            },
            newSearchWord(){
              this.getDefinition(this.$store.state.word);
              this.$router.push("/dictionary");
              this.handleSideDrawer(false);
            }
              
        },
        created(){
          this.$store.dispatch("updateActiveBtn", 1);
          if(this.lang === "English US"){
            let randomNum = Math.floor((Math.random() * this.$store.state.suggestions.length) +1);
            this.getDefinition(this.$store.state.suggestions[randomNum]);
          }
          //fetches data from firebase
          this.$http.get("https://mahmoudvue.firebaseio.com/dictionary.json")
            .then(res =>{
              this.$store.dispatch("updateDataFromFirebase",res.body);
            }).catch(err =>{
              console.log(err);
            })

        }
    }
</script>
<style scoped>
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
        padding-top:10px;
        position:relative;
    }
    .search-mic, .empty-input{
      
      background-color:transparent ;
      padding:5px 5px ;
      border:none;
      /* box-shadow:none; */
    }
    .search-options{
      display:flex;
       position:absolute;
        top:8%;
        right:0px;
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
   .options-btn{
      background-color: rgba(0,0,0,0.2);
      color:#fff !important;
      /* padding:5px; */
      width:33px;
      height:33px;
      border-radius:50%;
      /* float:right; */
      margin-right:15px;
      cursor:pointer;
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
  @media only screen and (max-width:650px){
    .search-side{
      margin:8px;
      border:none;
    }
  }
</style>