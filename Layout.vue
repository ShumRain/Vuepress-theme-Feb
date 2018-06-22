<template>
    <div class="theme-container">
        <Navbar></Navbar>
        <ArticleList v-if="isRoot" :pages="getPages"></ArticleList>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'
import ArticleList from './ArticleList'

export default {
    components: { Navbar, Footer, ArticleList, },
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
