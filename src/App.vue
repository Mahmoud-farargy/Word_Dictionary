<template>
  <main>
    <v-app id="main-app-bcg" >
    <!-- Header -->

    <!-- Routes -->
    <transition name="fade" mode="in-out">
        <router-view :key="$route.fullPath"></router-view>
    </transition>
    <!-- Bottom Navigation -->
      <BottomNav class="fixed-bottom" />
    </v-app>
  </main>
</template>

<script>
import BottomNav from "./components/BottomNav";
export default {
  components:{
    BottomNav
  },
  mounted(){
     //fetches data from firebase
          this.$http.get("https://mahmoudvue.firebaseio.com/dictionary.json")
            .then(res =>{
              res?.body && this.$store.dispatch("updateDataFromFirebase",res.body);
            }).catch(err =>{
              alert(err.message);
            });
  }
}
</script>

<style scoped>
  p{
    color:red;
  }
  .fixed-bottom{
    z-index:1000;
  }
</style>

