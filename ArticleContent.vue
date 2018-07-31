<template>
    <main>
        <article class="article-content">
            <div class="banner-inner-box">
                <div class="article-banner lazy-bg" :data-lazy="coverImg + imgHandle" :key="coverImg">
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
        <div id="comments-container"></div>
    </main>
</template>


<script>
import { formatDate, bgiLazy, lazyload, comments } from './util.js'
import Gitment from 'gitment'
import PageNav from './PageNav'

export default {
    data() {
        return {
            comments: {}
        }
    },
    components: {
        PageNav,
    },
    computed: {
        title() {
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
                next.path === '/' && (next = null)
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
        let commentsContainer = document.getElementById('comments-container')
        this.comments = comments(this.$site.themeConfig.gitmentConfig, commentsContainer)

        this.comments.render()
        bgiLazy()
        lazyload()
    },
    updated() {
        this.comments.destory()
        this.comments.render()
        bgiLazy()
    }
}
</script>

<style lang="scss">
    @import './styles/ArticleContent';
    @import './styles/markdown';
    @import './styles/gitment';

    #comments-container {
        width: 60rem;
        margin: 0 auto;
    }

    @media only screen and (max-width: 730px) {
        #comments-container {
            width: 100%;
            padding: 0 1.67rem;
        }
    }
</style>
