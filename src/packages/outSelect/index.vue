<template>
    <div
            class="jc-out-select-comp"

    >
        <dl>
            <dt
                    class="jc-select-default-msg"
                    :class="disabled ? 'disabled': ''"
                    @click="showSelectBox"
            >
                {{selectMsg}}
            </dt>
        </dl>
    </div>
</template>
<script>
  import Vue from "vue";
  import { position , elemOffset , contains , on , off } from "../../utils/dom.js";

  const global = window;
  export default {
    outOptions : null ,
    clickOutFn : null ,
    props : {
      items : {
        type : Array ,
        default : []
      } ,
      defaultTip : {
        type : String ,
        default : "请选择"
      } ,
      disabled : {
        type : Boolean ,
        default : false
      } ,
      k : {
        type : [String , Number] ,
        default : ""
      }
    } ,
    data () {
      return {
        isShow : false ,
        boxStyle : {}
      };
    } ,
    computed : {
      selectMsg () {
        let { items , k , defaultTip } = this;
        return k !== null ? items[k].v : defaultTip;
      }
    } ,
    mounted () {
      this.createOption ();
    } ,
    beforeDestroy () {
      const optionsVm = this.$options.outOptions;
      const root = window.document.body;
      const el = optionsVm.$el;
      optionsVm.$destroy ();
      root.removeChild ( el );
    } ,
    methods : {
      createOption () {
        const that = this;
        const vmEl = that.$el;
        const doc = global.document;
        const root = doc.body;
        const { left , top } = position ( vmEl );
        const { width , height } = elemOffset ( vmEl );
        const el = doc.createElement ( "div" );
        let style = {
          position : "absolute" ,
          left : `${left}px` ,
          top : `${top + height + 2}px` ,
          width : `${width}px`
        };
        that.$options.outOptions = new Vue ( {
          render (h) {
            const _this = that;
            let result = null;
            // 数据状态问题
            let ulStyle = _this.isShow ? Object.assign ( {} , style , {
              display : "block"
            } ) : Object.assign ( {} , style , {
              display : "none"
            } );
            const childs = _this.items.map ( (item , index) => {
              return h ( "li" , {
                key : item.k ,
                on : {
                  click (e) {
                    that.emitSelectEvent ( index );
                  }
                }
              } , item.v );
            } );
            result = h ( "ul" , {
              class : "jc-out-select-options" ,
              style : ulStyle
            } , childs );
            return result;
          }
        } );
        root.appendChild ( el );
        that.$options.outOptions.$mount ( el );
        that.$options.clickOutFn = function(e) {
          const { target } = e;
          if ( !contains ( el, target ) && !contains ( vmEl, target ) && target !== el && target !== vmEl ) {
            that.isShow = false;
          }
        };
        on ( {
          el : window ,
          type : "click" ,
          fn : that.$options.clickOutFn
        } );

      } ,
      showSelectBox () {
        if ( this.disabled ) {
          return false;
        }
        this.isShow = !this.isShow;
      } ,
      clickOut (e) {
        this.isShow = false;
      } ,
      emitSelectEvent (index) {
        const { items } = this;
        const item = items[index];
        this.isShow = false;
        this.$emit ( "selectEvent" , item );
      }
    }
  };
</script>
<style lang="scss">
    $basefontcolor: #868080;
    $basebackg: #fff;
    .jc-out-select-comp {
        position: relative;
        width: 120px;
        padding: 5px;
        line-height: 1;
        text-align: left;
        font-size: 14px;
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
            border: 1px solid #ccc;
            background: $basebackg;
            z-index: 999;
            .jc-select-option {
                position: relative;
                width: 100%;
                padding: 5px 0 5px 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                &:nth-last-child(1) {
                    border: 0;
                }
            }
        }
    }

    .jc-out-select-options {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        li {
            position: relative;
            width: 100%;
            padding: 5px 0;
            border-bottom: 1px solid #ccc;
            font-size: 14px;
            padding-left: 5px;
        }
    }
</style>
