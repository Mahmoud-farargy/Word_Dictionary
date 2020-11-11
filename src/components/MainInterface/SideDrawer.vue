<template>
    <nav v-if="this.$store.state.openSideDrawer" class="sideDrawer-nav">
        <div class="nav-item dropdown mt-2 mb-5">
            <button data-toggle="dropdown" class="dropdown-toggle btn" type="button" ><i class="fas fa-save mr-1" ></i> Save & Load</button>
            <div class="dropdown-menu">
                <a class="dropdown-item" @click="save" >Save</a>
                <a class="dropdown-item" @click="load">Load</a>
            </div>
        </div>
        <ul>
            <li v-if="$router.history.current.path !=='/dictionary'"><v-icon>mdi-home</v-icon> <router-link exact to="/dictionary"> Home</router-link></li>
            <li v-if="$router.history.current.path !=='/dictionary/favorites'"><v-icon>mdi-heart</v-icon> <router-link to="/dictionary/favorites"> favorites</router-link></li>
            <li v-if="$router.history.current.path !=='/dictionary/history'"><v-icon>mdi-history</v-icon> <router-link to="/dictionary/history"> history</router-link></li>
            <li v-if="$router.history.current.path !=='/dictionary/wod'"><v-icon>mdi-calendar-today</v-icon> <router-link to="/dictionary/wod"> word of the day</router-link></li>
        </ul>
        <input type="checkbox" v-on:change="dayNight" id="checkbox" class="checkbox" />
        <label for="checkbox" class="checkbox-label">
            <div class="checkbox-ball"></div>
        </label>
        
    </nav>
</template>
<script>
export default {
    methods:{
        save(){
            console.log(this.$store.state.firebaseDataObj);
            this.$http.put("https://mahmoudvue.firebaseio.com/dictionary.json", this.$store.state.firebaseDataObj)
                .then(res =>{
                    console.log(res);
                }).catch(err =>{
                    alert("Something went wrong while saving data. Please make sure you are connected to the internet and try again." + err);
                });
        },
        load(){
            this.$http.get("https://mahmoudvue.firebaseio.com/dictionary.json")
            .then(res =>{
              this.$store.dispatch("updateDataFromFirebase", res.body);
            }).catch(err =>{
              console.log(err);
            })
        },
        dayNight(){
            document.body.classList.toggle("night-theme");
            console.log("works");
        }
    }
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
    }
    .sideDrawer-nav ul{
        display:block
    }
    .sideDrawer-nav ul li{
        text-transform: capitalize;
        font-size:19px;
        font-weight:600;
        cursor:pointer;
        margin-bottom:8px;
    }
    .sideDrawer-nav ul li a{
        color:var(--primary-clr);
    }
    .sideDrawer-nav ul li a:hover{
        color:var(--third-clr);
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