<template>
    <div>
        <section class="about-section comp-section ">
        <img class="homeLogo" src="@/assets/png1.png">
        <h1>Welcome to iDictionary </h1>
        <p>A powerful dictionary app with over 10 languages which will change your perspective of word searching and help you throughout your language learning. </p>
        <h5 class="text-center">Features</h5>
        <article class="features-list">
            <ul>
                <li>Save words as favorites especially if you are making a vocabulary list.</li>
                <li>Don't worry about losing the words you searched for anymore because the History list has you covered.</li>
                <li>Hear the correct pronunciation when you look for an English word.</li>
                <li>Get examples, definitions, thesaurus, and a whole lot more for each word.</li>
            </ul>
        </article>
        <h5 class="text-center">About</h5>
         <p>Hi, I'm Mahmoud!, a front end developer specialized in Vue.js, React.js, Javascript and other technologies. You can visit my portfolio to find more cool projects like this one <a target="_blank" href="https://mahmoudportfolio.netlify.app">Portfolio.</a></p>
        <p class="text-center copyright mt-3" >&copy; 2020 Created by Mahmoud Farargy</p>
        
    </section> 
  </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
    .homeLogo{
        width:200px;
        opacity:0.9;
        filter: drop-shadow(0 1px 14px rgba(0,0,0,0.3));
    }
    .features-list ul{
        padding:0;
        margin-bottom:0.6rem;
    }
    h5{
        font-size: 1.6rem;
        font-weight:500;
        margin-bottom: 1rem;
    }
    .night-theme section.about-section h5{
        color: #75c5c1!important;
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