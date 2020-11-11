<template>
    <div class="favorites-container">
        <v-container>
             <!-- <v-icon @click="handleSideDrawer(true)" class="options-btn">mdi-dots-vertical</v-icon> -->
            </v-container>
        <ul  class="favorites-unordered-list">
            <li v-for="(item, index) in favorites" :key="`${index}`">
                <FavoritesItem :item ="item" :index="index" />
            </li>
        </ul>
        <div v-if="this.$store.getters.favorites.length <1" class="empty-favorites">
            <h4>No favorite items to show. add items to Favorites and get back again.</h4>
        </div>
    </div>
</template>

<script>
import FavoritesItem from "./FavoriteItem/FavoriteItem.vue";
    export default {
        computed:{
            favorites(){
               return this.$store.state.favorites;
            }
        },
        components:{
            FavoritesItem
        },
        watch:{
            favorites(){
                if(this.favorites <=0){
                    this.$router.push("/");
                }
            }
        }
    }
</script>
<style>
    .favorites-unordered-list{
        display:block;
    }
    .favorites-container{
        padding:20px 15px 60px 15px;
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