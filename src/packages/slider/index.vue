<template>
    <div class="jc-slider-cmp">
        <section
                class="slider-active-bg"
                :style="{width: `${left}px`}"
            >
        </section>
        <i
                class="jc-slider-dot"
                :style="{left: `${left}px`}"
                ref="dot"
                @mousedown="moveStart"
        >
        </i>
    </div>
</template>

<script>
  import {elemOffset, on, off, once} from "../../utils/dom";

  export default {
    props: {
      step: {
        type: [Number],
        default: 0
      },
      rangeEnd: {
        type: [Number],
        required: true
      },
      value: {
        type: [Number],
        required: true
      },
      minValue: {
        type: [Number],
        required: true
      },
      maxValue: {
        type: [Number],
        required: true
      }
    },
    data () {
      return {
        startX: null,
        width: null,
        curValue: 0,
        curStep: 0,
        left: 0,
        tempLeft: 0
      }
    },
    computed: {
      wTov () {
        let step = this.step;
        let width = this.width;
        let rangeEnd = this.rangeEnd;
        if (width) {
          if (step) {
            return width / (rangeEnd / step)
          }
          return width / rangeEnd
        }
        return null
      }
    },
    watch: {
       value: {
         handler (value) {
           this.$nextTick(() => {
             let step = this.step;
             let wTov = this.wTov;
             if (step) {
               this.left = value / step * wTov;
             } else {
                this.left = value * wTov;
             }
           })
         },
         immediate: true
       }
    },
    methods: {
      moveStart (e) {
        e.preventDefault();
        const body = window.document.body;
        const _this = this;
        this.startX = e.pageX;
        this.tempLeft = this.left;
        on({
          el: body,
          type: 'mousemove',
          fn: this.moving
        });
        once({
          el: body,
          type: 'mouseup',
          fn: function() {
            console.log('end');
            if (_this.step) {
              console.log(_this.step * _this.curStep, _this.step, _this.curStep);
              _this.$emit('input', _this.step * _this.curStep);
            } else {
              console.log(_this.left / _this.wTov);
              _this.$emit('input', _this.left / _this.wTov);
            };
            off({
              el: body,
              type: 'mousemove',
              fn: _this.moving
            })
          }
        })
      },
      moving(e) {
        let curX = e.pageX;
        let step = this.step;
        let rangeEnd = this.rangeEnd;
        let width = this.width;
        let tempLeft = this.tempLeft;
        let startX = this.startX;
        let wTov = this.wTov;
        if (step !== 0) {
          let all = parseInt(rangeEnd / step);
          let curStep = (tempLeft + curX - startX) / wTov;
          curStep > all && (curStep = all);
          curStep < 0 && (curStep = 0);
          curStep = Math.round(curStep);
          this.curStep = curStep;
          this.left = curStep * wTov;
        } else {
          let left = tempLeft + curX - startX;
          left < 0 && (left = 0);
          left > width && (left = width);
          this.left = left;
        }
      }
    },
    mounted () {
      this.width = elemOffset(this.$el).width;
    }
  };
</script>

<style lang="scss">
    .jc-slider-cmp {
        position: relative;
        width: 100%;
        border-radius: 4px;
        height: 8px;
        background: #ccc;
        .jc-slider-dot {
            position: absolute;
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #333;
            cursor: pointer;
        }
        .slider-active-bg {
            position: relative;
            height: 100%;
            border-radius: 4px;
            background: red;
        }
    }
</style>
