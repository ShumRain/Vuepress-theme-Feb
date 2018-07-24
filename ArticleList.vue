<template>
    <main>
        <section class="article-list wrap">
            <Card v-for="(item, index) in pages" :info="item" v-if="!!item.title" :key="index"></Card>
        </section>
    </main>
</template>

<script>
import Card from './Card'
import { bgiLazy } from './util.js'


export default {
    props: ['pages'],
    components: { Card, },
    mounted() {
        bgiLazy()
    }
}
</script>


<style lang="scss" scoped>
    .article-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 1.67rem;
        position: relative;
    }

    @media only screen and (max-width: 750px) {
        .article-list {
            flex-direction: column;
        }
    }

    @media only screen and (max-width: 481px) {
        .article-list {
            padding: 0;
        }
    }
</style>
