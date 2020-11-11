<template>
    <div class="result-outer-card">
        <div class="pos">
            <strong class="change-capital"> {{item.pos}}</strong>
        </div>
        <p class="change-capital">{{item.def}}</p>
        <div v-if="item.eg">
            <h5>Example</h5>
            <p class="example">{{item.eg}}</p>
        </div>
        <ul v-if="item.syn ? item.syn.length >0 : null" class="results-list">
            <h5>Synonyms</h5>
            <li   v-for="(item, index) in item.syn" :key="`words-${index}${id}`">
                <span > {{item}}</span>
            </li>
        </ul>
        <ul v-if="item.ant ? item.ant.length >0 : null" class="results-list">
            <h5>Antonyms</h5>
            <li   v-for="(item, index) in item.ant" :key="`words-${index}${id}`">
                <span > {{item}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        item: [Object],
        id: [Number],
    }
}
</script>
<style scoped>
    .results-list{
        margin:15px;
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
        margin:14px 3px 3px 3px;
    }
</style>