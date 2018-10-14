<template>
    <div class="select-tree-child-comp">
        <dl class="select-tree-single-item">
            <dt class="select-tree-click-item"
                :class="isActive ? 'select-active' : ''"
                @click="captureClick(tree.k)"
            >
                {{tree.v}}
                <i
                        v-if="hasChilds"
                        class="child-status-arrow"
                        :class="isShowChilds ? 'active' : ''"
                >

                </i>
            </dt>
            <template v-if="hasChilds">
                <dd class="select-tree-childs-box" v-show="isShowChilds">
                        <select-tree-child
                                v-for="item, index in tree.childs"
                                :tree="item"
                                :key="item.k"
                        >
                        </select-tree-child>
                </dd>
            </template>
        </dl>
    </div>
</template>

<script>
  const F_FATHER_NAME = "select-tree-main-comp";
  export default {
    name : "select-tree-child" ,
    fFather : null ,
    props : {
      tree : {
        type : [Object]
      }
    } ,
    data () {
      return {
        isShowChilds : false ,
        isActive : false ,
        watchOnce: true
      };
    } ,
    computed : {
      hasChilds () {
        let childs = this.tree.childs;
        return childs && childs.length;
      }
    } ,
    created () {
      this.getmfarther ();
      this.getFartherEvent ();
      this.injectChild ();
    } ,
    destroyed () {
      this.delChild ();
    } ,
    methods : {
      injectChild () {
        let fFather = this.$options.fFather;
        fFather.$emit ( "form:child:inject" , this );
      } ,
      delChild () {
        let fFather = this.$options.fFather;
        fFather.$emit ( "form:child:del" , this );
      } ,
      getmfarther () {
        let fFather = this.$getFarther ( F_FATHER_NAME );
        this.$options.fFather = fFather;
      } ,
      getFartherEvent () {
        this.$on ( "form:farther:select:item" , ({ key }) => {
          // 节点函数
          let tree = this.$getFartherTree ( F_FATHER_NAME );
          let cbK = this.makeCbKey ();
          let hasChilds = this.hasChilds;
          let watchOnce = this.watchOnce;
          let fFather = this.$options.fFather;
          tree.push ( this );
          // 单个显示
          let flag = true;
          let lg = tree.length;
          let keys = key.split ( "-" );
          if ( hasChilds && watchOnce) {
            // 可做优化
            for ( let i = 0 ; i < lg ; i++ ) {
              let k = tree[i].tree.k;
              if ( k != keys[i] ) {
                flag = false;
                break;
              }
            };
            this.isShowChilds = flag;
            !fFather.singleShow && (this.watchOnce = false);
          }
          this.isActive = ( cbK === key );
        } );
      } ,
      captureClick (k) {
        let isShowChilds = this.isShowChilds;
        let hasChilds = this.hasChilds;
        let fFather = this.$options.fFather;
        let cbk = this.makeCbKey ();
        if ( hasChilds ) {
          isShowChilds = !isShowChilds;
          fFather.$emit ( "form:child:click" , {
            type : 0 ,
            isShowChilds ,
            k : cbk
          } );
          this.isShowChilds = isShowChilds;
        } else {
          fFather.$emit ( "form:child:click" , {
            type : 1 ,
            k : cbk
          } );
        }
      } ,
      makeCbKey () {
        let tree = this.$getFartherTree ( F_FATHER_NAME );
        tree.push ( this );
        let cbk = "";
        let lg = tree.length;
        for ( let i = 0 ; i < lg ; i++ ) {
          cbk += tree[i].tree.k + ( i === lg - 1 ? "" : "-" );
        }
        return cbk;
      }

    }
  };
</script>

<style lang="scss">
 .select-tree-child-comp {
     position: relative;
     font-size: 14px;
     .select-tree-click-item {
         position: relative;
         padding: 5px 0 5px 5px;
         color: #333;
         border-bottom: 1px solid #eee;
         cursor: pointer;
         &.select-active {
             color: red;
         }
         & > i{
             position: absolute;
             display: block;
             width: 16px;
             height: 16px;
             background: url("../../../assert/img/down-arrow.png") 0 0 no-repeat;
             background-size: 100% 100%;
             transition: 300ms ease all;
             top: 0;
             bottom: 0;
             right: 10px;
             margin: auto 0;
             &.active {
                 transform: rotate(180deg);
             }
         }
     }
     .select-tree-childs-box {
         padding-left: 10px;
     }
 }
</style>
