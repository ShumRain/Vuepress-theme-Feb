<template>
    <div class="pagination wrap">
        <a to="javascript:;" v-if="currentPage > 1" @click="prevPage">上一页</a>
        <a to="javascript:;" v-if="currentPage < total" @click="nextPage">下一页</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1
        }
    },
    computed: {
        total() {
            const { perPage } = this.$site.themeConfig
            const { pages } = this.$site

            return pages.length ? Math.ceil(pages.length / perPage) : 1
        }
    },
    methods: {
        prevPage() {
            this.$emit('pageTurning', --this.currentPage)
        },
        nextPage() {
            this.$emit('pageTurning', ++this.currentPage)
        }
    }
}
</script>
