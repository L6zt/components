<template>
    <div class="container slider-page-container">
        <jc-row>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="slider-section-box">
                    <jc-slider
                            v-model="slider.value"
                            :step="slider.step"
                            :minValue="slider.minValue"
                            :maxValue="slider.maxValue"
                            :rangeEnd="slider.rangeEnd"
                            class="demo-slider-page"
                    >
                    </jc-slider>
                </section>
                <section class="output-value">
                    {{slider.value}}
                </section>
            </jc-col>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <section class="slider-section-box">
                    <jc-slider
                            v-model="baseSlider.value"
                            :minValue="baseSlider.minValue"
                            :maxValue="baseSlider.maxValue"
                            :rangeEnd="baseSlider.rangeEnd"
                            class="demo-slider-page"
                    >
                    </jc-slider>
                </section>
                <section class="output-value">
                    {{baseSlider.value.toFixed(2)}}
                </section>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    import jcSlider from  '../packages/slider/index.vue'
    export default {
      data () {
        return {
          commonPadding: 10,
          slider: {
            value: 10,
            step: 5,
            minValue: 0,
            maxValue: 100,
            rangeEnd: 100
          },
          baseSlider: {
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
        .slider-section-box {
            box-shadow: 0 0 1px;
            line-height: 80px;
            padding: 10px;
        }
        .output-value {
            font-size: 12px;
            padding: 5px 10px;
            color: #333;
        }
    }
</style>
