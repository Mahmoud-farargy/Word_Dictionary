<template>
    <nav v-if="this.$store.state.openSideDrawer" class="sideDrawer-nav">
        <ul>
            <SideDrawerListItem v-for="item in sideNavList" :key="item.id" :item="item" />
        </ul>
        <input type="checkbox" v-on:change="dayNight" id="checkbox" class="checkbox" />
        <label for="checkbox" class="checkbox-label">
            <div class="checkbox-ball"></div>
        </label>
    </nav>
</template>
<script>
import SideDrawerListItem from "./SideDrawerListItem/SideDrawerListItem";
export default {
    components:{
        SideDrawerListItem
    },
    data(){
        return {
            sideNavList: [
                {title: 'Home', icon: 'mdi-home', path:'/', id:"fuihwefuwef"},
                {title: 'Favorites', icon: 'mdi-heart', path:'/category/favorites', id:"weug8w8ggijf"},
                {title: 'History', icon: 'mdi-history', path:'/category/history', id:"oiwjegnwoege"},
                {title: 'Word of The Day', icon: 'mdi-calendar-today', path:`/word/${this.$store.state.suggestions[new Date().getDate() || 0]}`,id:"hiofwoiffwue"},
            ]
        }
    },
    methods:{
        dayNight(){
            const bodyClassses = document.body.classList;
            if(bodyClassses.contains("night-theme")){
               bodyClassses.remove("night-theme");  
               bodyClassses.add("day-theme");   
            }else{
                bodyClassses.add("night-theme");  
                bodyClassses.remove("day-theme");
            }
        }
    },
}
</script>
<style scoped>
    .sideDrawer-nav{
        position: fixed;
        top:0;
        right:0;
        width: 30%;
        height:100vh;
        background-color:#fff;
        padding:20px;
        z-index: 999;
        animation: slide 0.4s ease-in forwards;
        box-shadow: var(--dark-shadow);
    }
    .sideDrawer-nav ul{
        display:block;
        width:100%;
        padding:0;
        margin-top:1rem;
    }
    @media only screen and (max-width:670px){
        .sideDrawer-nav{
            width:70%;
        }
    }
    @keyframes slide {
        from{
            transform: translateX(500px);
        }
        to{
            transform: translateX(0);
        }
    }
</style>