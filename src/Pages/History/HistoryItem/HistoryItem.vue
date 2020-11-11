<template>
    <div @click="newSearch(item)" class="item">
       <span>{{item}}</span>
       <v-icon color="red" @click.stop="deleteItem(index)">mdi-delete</v-icon>
    </div>
</template>
<script>
   export default {
       props:{
           item:[String],
           index: [Number]
       },
       methods:{
           newSearch(word){
               this.$store.dispatch("searchThisWord",word );
           },
           deleteItem(index){
               this.$store.dispatch("deleteItem",{location: "history",index: index, word: this.item});
               setTimeout(()=>{
                this.$http.put("https://mahmoudvue.firebaseio.com/dictionary.json", this.$store.getters.firebaseDataObj)
                .then(res =>{
                    console.log(res);
                })
            },300);
           }
       }
   }
</script>
<style>
    
</style>