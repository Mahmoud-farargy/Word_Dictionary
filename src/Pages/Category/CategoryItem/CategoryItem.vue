<template>
    <div  class="item">
       <span @click="newSearch(item)">{{item}}</span>
       <span @click.stop="deleteItem()"><v-icon color="red">mdi-delete</v-icon></span>
    </div>
</template>
<script>
   export default {
       props:{
           item: String,
           location: String
       },
       methods:{
           newSearch(word){
                this.$router.push(`/word/${word}`);
           },
           deleteItem(){
               this.$store.dispatch("deleteItem",{location: this.location, word: this.item});
           }
       }
   }
</script>