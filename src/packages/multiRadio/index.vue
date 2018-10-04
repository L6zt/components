<template>
    <div class="jc-multi-radio-comp">
        <slot></slot>
    </div>
</template>
<script>
    export default {
      name: 'jc-multi-radio-comp',
      childsList: [],
      props: {
        value: {
          type: Array
        },
        min: {
          type: Number,
          default: 1
        },
        max: {
          type: Number,
          default: 1
        }
      },
      data () {
        return {}
      },

      created () {
        this.init();
        this.$nextTick(() => {
          console.log('next');
          this.initChildActive();
        })
      },
      beforeDestroy () {

      },
      methods: {
        init () {
          this.collectChild();
          this.delChild();
          this.captureChildSelect();
        },
        // 初始 资源苏状态
        initChildActive () {
          let {childsList} = this.$options;
          childsList.map(item => {
            item.$emit( 'multi:active', this.value)
          });
        },
        collectChild () {
          this.$on('inject:child', function(e) {
            let {vm, uuid} = e;
            this.$options.childsList.push(vm);
          })
        },
        delChild () {
          this.$on('del:child', function(e) {
            let {vm, uuid} = e;
            let {childsList} = this.$options;
            let {value} = this;
            let kArray = [...value];
            let index = childsList.findIndex(item => item.uuid === uuid);
            let kIndex = kArray.findIndex(item => item === vm.k);
            childsList.splice(index, 1);
            if (kIndex > - 1) {
                kArray.splice(kIndex, 1);
                this.$emit('input', kArray);
            }
          })
        },
        captureChildSelect () {
          this.$on('single:select', (e) => {
            //
            const {flag, uuid, vm} = e;
            const {min, max, $options: {childsList}} = this;
            const activeChild = childsList.filter(item => {
              return item.isActive
            });
            const lg = activeChild.length;
            if (lg > max) {
              if (!flag) {
                return false
              } else {
                vm.$emit('multi:select', {});
              }
            } else {
              vm.$emit('multi:select', {});
            }
          });
          this.$on('single:changeValue', (e) => {
            let {flag, key} = e;
            let kArray = [...this.value];
            // 加入
            let index = kArray.findIndex(k => k === key);
            console.log(index, key, flag);
            if (flag) {
              if (index === -1 ) {
                kArray.push(key);
                this.$emit('input', kArray);
              }
            } else {
              kArray.splice(index, 1);
              this.$emit('input', kArray);
            }
          })
        }
      }
    }
</script>
<style>

</style>
