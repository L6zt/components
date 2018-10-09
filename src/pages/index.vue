<template>
    <div class="container index-page-container">
        <section class="nav-links-box">
            <router-link class="nav-link" to="/swiper">swiper/</router-link>
        </section>
        <section class="nav-links-box">
            <router-link class="nav-link" to="/select">select/</router-link>
        </section>
        <section class="nav-links-box">
            <router-link class="nav-link" to="/button">button/</router-link>
        </section>
        <section class="nav-links-box">
            <router-link class="nav-link" to="/notFound">notFound/</router-link>
        </section>
        <section class="nav-links-box">
            <router-link class="nav-link" to="/radio">radio/</router-link>
        </section>
        <section class="nav-links-box">
            <router-link class="nav-link" to="/slidemenu">slidemenu/</router-link>
        </section>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss">
    @import "../assert/scss/minix";
    .index-page-container {
        .nav-links-box {
            margin-top: 20px;
            a.nav-link {
                color: #333;
            }
        }
    }
</style>
