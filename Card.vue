<template>
    <article class="article-item">
        <div class="article-inner">
            <div class="article-cover lazy-bg" :data-lazy="info.frontmatter.cover + imgHandle" :key="info.frontmatter.cover"></div>
            <router-link :to="info.path">
                <h3 class="article-title">{{ info.title }}</h3>
                <div class="article-info">
                    <p class="article-time">{{ date }}</p>
                    <ul class="tag">
                        <li v-for="tag in tags"> {{ tag }}</li>
                    </ul>
                </div>
            </router-link>
        </div>
    </article>
</template>


<script>
    import { formatDate } from './util.js'

    export default {
        props: ['info'],
        computed: {
            date() {
                return formatDate(this.info.frontmatter.date)
            },
            tags() {
                let tags = this.info.frontmatter.tags
                return !!tags ? tags.split(' ') : ''
            },
            imgHandle() {
                return this.$site.themeConfig.imgHandle || ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './styles/Card.scss';
</style>
