<template>
    <div class="result-outer-card">
        <div v-if="item.pos" class="pos">
            <strong class="change-capital"> {{item.pos}}</strong>
        </div>
        <p>{{item.def}}</p>
        <div v-if="item.eg">
            <h5>Example</h5>
            <p class="example">{{item.eg}}</p>
        </div>
        <ul v-if="item.syn ? item.syn.length >0 : null" class="results-list">
            <h5>Synonyms</h5>
            <li v-for="(item, index) in item.syn" :key="`words-${index}${id}`">
                <span @click="newSearch(item)" class="reuse-thesaurus"> {{item}}</span>
            </li>
        </ul>
        <ul v-if="item.ant ? item.ant.length >0 : null" class="results-list">
            <h5>Antonyms</h5>
            <li v-for="(item, index) in item.ant" :key="`words-${index}${id}`">
                <span @click="newSearch(item)" class="reuse-thesaurus"> {{item}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        item: [Object],
        id: [Number],
        isWOD: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        newSearch(word) {
            this.$store.dispatch("searchThisWord", {word, isWOD: this.isWOD});
        }
    },
}
</script>
<style scoped>
    .results-list{
        margin:15px;
    }
    .results-list h5{
        font-size: 1.2rem;
        font-weight:600;
        letter-spacing: 1.4px;
    }
    .night-theme .results-list h5{
        color: #9FD7D5!important;
    }
    .example{
        text-decoration:wavy;
    }
    .reuse-thesaurus{
        padding-bottom:2px;
        border-bottom: 2px solid rgb(135, 135, 245);
        cursor:pointer;
    }
    .reuse-thesaurus:active{
        background-color:cadetblue;
        color:#fff;
    }
    .result-outer-card{
        margin:14px 3px 10px 3px;
    }
</style>