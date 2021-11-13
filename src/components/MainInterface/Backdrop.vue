<template>
    <section v-if="this.$store.state.openBackdrop" @click="handleSideDrawer(false)" class="backdrop">
    </section>
</template>
<script>
    export default {
        methods:{
            handleSideDrawer(boolean){
                this.$store.dispatch("handleSideDrawer",boolean);
            }
        }
    }
</script>
<style scoped>
    .backdrop{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        min-height:100vh;
        height:auto;
        background-color: rgba(0,0,0,0.6);
        backdrop-filter: saturate(140%) blur(5px);
        z-index: 700;
        animation: backdrop-fade 0.1s linear forwards;
    }
    @keyframes backdrop-fade{
        from{
            opacity:0;
        }
        to{
            opacity:1;
        }
    }
</style>