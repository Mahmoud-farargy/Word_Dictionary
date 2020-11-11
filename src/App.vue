<template>
  <main>
    <v-app id="main-app-bcg" >
      <Header></Header>
    <transition name="fade" mode="in-out">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
      <BottomNav class="fixed-bottom" />
    </v-app>
  </main>
</template>

<script>
import Header from "./components/Header/Header";
import BottomNav from "./components/BottomNav";
export default {
  data: function(){
    return {
      greeting: "hello!"
    }
  },
  components:{
    Header,
    BottomNav
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

