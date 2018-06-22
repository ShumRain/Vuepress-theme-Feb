<template>
    <div class="theme-container">
        <Navbar></Navbar>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'

export default {
    components: { Navbar, Footer, },
}
</script>

<style lang="scss">
    @import './styles/common';    
</style>
