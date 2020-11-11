<template>
    <section class="about-section comp-section">
        <h2>Hi, I'm Mahmoud!</h2>
        <p>I am a front end developer specialized in Vue.js, React.js, Javascript and other technologies. You can visit my portfolio to find more cool projects like this one <a target="_blank" href="https://mahmoudportfolio.netlify.app">Portfolio.</a></p>
  </section>
</template>
<script>
    export default {
        created(){
            this.$store.dispatch("updateActiveBtn", 2);
        }
    }
</script>