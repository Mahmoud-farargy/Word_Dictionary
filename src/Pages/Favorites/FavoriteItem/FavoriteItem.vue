<template>
    <div @click="newSearch(item)" class="item">
       <span>{{item}}</span>
       <span @click.stop="deleteItem(index)"><v-icon color="red">mdi-delete</v-icon></span>
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
               this.$store.dispatch("deleteItem",{location: "favorites",index: index, word: this.item});
               setTimeout(()=>{
                   this.$http.put("https://mahmoudvue.firebaseio.com/dictionary.json", this.$store.state.firebaseDataObj)
               },500)
               
           }
       }
   }
</script>
<style>
    
</style>