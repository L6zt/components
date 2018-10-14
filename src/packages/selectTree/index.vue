<template>
    <div class="select-tree-main-comp">
        <child-select-tree
                v-for="item, index in selfTree"
                :tree="item"
                :key="item.k"
        >
        </child-select-tree>
    </div>
</template>

<script>
  /*
  *  tree State 数组 data 状态码
  *
  *
  */
  import {deepClone} from '../../utils/handleObj';
  import childSelectTree from './childComp/index.vue'
  export default {
    name : 'select-tree-main-comp',
    childs: null,
    props: {
      tree: {
        type: Array,
        required: true
      },
      value: {
        type: [String, Number, null]
      },
      singleShow: {
        type: [Boolean],
        default: true
      }
    },
    data () {
      return {
         selfTree: [],
         injectTimeK: null
      }
    },
    watch: {
      tree: {
        handler(v, ov) {
          this.selfTree = deepClone(v);
          this.sendChildKey();
        },
        deep: true,
        immediate: true
      },
      value: {
        handler(v, ov) {
          this.sendChildKey();
        },
        immediate: true
      }
    },
    created () {
      this.$options.childs = [];
      this.onChildEvent();
    },
    mounted () {
      this.sendChildKey();
    },
    methods: {
      onChildEvent () {
        this.$on('form:child:inject', (child) => {
          let childs = this.$options.childs;
          if (childs.indexOf(child) === - 1) {
            childs.push(child);
          }
          clearTimeout(this.injectTimeK);
          (this.injectTimeK = setTimeout(() => {
            console.log('created');
            this.sendChildKey();
          }, 5))
        });
        this.$on('form:child:del', (child) => {
          let childs = this.$options.childs;
          let index = childs.indexOf(child);
          childs.splice(index, 1);
        })
        this.$on('form:child:click', ({type, k, isShowChilds}) => {
          switch ( type ) {
            case 0: {

              break;
            }
            case 1: {
              this.$emit('input', k)
              break;
            }
            default: {

            }
          }
        })
      },
      sendChildKey () {
        let childs = this.$options.childs;
        childs && childs.forEach(child => {
            child.$emit('form:farther:select:item', {
              key: this.value
            })
          })
      }
    },
    components: {
      childSelectTree
    }
  };
</script>

<style lang="scss">

</style>
