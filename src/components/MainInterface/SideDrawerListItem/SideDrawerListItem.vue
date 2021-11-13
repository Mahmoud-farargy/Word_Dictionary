<template>
    <li v-if="this.$router.history.current.path !== item.path" @click="directMeTo(item.path)" class="flex-row"><v-icon>{{item.icon}}</v-icon><span>{{item.title}}</span></li>
</template>

<script>
    export default {
        props: {
            item: Object
        },
        methods: {
            directMeTo(path) {
                if(this.$router.history.current.path !== path){
                    this.$store.dispatch("handleSideDrawer",false);
                    this.$router.push(path);
                }
            }
        }
    }
</script>

<style scoped>
    .sideDrawer-nav ul li{
        text-transform: capitalize;
        font-size:19px;
        font-weight:600;
        cursor:pointer;
        padding:0;
        align-items:center;
        padding: 0.4rem 0.4rem;
        border-radius: 7px;
        margin:0;
    }
    .sideDrawer-nav ul li a{
        color:var(--primary-clr);
        display: block;
        width:100%;
    }
    .sideDrawer-nav ul li a:hover{
        color:var(--third-clr);
    }
    .sideDrawer-nav ul li{
        transition: background 0.3s linear;
    }
    .sideDrawer-nav ul li:hover{
        background: var(--primary-clr);
    }
    .sideDrawer-nav ul li i{
        margin-right: 0.3rem;
    }
</style>