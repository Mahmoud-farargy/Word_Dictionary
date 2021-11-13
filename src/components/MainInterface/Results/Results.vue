<template>
    <div>
    <div v-if="!loading && definitions && definitions.length >0 " class="main-result-area">
    <div class="star-icon">
        <v-icon class="fa-icon" @click="addToFavories(phonetics.word)" >{{favs.length > 0 && favs.some(el =>el.toLowerCase() === currentWord.toLowerCase()) ? "mdi-star" : "mdi-star-outline"}}</v-icon>
    </div>
        <h2 class="show-word">{{currentWord}}</h2>
        <i class="ml-2 phonetics-text">{{phonetics.txt ? phonetics.txt : ""}}</i>
        
        <v-icon v-if="phonetics.audio" class="ml-2 fa-icon" @click="sayWord(phonetics.audio ? phonetics.audio : null)">mdi-volume-high</v-icon>
        <div v-if="phonetics.origin">
            <h5>Origin</h5>
            <p>{{phonetics.origin}}</p>
        </div>
            <ul class="results-list">
                <li v-for="(item,index) in definitions" :key="`${index + phonetics.id}`">
                    <Result :item="item" :id="phonetics.id" :isWOD="isWOD"/>
                </li>
            </ul>
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
    <div v-else class="main-result-area">
        <h4 class="mb-2">Instructions</h4>
        <p>1. Type a word in the search bar. </p>
        <p>2. Choose a language.</p>
    </div>
    </div>
</template>
<script>
import Result from "./Result/Result";
import { playSound }  from "../../../Utilities/utilities.js";
export default {
    data: function(){
        return {
            tile: true,
            type: "article",
            boilerplate: false,
        }
    },
    props:{
        results: Object,
        isWOD: Boolean
    },
    computed:{
        favs() {
           return this.$store.getters.favorites;
        },
         definitions(){
            return this.results.definitions;
        },
         phonetics(){
            return this.results.phonetics;
        },
        lang(){
            return this.$store.getters.getCurrentLang;
        },
        loading() {
            return this.$store.getters.getLoadingWord;
        },
        currentWord () {
            return this.$store.getters.word;
        }
    },
    components:{
        Result
    },
    methods:{
        sayWord(audio){
            playSound(this.lang, audio);
        },
        addToFavories(word){
            this.$store.dispatch("addToList", {location: "favorites" , word: word});
        }
    }
}
</script>
<style scoped>
    .show-word{
        text-transform:capitalize;
        color:rgb(178,34,34);
        letter-spacing: var(--spacing);
    }
    .main-result-area{
        position: relative;
        margin:0 auto 50px auto;
        padding:20px;
        border-radius:8px;
        background-color: var(--main-gray);
        box-shadow: 0 1px 17px rgba(0,0,0,0.1);
    }
    .star-icon{
        color: yellow !important;
        position:absolute;
        top:40px;
        right:3%;
    }
    @media only screen and (max-width:600px){
        .main-result-area{
            margin:8px auto 18px auto; 
        }
    }
</style>