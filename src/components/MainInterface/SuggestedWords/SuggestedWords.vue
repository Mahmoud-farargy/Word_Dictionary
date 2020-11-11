<template>
    <div>
        <div class="index-bar">
            <h5 class="index-suggestions">Index</h5>
        </div>
        <ul class="word-list">
            <li @click="newSearch(item)" v-for="(item, index) in sortedWords" :key="`words-${index}`">
                <p>{{item}}</p>
            </li>
        </ul>
    </div>
</template>
<script>

// import spanishWords from "../../../assets/spanishWordList";
export default {
    data: function(){
        return{
            sortedWords: []
        }
    },
    props:{
        newSearch: [Function],
        language: [String]
    },
    methods:{
        generateWordCollection(){ //sort words aphabetically
           this.sortedWords = this.$store.state.suggestions.sort().map(item=>{
                return item
            })
        }
    },
    created(){
        this.generateWordCollection();        
    }   
}
</script>
<style scoped>
    .word-list{
        /* margin-left:10px; */
        padding:5px 9px;
        list-style: none;
        height:300px;
        overflow-y: auto;
        background-color:#eeeeee;
        color:var(--main-black);
        border-radius:3px;
    }
    .word-list li {
        margin:1.3px 0 1.3px 15px;
    }
    .word-list li p{
        margin:0;
        cursor:pointer;
        transition: var(--transition);
    }
    .word-list li:nth-child(odd){
        background-color:rgb(236, 236, 236);
    }
    .word-list li:nth-child(odd){
        background-color:rgb(223, 233, 251);
    }
    .word-list li p:active{
        background-color:rgb(77, 77, 221);
        color:#000;
    }
    .word-list li p:hover{
        color:var(--secondary-clr);
    }
    
    .index-suggestions{
        margin-top:5px;
    }
    .index-bar{
        display: flex;
        align-items:center;
        background: linear-gradient(180deg,rgb(238, 238, 238), rgb(185, 185, 185));
        padding:2px 0;
        border-radius:2px;
        text-transform: uppercase;
    }
    .index-bar h5{
         font-size:17px;
         margin-left:7px;
    }
</style>