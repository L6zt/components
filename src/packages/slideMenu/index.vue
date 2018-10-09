<template>
    <div class="slide-menu-comp">
        <section
                class="slide-nav-container"
                :style="slideStyle"
        >
            <slot name="slide"></slot>
        </section>
        <section class="slide-content-container">
            <a class="menu-close-btn" href="javascipt:;" @click="handleClose">close</a>
            <slot name="container"></slot>
        </section>
    </div>
</template>
<script>
    export default  {
      name: 'jc-slide-menu',
      props: {
        minSlideWidth: {
          type: [String, Number],
          default: 50
        },
        maxSlideWidth: {
          type: [String, Number],
          default: 200
        },
        initClose: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
          isClose: true
        }
      },
      computed: {
        slideStyle () {
          const {isClose, minSlideWidth, maxSlideWidth} = this;
          const result = {
            width: isClose ? `${minSlideWidth}px` : `${maxSlideWidth}px`
          };
          console.log(result, isClose);
          return result
        }
      },
      watch: {
        initClose: {
          handler (value) {
            this.isClose = value
          },
          immediate: true,
        }
      },
      methods: {
        handleClose () {
          console.log('click');
          this.isClose = !this.isClose;
          this.$emit('slide:close', {
            isClose: this.isClose
          })
        }
      }
    }
</script>
<style lang="scss">
    .slide-menu-comp {
        position: relative;
        .slide-nav-container {
            float: left;
            transition: all 300ms ease;
        }
        .slide-content-container {
            position: relative;
            overflow: hidden;
            .menu-close-btn {
                position: absolute;
                left: 20px;
                top: 20px;
                width: 20px;
                height: 20px;
                background: black;
                color: #fff;
            }
        }
    }
</style>
