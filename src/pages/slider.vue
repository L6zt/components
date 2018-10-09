<template>
    <div class="container slider-page-container">
        <section style="width: 500px; padding-left: 20px">
            <jc-slider
                    v-model="slider.value"
                    :step="slider.step"
                    :minValue="slider.minValue"
                    :maxValue="slider.maxValue"
                    :rangeEnd="slider.rangeEnd"
            >
            </jc-slider>
        </section>
        <section>
            <span>{{slider.value}}</span>
        </section>

    </div>
</template>
<script>
    import jcSlider from  '../packages/slider/index.vue'
    export default {
      data () {
        return {
          slider: {
            value: 0,
            step: 5,
            minValue: 0,
            maxValue: 100,
            rangeEnd: 100
          }
        }
      },
      components: {
        jcSlider
      }
    }
</script>
<style lang="scss">
    .slider-page-container {
        margin-top: 20px;
    }
</style>
