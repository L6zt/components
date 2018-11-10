<template>
    <div class="jc-auto-search-comp" v-click-out="handleBlur">
        <div class="jc-auto-search_input-box">
            <input type="text" v-model="input" @focus="handleFocus">
        </div>
        <div class="jc-auto-search-result" v-if="isShow">
            <ul>
                <li
                    v-for="item, index in searchList"
                    @click="handleClick($event, index)"
                    class="auto-search-items"
                >
                    {{searchList[index].value}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'jc-auto-search',
      props: {
        value: {
          type: String
        },
        asyncFn: {
          type: [Function, Boolean],
          default: false
        },
        inList: {
          type: [Array],
          default: false
        },
        cb: {
          type: Function,
          require: true
        }
      },
      data () {
        return {
          input: '',
          searchList: [],
          curKey: null,
          isShow: false
        }
      },
      watch: {
        value (val) {
          this.input = val;
        },
        input (val) {
          const {asyncFn} = this;
          if (asyncFn) {
            asyncFn().then(data => {
              this.searchList = data;
              this.curKey = null;
              this.$emit('change:key', null);
            }).catch(e => {
              this.searchList = [];
              this.curKey = null;
              this.$emit('change:key', null);
            });
          } else {
            this.$emit('change:key', null);

            this.handleSyncStatus(val);
          }
        }
      },
      created () {
        console.log(this)
      },
      methods: {
        handleSyncStatus (val) {
          const {inList} = this;
          // val === ''
          if(!val) {
            this.searchList =  inList;
          } else {
            this.searchList = inList.filter((item) => {
              return item.value.indexOf(val) !== -1
            })
          }
        },
        handleFocus () {
          let val = this.input;
          this.isShow = true;
          this.handleSyncStatus(val);
        },
        handleBlur ($event) {
         if(this.isShow) {
           this.isShow = false;
           this.$emit('input', '');
         }
        },
        handleClick(e, index) {
          e.stopPropagation();
          let  {searchList} = this;
          let item = searchList[index];
          this.isShow = false;
          this.$emit('input', item.value);
          this.cb(item)
        }
      }
    }
</script>
<style lang="scss">
    .jc-auto-search-comp {
        position: relative;
        display: inline-block;
        .jc-auto-search_input-box {
            position: relative;
        }
        .auto-search-items {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            border-bottom: 1px solid #333;
        }
        .jc-auto-search-result {
            position: absolute;
            width: 100%;
            top: 30px;
            left: 0;
        }
    }
</style>
