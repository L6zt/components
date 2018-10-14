<template>
    <div class="jc-multi-radio-comp">
        <slot></slot>
    </div>
</template>
<script>
    export default {
      name: 'jc-multi-radio-comp',
      childsList: null,
      props: {
        value: {
          type: Array
        },
        min: {
          type: Number,
          default: 0
        },
        max: {
          type: Number,
          default: 1
        }
      },
      data () {
        return {
          injectTimeK: null
        }
      },
      watch: {
        value: {
          handler (v) {
            this.initChildActive();
          },
          deep: true
        }
      },
      created () {
        this.init();
      },
      mounted () {
        this.initChildActive();
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
          childsList && childsList.map(vm => {
            vm.$emit( 'form:farther:multi:active', this.value)
          });
        },
        collectChild () {
          this.$on('form:child:inject', function(e) {
            let {vm } = e;
            this.$options.childsList || (this.$options.childsList = []);
            this.$options.childsList.push(vm);
            clearTimeout(this.injectTimeK);
            this.injectTimeK = setTimeout(() => {
              this.initChildActive();
              this.injectTimeK = null;
              console.log('set..time..');
            }, 5);
          })
        },
        delChild () {
          this.$on('form:child:del', function(e) {
            let {vm} = e;
            let {childsList} = this.$options;
            let {value} = this;
            let kArray = [...value];
            let index = childsList.findIndex(item => item === vm);
            let kIndex = kArray.findIndex(item => item === vm.k);
            if (index > -1) {
              childsList.splice(index, 1);
            }
            if (kIndex > - 1) {
                kArray.splice(kIndex, 1);
                this.$emit('input', kArray);
            }
          })
        },
        captureChildSelect () {
          this.$on('form:child:select', (e) => {
            const {flag, uuid, vm} = e;
            const {min, max, $options: {childsList}} = this;
            const activeChild = childsList.filter(item => {
              return item.isActive
            });
            // 激活状态
            const lg = activeChild.length;
            console.log(lg, max, min, flag);
            if (!flag) {
              if (lg < max) {
                vm.$emit('form:farther:multi:select', {});
              }
            } else {
              if (lg > min) {
                vm.$emit('form:farther:multi:select', {});
              }            }
          });
          this.$on('form:child:changeValue', (e) => {
            let {flag, key} = e;
            let kArray = [...this.value];
            // 加入
            let index = kArray.findIndex(k => k === key);
            if (flag) {
              if (index === -1 ) {
                kArray.push(key);
                this.$emit('input', kArray);
              }
            } else {
              if (index > -1) {
                kArray.splice(index, 1);
              }
              this.$emit('input', kArray);
            }
          })
        }
      }
    }
</script>
<style>

</style>
