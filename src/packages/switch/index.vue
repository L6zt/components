<template>
    <div class="switch-comp">
        <div
                class="switch-progress"
                :class="value ? 'active' : ''"
                :style="progressBg"
        >
        </div>
        <i
                class="switch-dot"
                :class="value ? 'active' : ''"
                @click="handleClick"
        >
        </i>
    </div>
</template>

<script>
  export default {
    name : "jc-switch",
    props: {
      value: {
        prop: {
          type: Boolean,
          default: false
        }
      },
      type: {
        type: String,
        default: 'normal'
      }
    },
    computed: {
      progressBg () {
        const {type} = this;
        switch ( type ) {
          case 'normal': {
            return {
              background: '#2196F3'
            }
          }
          case 'access' : {
            return {
              background: '#90f120'
            }
          }
          case 'warn' : {
            return {
              background: '#F44336'
            }
          }
        }
      }
    },
    methods: {
      handleClick () {
        this.$emit('input', !this.value);
      }
    }
  };
</script>

<style lang="scss">
    $baseWh: 25px;
    $dv: 0px;
    .switch-comp {
        position: relative;
        display: inline-block;
        width: 60px;
        height: $baseWh + $dv;
        line-height: $baseWh + $dv;
        border: 1px solid #ccc;
        border-radius: ($baseWh / 2);
        font-size: 0;
        overflow: hidden;
        & > .switch-progress {
            position: absolute;
            left: 0;
            width: 0;
            height: 100%;
            background: #FF5722;
            transition: all ease 600ms;
            &.active {
                width: 100%;
            }
        }
        & > .switch-dot {
            position: absolute;
            top: 50%;
            left: 0;
            width: $baseWh;
            height: $baseWh;
            border-radius: 100%;
            cursor: pointer;
            transform: translate(0, -50%);
            transition: all ease 500ms;
            background: #fff;
            box-shadow: 0 0 1px #333;
            &.active {
                left: 100%;
                transform: translate(-$baseWh, -50%);
            }
        }
    }
</style>
