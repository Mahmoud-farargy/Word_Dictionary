<template>
    <section id="wod-container">
        <v-container>
            <div class="top-tools"> 
                <v-icon class="back-btn" @click="goBack()">mdi-keyboard-backspace</v-icon> 
            </div>
            <Results :results="newResults" :isWOD="true" />
        </v-container>
    </section>
</template>
<script>
import Results from "@/components/MainInterface/Results/Results";
    export default {
        props: {
            word: {
                type: String,
                default: ""
            },
            isWOD: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            newResults(){
                return this.$store.getters.getWordResults || {};
            }
        },
        components:{
            Results
        },
        methods: {
            getDefinition(x){
                this.$store.dispatch("searchThisWord", {word: x, isWOD: true});
            },
            goBack(){
                this.$router.go(-1);
            }
        },
        watch: {
            "$route.params.wordName":{
                handler: function(x){
                    this.getDefinition(x);  
                },
                immediate: true,
                deep: true
               
            }
        },
        destroyed(){
            this.$store.dispatch("clearWordResults");
        }
    }
</script>

<style scoped>
    #wod-container{
        padding:20px 7px 55px 7px;
        width:90%;
        margin:0 auto;
    }
    #wod-container .top-tools{
       padding: 0.2rem 0 0.7rem;
       
    }
    @media only screen and (max-width:670px){
        #wod-container{
           width:95%; 
        }
        
    }

</style>