<template>
    <div class="slide-menu-layout">
        <jc-slide-menu>
            <template slot="slide">
                <section class="www-nav">
                    black
                </section>
            </template>
            <template slot="container">
              <div class="section-a common-section">
              </div>
               <div class="section-b common-section">

               </div>
            </template>
        </jc-slide-menu>
    </div>
</template>
<script>
    import jcSlideMenu from '../packages/slideMenu/index.vue';
    export default {
      data () {
        return {
        }
      },
      components: {
        jcSlideMenu
      }
    }
</script>
<style lang="scss">
    .slide-menu-layout {
        .www-nav {
            background: black;
            color: #fff;
        }
        .common-section {
            height: 50px;
        }
        .section-a {
            background: red;
        }
        .section-b {
            background: black;
        }
    }
</style>
