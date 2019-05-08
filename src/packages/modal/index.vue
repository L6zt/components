<template>
    <div class="jc-modal-comp">
       <slot></slot>
    </div>
</template>
<script>
    export default {
      name: 'jc-modal'
    }
</script>

<style lang="scss">
    .jc-modal-comp {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.59);
        z-index: 999;
    }
</style>
