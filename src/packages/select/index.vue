<template>
    <div
            class="jc-select-comp"
            v-click-out="clickOut"

    >
        <dl>
            <dt
                    class="jc-select-default-msg"
                    :class="disabled ? 'disabled': ''"
                    @click="showSelectBox"
            >
                {{selectMsg}}
            </dt>
            <transition name="fade">
                <div
                        class="jc-select-option-box"
                        v-show="isShow"
                        :style="optionBoxStyle"
                >
                    <dd
                            v-for="(item, index) in items"
                            :key="index"
                            class="jc-select-option"
                            :class="`${k === item.key ? 'active' : ''}`"
                            @click="emitSelectEvent(index)"
                    >
                        {{item.v}}
                    </dd>
                </div>
            </transition>
        </dl>
    </div>
</template>
<script>
    import {elemOffset} from '../../utils/dom';
    export default  {
      props: {
        items: {
          type: Array,
          default: []
        },
        defaultTip: {
          type: String,
          default: '请选择'
        },
        disabled: {
          type: Boolean,
          default: false
        },
        k: {
          type: [String, Number],
          default: ''
        }
      },
      data () {
        return {
          isShow: false,
          boxOptionsTop: 0
        }
      },
      computed:{
          selectMsg () {
            let {items, k, defaultTip} = this;
            return k !== null ? items[k].v : defaultTip
          },
         optionBoxStyle () {
            let {maxHeight,  boxOptionsTop} = this;
            maxHeight = maxHeight || 100;
            let result = {
              maxHeight: `${maxHeight}px`,
              left: 0,
              top: `${boxOptionsTop}px`
            };
            console.log(result);
            return  result
         }
      },
      mounted () {
        const {$el} = this;
        const size = elemOffset($el);
        this.boxOptionsTop = size.height + 1;
      },
      methods: {
        showSelectBox () {
          if (this.disabled) {
            return false;
          }
          this.isShow = !this.isShow
        },
        clickOut (e) {
          this.isShow = false
        },
        emitSelectEvent (index) {
          const {items} = this;
          const item = items[index];
          this.isShow = false;
          this.$emit('selectEvent', item);
        }
      }
    }
</script>
<style lang="scss">
    $basefontcolor: #868080;
    $basebackg: #fff;
    .jc-select-comp {
        position: relative;
        width: 120px;
        padding: 5px;
        line-height: 1;
        text-align: left;
        font-size: 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
        cursor: pointer;
        color: $basefontcolor;
        background: $basebackg;
        .jc-select-option-box {
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            font-size: 12px;
            box-shadow: 0 0 1px #333;
            background: $basebackg;
            overflow: auto;
            z-index: 999;
            .jc-select-option {
                position: relative;
                width: 100%;
                padding: 5px 0 5px 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                &.active {
                    color: red;
                }
                &:nth-last-child(1) {
                    border: 0;
                }
            }
        }
    }
</style>
