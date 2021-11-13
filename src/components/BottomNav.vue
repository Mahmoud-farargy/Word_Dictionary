<template>
  <div>
    <v-bottom-navigation
      :value="0"
      scroll-target="#scroll-area-1"
      class="bottom-nav"
      color="#3fb0ac"
      grow
      shift
    >

    <router-link  exact to="/" tag="v-btn" active-class="active">       
        <span @click="$store.dispatch('handleSideDrawer',false);">Dictionary</span>
        <v-icon>mdi-translate</v-icon>
    </router-link>

  
    <router-link exact to="/about" tag="v-btn"  active-class="active">
        <span>About</span>
        <v-icon>mdi-information</v-icon>
    </router-link>

      
        
    </v-bottom-navigation>

    <v-sheet
      id="scroll-area-1"
      class="overflow-y-auto"
      max-height="600"
    >
    </v-sheet>
    </div>
</template>