<template>
    <div class="theme-container">
        <Navbar></Navbar>
        <ArticleList v-if="isRoot" :pages="getPages"></ArticleList>
        <ArticleContent v-else></ArticleContent>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'
import ArticleList from './ArticleList'
import ArticleContent from './ArticleContent'

export default {
    components: { Navbar, Footer, ArticleList, ArticleContent, },
    computed: {
        isRoot() {
            return this.$route.path === '/'
        },
        getPages() {
            const { pages } = this.$site
            return pages
        }
    }
}
</script>

<style lang="scss">
    @import './styles/common';
</style>
