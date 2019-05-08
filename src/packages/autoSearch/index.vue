c<template>
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
          default: []
        },
        cb: {
          type: Function,
          require: true
        }
      },
      data () {
        return {
          input: '',
          searchList: this.inList || [],
          curKey: null,
          isShow: false
        }
      },
      watch: {
        value (val) {
          this.input = val;
        },
        input (val) {
          this.showGetSearchList();
        }
      },
      created () {
        console.log(this)
      },
      methods: {
        showGetSearchList  () {
          const {asyncFn} = this;
          const {input: val} = this;
          if (asyncFn) {
            asyncFn().then(data => {
              this.searchList = data;
              this.handleSyncStatus()
            }).catch(e => {
              this.searchList = [];
            });
          } else {
            this.handleSyncStatus(val);
          }
        },
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
          this.isShow = true;
          this.showGetSearchList();
        },
        handleBlur ($event) {
         if(this.isShow) {
           this.isShow = false;
           //this.$emit('input', '');
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
            font-size: 12px;
            border-bottom: 1px solid #dcdcdc;
            padding: 8px 5px;
            cursor: pointer;
            &:nth-last-child{
                border: 0;
            }
        }
        .jc-auto-search-result {
            position: absolute;
            width: 100%;
            top: 30px;
            left: 0;
            border: 1px solid #dcdcdc;
        }
    }
</style>
