<template>
    <section class="about-section comp-section ">
   
    <img class="homeLogo" src="../../assets/png1.png">
    <h1>Welcome to iDictionary </h1>
    <p>A powerful dictionary app with over 10 languages which will change your perspective of word searching and help you throughout your language learning. </p>
    <h5 class="text-center">Features</h5>
    <article>
    • Save words as favorites especially if you are making a vocabulary list. <br/>
    • Don't worry about losing the words you searched for anymore because the History list has you covered.<br/>
    • Hear the correct pronunciation when you look for an English word.<br/>
    • Get examples, definitions, thesaurus, and a whole lot more for each word. <br/> 
    </article>      
    <p class="text-center copyright mt-3" >&copy; 2020 Created by Mahmoud Farargy</p>
    
  </section>
</template>
<script>
    export default {
        created(){
            this.$store.dispatch("updateActiveBtn", 0);
        }
    }
</script>
<style scoped>
    .homeLogo{
        width:200px;
        opacity:0.9;
        filter: drop-shadow(0 1px 14px rgba(0,0,0,0.3));
    }
    .copyright{
        color:var(--primary-clr);
        font-weight:bold;
    }
    @media only screen and (max-width:670px){
        .homeLogo{
            width:90px;
        }
    }
</style>