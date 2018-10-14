<template>
    <div class="jc-single-radio-comp"
    >
        <i
                class="select-box"
                :class="selectBoxClass"
                @click="handleClick"
        >
        </i>
         <span
                 class="jc-single-radio-label"
                 :class="radioLabelClass"
         >
             {{label}}
         </span>
    </div>
</template>
<script>
    // 组件 点击选中 点击取消
    const FARTHER_NAME = 'jc-multi-radio-comp';
    let uuid = 0;
    export default {
      name: 'jc-single-radio',
      fFarther: null,
      props: {
        value: {
          type: [String, Number, undefined],
          default: undefined
        },
        k: {
          type: [String, Number],
          default: ''
        },
        label: {
          type: [String, Number],
          default: ''
        },
        disabled: {
          type: Boolean,
          default: false
        }
      },
      data () {
        uuid++;
        return {
          curK: undefined,
          uuid: uuid,
          isInFarther: false
        }
      },
      computed: {
         isActive () {
           let {k} = this;
           if (this.isInFarther) {
             return this.curK === k
           }
           return this.value === k

         },
         selectBoxClass () {
           let className = '';
           if (this.disabled) {
             className += 'disabled '
           }
           if (this.isActive) {
             className += 'active'
           }
           return className
         },
        radioLabelClass () {
           let className = '';
           if (this.disabled) {
             return className += 'disabled'
           }
           return ''
        }
      },
      created () {
        this.checkIsInMulti();
        this.injectCtx();
        this.onMultiEvent();
      },
      beforeDestroy () {
        this.delCtx()
      },
      methods: {
        checkIsInMulti () {
          this.isInFarther = this.$checkFarther(FARTHER_NAME);
          this.$options.fFarther = this.$getFarther(FARTHER_NAME);
        },
        injectCtx () {
          if (this.isInFarther) {
            this.$options.fFarther.$emit('form:child:inject', {
              vm: this
            })
          }
        },
        delCtx () {
          if (this.isInFarther) {
            this.$options.fFarther.$emit('form:child:del', {
              vm: this
            })
          }
        },
        onMultiEvent () {
          this.$on('form:farther:multi:select', (e) => {
            this.clickCallback();
          });
          this.$on('form:farther:multi:clear', (e) => {
            this.curK = undefined
          });
          this.$on('form:farther:multi:active', (e) => {
            let index = e.findIndex(item => item == this.k);
            if( index > - 1) {
              this.curK = this.k;
            }
          })
        },
        triggerSelectEvent () {
          this.$options.fFarther.$emit('form:child:select', {
            flag: this.isActive,
            vm: this
          })
        },
        handleClick () {
          if (this.disabled) {
            return false
          }
          if (this.isInFarther) {
            this.triggerSelectEvent();
          } else {
            this.clickCallback();
          }
        },
        clickCallback () {
          let k = this.k;
          let value = this.isActive ? undefined : k;
          if (this.isInFarther) {
            this.curK = value;
            this.$options.fFarther.$emit('form:child:changeValue', {
              flag: this.isActive,
              key: k
            });
            return false;
          }
          this.$emit('input', value);
        }
      }
    }
</script>
<style lang="scss">
    .jc-single-radio-comp {
        position: relative;
        display: inline-block;
        padding: 0 5px;
        font-size: 14px;
        i {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #333;
            cursor: pointer;
            &.active {
                background: orange;
            }
        }
    }
</style>
