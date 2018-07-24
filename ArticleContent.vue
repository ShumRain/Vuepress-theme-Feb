<template>
    <main>
        <article class="article-content">
            <div class="banner-inner-box">
                <div class="article-banner lazy-bg" :data-lazy="coverImg + imgHandle">
                    <div class="cover"></div>
                </div>
                <div class="wrap">
                    <h1 class="article-title">{{ title }}</h1>
                    <div class="article-info">
                        <p class="artivle-date">{{ articleDate }}</p>
                        <ul v-if="tags.length" v-for="tag of tags">
                            <li>
                                <a href="javascript:;">{{ tag }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="article-wrap">
                <Content :custom="false" class="markdown-body"/>
                <p class="last-updated" v-if="lastUpdated">{{ lastUpdatedText }} {{ lastUpdated }}</p>
            </div>
        </article>
        <PageNav :prev="resolvePrev" :next="resolveNext"></PageNav>
    </main>
</template>


<script>
import { formatDate, bgiLazy, lazyload } from './util.js'
import PageNav from './PageNav'

export default {
    components: {
        PageNav,
    },
    computed: {
        title() {
            console.log(this)
            return this.$page.frontmatter.title || this.$page.title
        },
        coverImg() {
            return this.$page.frontmatter.cover
        },
        tags() {
            if (this.$page.frontmatter.tags == null) return []

            return this.$page.frontmatter.tags.toString().split(',').map(i => i.trim())
        },
        articleDate() {
            return formatDate(this.$page.frontmatter.date)
        },
        lastUpdated() {
            if (this.$page.lastUpdated) {
                return formatDate(this.$page.lastUpdated)
            }
        },
        lastUpdatedText() {
            if (typeof this.$site.themeConfig.lastUpdated === 'string') {
                return this.$site.themeConfig.lastUpdated
            }
            return 'Last Updated'
        },
        imgHandle() {
            return this.$site.themeConfig.imgHandle || ''
        },
        resolveNext() {
            let next
            let length = this.$site.pages.length 
            let index = this.$site.pages.indexOf(this.$page)
            if (index + 1 <= length) {
                next = this.$site.pages[index + 1]
            }
            return next
        },
        resolvePrev() {
            let prev
            let index = this.$site.pages.indexOf(this.$page)
            if (index -1 >= 0) {
                prev = this.$site.pages[index - 1]
            }
            return prev
        }
    },
    mounted() {
        bgiLazy()
        lazyload()
    },
}
</script>

<style lang="scss">
    @import './styles/ArticleContent';
    @import './styles/markdown';
</style>
