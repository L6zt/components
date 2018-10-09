<template>
    <div class="jc-swiper-comp" ref="container">
        <div class="jc-swipers-warp" :style="moveBoxStyle">
            <div
                    class="jc-swiper-slider-box"
                    v-for="item, index in mdfList"
                    :style="getSlideStyle(index)"
            >
                <slot :item="item">
                </slot>
            </div>
        </div>
        <div
                class="jc-swiper-pagination"
                v-if="showPagination"
        >
            <span
                    v-for="item, index in list"
                    :class="index === idxToCbIdx(idx) ? 'active' : ''"
                    @mouseover="handlePagActive(index)"
                    @mouseout="handlePagLeave(index)"
            >
            </span>
        </div>
    </div>
</template>
<script>
    import  {elemOffset} from '../../utils/dom';
    const transitionTime = 300;
    export default {
      props: {
        list: {
          type: Array,
        },
        currentIndex: {
          type: Number,
          default: 0
        },
        delayTime: {
          type: Number,
          default: 3000
        },
        showPagination: {
          type: Boolean,
          default: false
        },
        slideEndFn: {
          type: Function,
          default () {
            return (index) => {
            }
          }
        }
      },
      data () {
        return {
          idx: null,
          cbIndex: null,
          slideK: null,
          transitionK: null,
          width: null,
          left: 0,
          commonStyle: {

          }
        }
      },
      computed: {
        moveBoxStyle () {
          return {
            left: `${this.left}px`,
            width: `${this.width * this.mdfList.length}px`
          }
        },
        mdfList () {
          const list = this.list;
          return [list[list.length -1],...list, list[0]]
        }
      },
      methods: {
         initAm (must = true) {
          const frameAm = () => {
            this.sildeK =  setTimeout(() => {
              this.idx += 1;
              if (this.idx >= this.mdfList.length) {
                this.idx = 1;
                this.left = -this.width * this.idx;
                this.transition(frameAm, -(++this.idx) * this.width);
              } else {
                this.transition(frameAm, -this.idx * this.width);
              }
            }, this.delayTime);
          };
          frameAm();
        },
        transition (cb, endMv) {
           let mv = endMv - this.left;
           let stepWidth = mv / transitionTime * 20;
           let left = this.left;
           let allStep = parseInt(transitionTime / 20);
           let k = 0;
           let idx = this.idx;
           const transitionAm = () => {
             if (k >= allStep) {
               this.left = endMv;
               cb();
             } else {
               this.left = left + stepWidth * k++;
               this.transitionK = setTimeout(transitionAm, 20);
             }
           };
           transitionAm();
        },
        getSlideStyle () {
          let {commonStyle} = this;
          return Object.assign({}, commonStyle);
        },
        initSlideStyle () {
          let {container} = this.$refs;
          let {width} = elemOffset(container);
          this.width = width;
          this.idx = this.cbIdxToIdx(this.currentIndex || 0);
          this.left = -this.idx * width;
          this.commonStyle = {
            width: `${width}px`
          }
        },
        /* 转化标志 */
        idxToCbIdx (idx) {
           let {length} = this.mdfList;
           let trueLg = length - 2;
           idx = idx % trueLg;
           if (idx === 0) {
             return trueLg - 1
           }
           if (idx === length - 1) {
             return 0
           }
           return idx - 1
        },
        cbIdxToIdx (cbIdx, flag = true) {
          let {length} = this.mdfList;
          if (cbIdx === 0) {
            if (flag) {
              return 1
            } else {
              return length - 1
            }
          }
          if(cbIdx === length - 2) {
            if (flag) {
              return length - 2
            } else {
              return 0
            }
          }
          return cbIdx + 1
        },
        handlePagActive (index, cb) {
          let idx = this.idx;
          let oldCbIdx = this.idxToCbIdx(idx);
          let activeIdx = this.cbIdxToIdx(index);
          let direction = (index > oldCbIdx) ? 1 : (index === oldCbIdx) ? 0 : -1;
          clearTimeout(this.delayK);
          clearTimeout(this.sildeK);
          clearTimeout(this.transitionK);
          switch ( direction ) {
            case 1:
            case -1: {
              let mvEnd = -activeIdx * this.width;
              this.transition(() => {
                this.idx = activeIdx;
                cb && cb();
              }, mvEnd)
              break;
            }
            default: {
              cb && cb();
            }
          }
        },
        handlePagLeave (index) {
          this.handlePagActive(index, () => {
            this.initAm(false);
          });
       }
      },
      mounted () {
        this.initSlideStyle();
        this.initAm();
      },
      beforeDestroy () {
        clearTimeout(this.delayK);
        clearTimeout(this.sildeK);
        clearTimeout(this.transitionK);
      }
    }
</script>
<style lang="scss">
    .jc-swiper-comp {
        position: relative;
        width: 100%;
        overflow-x: hidden;
        .jc-swipers-warp {
            position: relative;
            left: 0;
            top: 0;
            .jc-swiper-slider-box {
                position: relative;
                display: inline-block;
            }
        }
        .jc-swiper-pagination {
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            bottom: 10px;
            text-align: center;
            span {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #fff;
                margin-left: 10px;
                cursor: pointer;
                &:last-of-type(1) {
                    margin: 0;
                }
                &.active {
                    background: orange;
                }
            }
        }
    }
</style>
