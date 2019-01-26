<template>
    <div class="accordion-container container">
        <transtion>
            <div class="test-accordion" v-if="isShow">
                1233
                <p>1233</p>
                p222
            </div>
        </transtion>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false
      }
    }
  };
</script>

<style lang="scss">
    .test-accordion {
        background: red;
        font-size: 15px;
    }

</style>
