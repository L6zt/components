<template>
    <div
            class="jc-mask-box mask-transition-active"
            :class="maskActiveClassName"
            :style="css"
            @transitionend="captureTransitionEnd"
    >
        <slot></slot>
    </div>
</template>
<script>
    const classNameList = ['mask-fade-in', 'mask-fade-out'];
    export default {
      name: 'jc-mask',
      props: {
        css: {
          require: false,
          default: {
          }
        },
        destroyCallback: {
          type: Function,
          default: function () {
          }
        }
      },
      data () {
        return {
          maskActiveClassName: ''
        }
      },
      methods: {
        startTransition (idx) {
          this.maskActiveClassName = classNameList[idx];
        },
        captureTransitionEnd () {
          const {maskActiveClassName} = this;
          if (maskActiveClassName === classNameList[1]) {

          }
        }
      },
      mounted () {
        this.$nextTick( () => {
          setTimeout(() => {
            this.startTransition(0);
          }, 13)
        });
      }
    }
</script>
<style lang="scss">
    .jc-mask-box {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(45, 35, 35, 0.5);
        opacity: 0;
    }
    .mask-transition-active {
        transition: opacity ease 1500ms;
    }
    .mask-fade-in {
        opacity: 1;
    }
    .mask-fade-out {
        opacity: 0;
    }
</style>
