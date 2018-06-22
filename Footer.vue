<template>
    <footer>
        <div class="wrap">
            <p>&copy; {{ getYear }}  <a href="/">{{ getName }}</a>. Powered by <a  href="https://vuepress.vuejs.org/" target="_blank">Vuepress</a> and <a class="underline-a" href="https://github.com/ShumRain/vuepress-theme-Feb">Feb</a></p>
            <p v-if="getBeian">{{ getBeian }}</p>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        getYear() {
            return new Date().getFullYear()
        },
        getName() {
            const { name } = this.$site.themeConfig
            return name
        },
        getBeian() {
            const { beian } = this.$site.themeConfig
            return beian
        }
    }
}
</script>


<style lang="scss">
    @import './styles/Footer.scss';
</style>
