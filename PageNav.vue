<template>
    <nav class="page-nav">
        <div class="page-nav-item" v-if="prev">
            <div v-if="prev.frontmatter.cover" class="cover lazy-bg blur" :data-lazy="prev.frontmatter.cover + imgHandle"></div>
            <div v-else class="cover"></div>
            <router-link :to="prev.path">
                <h2 class="title">{{ prev.title }}</h2>
                <p>{{ prev.frontmatter.description }}...</p>
            </router-link>
        </div>
        <div class="page-nav-item" v-if="next">
            <div v-if="next.frontmatter.cover" class="cover lazy-bg blur" :data-lazy="next.frontmatter.cover + imgHandle"></div>
            <div v-else class="cover"></div>
            <router-link :to="next.path">
                <h2 class="title">{{ next.title }}</h2>
                <p>{{ next.frontmatter.description }}...</p>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['prev', 'next'],
    computed: {
        imgHandle() {
            return this.$site.themeConfig.imgHandle || ''
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './styles/PageNav.scss';
</style>
