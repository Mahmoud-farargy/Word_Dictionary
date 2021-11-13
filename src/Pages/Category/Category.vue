<template>
    <div class="favorites-container">
        <v-container> 
            <v-icon class="back-btn" @click="goBack()">mdi-keyboard-backspace</v-icon> 
            <ul  class="favorites-unordered-list">
                <li class="word-item" v-for="(item, index) in wordList" :key="`${index}`">
                    <CategoryItem :item ="item" :location="listType" />
                </li>
            </ul>
            <div v-if="wordList.length <1" class="empty-favorites">
                <h4>No items to show. Please add some items and get back again.</h4>
            </div>
    </v-container>
    </div>
</template>

<script>
import CategoryItem from "./CategoryItem/CategoryItem.vue";
    export default {
        data(){
            return {
                listType: "favorites"
            }
        },
        components:{
            CategoryItem
        },
        computed: {
            wordList() {
                return this.$store.state[this.listType] || [];
            }
        },
        watch: {
            "$route.params.list":{
                handler(x){
                    if(Object.prototype.hasOwnProperty.call(this.$store.state, x)){
                        this.listType = x;
                    }else{
                        console.log("error");
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style>
    .favorites-unordered-list{
        display:block;
    }
    .favorites-container{
        padding:20px 2px 60px 2px;
        width:100%;
        height:100%;
        z-index:600;
        background-color:rgb(241, 241, 241);
        
    }
    .empty-favorites{
        font-size: 20px;
        margin-top:50px;
        text-align:center;
    }
</style>