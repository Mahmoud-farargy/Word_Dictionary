<template>
    <section class="wod-container">
        <v-container>
             <!-- <v-icon @click="handleSideDrawer(true)" class="options-btn">mdi-dots-vertical</v-icon> -->
        </v-container>
        <div v-if="!loading && results.length >0">
            <Results :results="results" :currentWord="currentWord" lang="en" :loading="loading" />
        </div>
        <div v-else-if="loading" class="main-result-area">
        <v-skeleton-loader
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
    </div>
    </section>
</template>
<script>
// import Results from "../../components/MainInterface/Results/Results";
import Results from "./Results/Results.vue";
    export default {
        data: function(){
            return{
                results: [],
                loading: false,
                loader: "",
                currentWord: "",
                type: "article",
                tile: true,
                boilerplate: false
            }
        },
        components:{
            Results
        },
        methods:{
             getDefinition(word){ //Main function of the App
                    this.loading = true;
                    this.loader = "loading";
                if(word){
                    let refineWord = word.trim();
                    word.match(/\s/) ? refineWord = word.toString().replace(/\s/g, "%20") : refineWord = word;
                    word.match(/[-]/) ? refineWord = word.toString().replace(/[-]/g, "%2D") : refineWord = word;
                    word.match(/[']/) ? refineWord = word.toString().replace(/[']/g, "%27") : refineWord = word;
                        
                    
                    this.$http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${refineWord.toLowerCase()}`)
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
        created(){
            //Get a word of the day by using the day number as an index (temporarily)
            let suggestions = this.$store.state.suggestions;
            this.getDefinition(suggestions[new Date().getDate()]);
        }
    }
</script>

<style scoped>
    .wod-container{
        padding:20px 7px 55px 7px;
        width:90%;
        margin:0 auto;
    }
    @media only screen and (max-width:670px){
        .wod-container{
           width:95%; 
        }
        
    }

</style>