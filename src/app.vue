<template>
    <div>
        <transition name="view">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
    }
</script>
<style lang="scss">
    @import "./assert/scss/_reset.scss";
    @import "./assert/scss/_mian.scss";
    html {
        width: 100%;
        height: 100%;
    }
    body {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>
