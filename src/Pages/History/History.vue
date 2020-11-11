<template>
    <div class="history-container">
        <v-container>
             <!-- <v-icon @click="handleSideDrawer(true)" class="options-btn">mdi-dots-vertical</!-->
        </v-container>
        <ul  class="history-unordered-list">
            <li v-for="(item, index) in history" :key="`${index}`">
                <HistoryItem :item ="item" :index="index" />
            </li>
        </ul>
        <div v-if="this.$store.state.history.length <1" class="empty-history">
            <h4>No history items to show. add items to history and get back again.</h4>
        </div>
    </div>
</template>

<script>
import HistoryItem from "./HistoryItem/HistoryItem.vue";
    export default {
        computed:{
            history(){
               return this.$store.state.history;
            }
        },
        components:{
            HistoryItem
        },
        watch:{
            history(){
                if(this.history <=0){
                    this.$router.push("/");
                }
            }
        }
    }
</script>
<style>
    .history-unordered-list{
        display:block;
    }
    .history-container{
        padding:20px 15px 60px 15px;
        width:100%;
        height:100%;
        z-index:600;
        background-color:rgb(241, 241, 241);
        
    }
    .empty-history{
        font-size: 20px;
        margin-top:50px;
        text-align:center;
    }
</style>