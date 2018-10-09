<template>
    <div class="container swiper-page-container">
        <jc-swiper
                :list="list"
                :showPagination="showPagination"
                class="base-swiper"
        >
            <template slot-scope="scope">
                <section class="test-slide">
                    <div :class="`test-bg-${scope.item.text}`">
                        {{scope.item.text}}

                    </div>
                </section>
            </template>
        </jc-swiper>
        <section style="width: 501px">
            <jc-swiper
                    :list="list"
                    :showPagination="showPagination"
                    class="base-swiper"
            >
                <template slot-scope="scope">
                    <section class="test-slide">
                        <div :class="`test-bg-${scope.item.text}`">
                            {{scope.item.text}}

                        </div>
                    </section>
                </template>
            </jc-swiper>
        </section>
    </div>
</template>
<script>
    import jcSwiper from '../packages/swiper/index.vue'
    export default {
      data () {
        return {
          showPagination: true,
          list: [
            {
              text: 0
            },
            {
              text: 1
            },
            {
              text: 2
            }, {
                text: 3
            }, {
            text: 4
            }
          ]
        }
      },
      components: {
        jcSwiper
      }
    }
</script>
<style lang="scss">
    .swiper-page-container {
        section.test-slide {
            color: #fff;
            background: black;
            text-align: center;
            line-height: 300px;
            .test-bg-0 {
                background: red;
            }
            .test-bg-2 {
                background: yellow;
            }
            .test-bg-4 {
                background: #409eff;
            }
        }
    }
</style>
