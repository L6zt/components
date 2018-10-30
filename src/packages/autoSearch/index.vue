<template>
    <div class="jc-auto-search-comp">
        <div class="jc-auto-search_input-box">
            <input type="text" v-model="input">
        </div>
    </div>
</template>
<script>
    export default {
      props: {
        value: {
          type: String
        },
        asyncFn: {
          type: [Function, Boolean],
          default: false
        },
        inList: {
          type: [Function, Boolean],
          default: false
        }
      },
      data () {
        return {
          input: {},
          searchList: [],
          curKey: null
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
          if(!!val) {
            this.searchList =  inList;
          } else {
            this.searchList = inList.filter((item) => {
              return item.indexOf(val)
            })
          }
        }
      }
    }
</script>
