<template>
<div class="select-area-cmp" ref="cn" @mousedown="handlePointerDown" @mousemove="handlePointerMove" @mouseup="handlePoniterUp" @mouseleave="handlePoniterOut">
  <slot></slot>
  <div class="area" :style="style" v-if="isPointerDown"></div>
</div>
</template>

<script>
const getOffsetPostion = (el, parent) => {
  const pPosition = parent.getBoundingClientRect();
  const sPosition = el.getBoundingClientRect();
  return {
    tl: {
      x: sPosition.left - pPosition.left,
      y: sPosition.top - pPosition.top
    },
    tr: {
      x: sPosition.right - pPosition.left,
      y: sPosition.top - pPosition.top,
    },
    bl: {
      x: sPosition.left - pPosition.left,
      y: sPosition.bottom - pPosition.top
    },
    br: {
      x: sPosition.right - pPosition.left,
      y: sPosition.bottom - pPosition.top
    }
  }
}
export default {
  props: {
    waitSelector: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isPointerDown: false,
      pointStart: {
        x: 0,
        y: 0,
      },
      ponitEnd: {
        x: 0,
        y: 0
      },
    }
  },
  computed: {
    style() {
      const { x, y } = this.pointStart
      const { x: endX, y: endY } = this.ponitEnd;
      return {
        top: `${y}px`,
        left: `${x}px`,
        width: `${endX - x}px`,
        height: `${endY - y}px`
      }
    },
    position() {
      return this.cn.getBoundingClientRect()
    },
    cn() {
      return this.$refs.cn
    },
    areaPosition() {
      const { pointStart, ponitEnd } = this;
      return {
        tl: {
          x: pointStart.x,
          y: pointStart.y
        },
        tr: {
          x: ponitEnd.x,
          y: pointStart.y
        },
        bl: {
          x: pointStart.x,
          y: ponitEnd.y
        },
        br: {
          x: ponitEnd.x,
          y: ponitEnd.y
        }
      }
    }
  },
  methods: {
    handlePointerDown(e) {
      this.isPointerDown = true
      const { left, top } = this.position;
      const { pageX, pageY } = e
      this.pointStart = {
        x: pageX - left,
        y: pageY - top
      }
      this.ponitEnd = {
        x: pageX - left,
        y: pageY - top
      }
    },
    check2selectEm() {
      this.$nextTick(() => {
        const { areaPosition } = this;
        const els = this.cn.querySelectorAll(this.waitSelector);
        const outEls = []
        // 状态描述
        // 1 所选区域 在元素 里面
        // 2 所选区域 跨度 在 y1-y2内 其中 x1 x2 在 选区里面
        // 3 

        els.forEach((el, idx) => {
          const elPosition = getOffsetPostion(el, this.cn)
          let flag = false
          // 1 所选区域 在元素 里面
          if (elPosition.tl.y <= areaPosition.tl.y && elPosition.br.y >= areaPosition.br.y) {
            if (elPosition.tl.x >= areaPosition.tl.x && elPosition.tl.x <= areaPosition.br.x) {
              return outEls.push(el)
            }
            if (elPosition.br.x >= areaPosition.tl.x && elPosition.br.x <= areaPosition.br.x) {
              return outEls.push(el)
            }
          }

          if (elPosition.tl.y >= areaPosition.tl.y && elPosition.br.y <= areaPosition.tl.y) {
            if (elPosition.tl.x >= areaPosition.tl.x && elPosition.tl.x <= areaPosition.br.x) {
              return outEls.push(el)
            }
            if (elPosition.br.x >= areaPosition.tl.x && elPosition.br.x <= areaPosition.br.x) {
              return outEls.push(el)
            }
          }

          if ((elPosition.tl.y >= areaPosition.tl.y && elPosition.tl.y <= areaPosition.br.y) || (elPosition.br.y >= areaPosition.tl.y && elPosition.br.y <= areaPosition.br.y)) {
            if (elPosition.tl.x >= areaPosition.tl.x && elPosition.tl.x <= areaPosition.br.x) {
              return outEls.push(el)
            }
            if (elPosition.br.x >= areaPosition.tl.x && elPosition.br.x <= areaPosition.br.x) {
              return outEls.push(el)
            }
            if (elPosition.tl.x <= areaPosition.tl.x && elPosition.br.x >= areaPosition.br.x) {
              return outEls.push(el)
            }
          }

        })
        this.$emit('change', {
          els: outEls
        })
      });
    },
    // checkSelectEm() {
    //   this.$nextTick(() => {
    //     const { areaPosition } = this;
    //     const els = this.cn.querySelectorAll(this.waitSelector);
    //     const outEls = []
    //     console.log(JSON.stringify(areaPosition))
    //     els.forEach((el, idx) => {
    //       const elPosition = getOffsetPostion(el, this.cn)
    //       let flag = false
    //       Object.values(elPosition).map((xy) => {
    //         // {x, y} ==== xy 左上角
    //         if (areaPosition.tl.x <= xy.x && areaPosition.tl.y <= xy.y) {
    //           if (idx === 0) {
    //             console.log('通过tl')
    //           }
    //         } else {
    //           return false
    //         }
    //         // 右下角
    //         if (areaPosition.br.x >= xy.x && areaPosition.br.y >= xy.y) {
    //           console.log('通过br')
    //         } else {
    //           return false
    //         }
    //         flag = true
    //       })
    //       if (flag) {
    //         outEls.push(el)
    //       }
    //     })
    //     this.$emit('change', {
    //       els: outEls
    //     })
    //   })
    // },
    handlePoniterOut(e) {
      if (this.isPointerDown) {
        this.check2selectEm();
      }
      this.isPointerDown = false
    },

    handlePoniterUp(e) {
      if (this.isPointerDown) {
        this.check2selectEm();
      }
      this.isPointerDown = false
    },
    handlePointerMove(e) {
      const { pageX, pageY } = e
      const { left, top } = this.position;
      if (this.isPointerDown) {
        this.ponitEnd = {
          x: pageX - left,
          y: pageY - top,
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-area-cmp {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border: 1px solid #ccc;
  padding: 10px;

  .area {
    position: absolute;
    background: rgba(33, 150, 243, 0.28);
  }
}
</style>
