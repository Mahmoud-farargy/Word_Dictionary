<template>
    <div>
    <div class="main-result-area">
        <div class="star-icon">
            <v-icon  @click="addToFavories(phonetics.word)" >mdi-star-outline</v-icon>
        </div>
        <h2 class="show-word">{{currentWord}}</h2>
       <i class="ml-2 phonetics-text">{{phonetics.txt ? phonetics.txt : ""}}</i>
        
        <v-icon v-if="phonetics.audio" class="ml-2" @click="playSound(phonetics.audio ? phonetics.audio : null)">mdi-volume-high</v-icon>
        <div v-if="phonetics.origin">
            <h5>Origin</h5>
            <p>{{phonetics.origin}}</p>
        </div>
            <ul class="results-list">
                <li v-for="(item,index) in definitions" :key="`${index + phonetics.id}`">
                    <Result :item="item" :id="phonetics.id" />
                </li>
            </ul>
    </div>
    </div>
</template>
<script>
import Result from "./Result/Result.vue";
export default {
    data: function(){
        return {
            definitions: [],
            phonetics:[]
        }
    },
    props:{
        results: [Array],
        newSearch: [Function],
        lang: [String],
        loading: [Boolean],
        currentWord: [String]
    },
    components:{
        Result
    },
    methods:{
        playSound(audio){
                var sound = new Audio(audio);
                sound.play();            
        },
        addToFavories(word){
            this.$store.dispatch("updateData", {location: "favorites" , word: word});
            setTimeout(()=>{
                this.$http.put("https://mahmoudvue.firebaseio.com/dictionary.json", this.$store.state.firebaseDataObj)
                .then(res =>{
                    console.log(res);
                })
            },300);
           
        }
    },
    created(){
            this.definitions =[];
            this.phonetics = "";
            // for(let i = 0; i <this.results.length; i++){
            //     for(let j = 0; j <this.results[i].phonetics.length; j ++){
                    
            //     }
            // }
            
            for(let i = 0; i <this.results.length; i++){
                for(let j = 0; j <this.results[i].meanings.length; j ++){
                    for(let k = 0; k< this.results[i].meanings[j].definitions.length; k++){
                         
                        // let partOfSpeech = this.results[i].meanings[j].partOfSpeech
                        this.definitions.unshift({
                            pos:this.results[i].meanings[j].partOfSpeech,
                            def: this.results[i].meanings[j].definitions[k].definition,
                            eg: this.results[i].meanings[j].definitions[k].example,
                            syn: this.results[i].meanings[j].definitions[k].synonyms,
                            ant: this.results[i].meanings[j].definitions[k].antonyms,
                        }); //synonyms have to be conditional
                        // this.synonyms.push()
                        // for(let g = 0; g <this.results[i].meanings[j].definitions[k].synonyms.length; g++){
                        //     console.log(this.results[i].meanings[j].definitions[k].synonyms[g]);
                        // }
                        // for(let h = 0; h < this.results[i].meanings[j].definitions[k].definition)
                    }
                }
            }
            this.phonetics = {
                                word: this.results[0].word,
                                audio: this.results[0].phonetics[0].audio ? this.results[0].phonetics[0].audio :"",
                                txt: this.results[0].phonetics[0].text ? this.results[0].phonetics[0].text : "",
                                id: (Math.random() * 1000)+1,
                                origin: this.results[0].origin ?this.results[0].origin :null
            }
            
            this.playSound(this.phonetics.audio ? this.phonetics.audio : null);
            
        }
    
}
</script>
<style scoped>
    .show-word{
        text-transform:capitalize;
        color:rgb(178,34,34);
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
        right:8%;
    }
    @media only screen and (max-width:600px){
        .main-result-area{
            margin:8px auto 18px auto; 
        }
    }
</style>