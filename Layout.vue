<template>
    <div class="theme-container">
        <Navbar @backHome="backHomeFn"></Navbar>
        <ArticleList v-if="isRoot" :pages="getPages"></ArticleList>
        <ArticleContent v-else></ArticleContent>
        <Pagination v-if="isRoot" @pageTurning="pageTurningFn"></Pagination>
        <Footer></Footer>
    </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Navbar from './Navbar'
import Footer from './Footer'
import ArticleList from './ArticleList'
import ArticleContent from './ArticleContent'
import Pagination from './Pagination'

export default {
    components: { Navbar, Footer, ArticleList, ArticleContent, Pagination },
    data() {
        return {
            isSidebarOpen: false,
            currentPage: 1
        }
    },
    methods: {
        pageTurningFn(pages) {
            this.currentPage = pages
        },
        backHomeFn() {
            this.currentPage = 1
        }
    },
    computed: {
        isRoot() {
            return this.$route.path === '/'
        },
        getPages() {
            const { perPage } = this.$site.themeConfig
            const { pages } = this.$site
            const start = perPage * (this.currentPage - 1)
            const end = this.currentPage * perPage
            
            return pages.filter(i => i.path !== '/').slice(start, end)
        }
    },
    mounted() {
        // configure progress bar
        nprogress.configure({ showSpinner: false })

        this.$router.beforeEach((to, from, next) => {
            if (to.path !== from.path && !Vue.component(to.name)) {
                nprogress.start()
            }
            next()
        })

        this.$router.afterEach(() => {
            nprogress.done()
            this.isSidebarOpen = false
        })
    }
}
</script>

<style lang="scss">
    @import './styles/common';

    .pagination {
        display: flex;
        a {
            font-size: 24px;
            color: #b97373;
        }
    }
</style>
