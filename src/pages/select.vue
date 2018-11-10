<template>
    <div class="select-page-container container">
        <jc-row>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <section class="select-kind-box">
                    <jc-select
                            :items="baseSelect.items"
                            :k="baseSelect.key"
                            @selectEvent="captureBase($event)"
                    >
                    </jc-select>
                </section>
            </jc-col>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <section class="select-kind-box">
                    <jc-select
                            :items="disabledSelect.items"
                            :k="disabledSelect.key"
                            :disabled="disabledSelect.disabled"
                            :defaultTip="disabledSelect.tip"
                            @slectEvent="captureDisabled($event)"
                    >

                    </jc-select>
                </section>
            </jc-col>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <section class="select-kind-box">
                    <jc-out-select
                            :items="outSelect.items"
                            :k="outSelect.key"
                            @selectEvent="captureOut($event)"
                    >
                    </jc-out-select>
                </section>
            </jc-col>
        </jc-row>
        <jc-row>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <jc-auto-search
                        v-model="searchValue"
                        :inList="searchList"
                        :cb="searchCb"
                >
                </jc-auto-search>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    import jcSelect from '../packages/select/index.vue';
    import jcOutSelect from '../packages/outSelect/index.vue';
    import jcAutoSearch from '../packages/autoSearch/index.vue'
    export default {
      data () {
        return {
          commonPadding: 10,
          baseSelect: {
            key: null,
            items: [{
              key: 0,
              v: '第一选项'
            }, {
              key: 1,
              v: '第二选项'
            }, {
              key: 2,
              v: '第二选项'
            }, {
              key: 3,
              v: '第四选项'
            },{
              key: 4,
              v: '第四选项'
            }, {
              key: 5,
              v: '第五选项'
            },{
              key: 6,
              v: '第六选项'
            }, {
              key: 7,
              v: '第七选项'
            }]
          },
          disabledSelect: {
            key: null,
            disabled: true,
            tip: '翻谁呢？',
            items:[{
              key: 0,
              v: '小姐姐'
            }, {
              key: 1,
              v: '小哥哥'
            }]
          },
          outSelect: {
            key: null,
            items: [{
              key: 0,
              v: '第一选项'
            }, {
              key: 1,
              v: '第二选项'
            }, {
              key: 2,
              v: '第二选项'
            }, {
              key: 3,
              v: '第四选项'
            },{
              key: 4,
              v: '第四选项'
            }, {
              key: 5,
              v: '第五选项'
            },{
              key: 6,
              v: '第六选项'
            }, {
              key: 7,
              v: '第七选项'
            }]
          },
          searchValue: '',
          searchList: [
            {value: '我是谁', k: 1},
            {value: '..重工', k: 2},
            {value: '时间函数',k:3}
          ]
        }
      },
      methods: {
        captureBase(e) {
          this.baseSelect.key = e.key;
        },
        captureDisabled(e) {
          console.log(e)
        },
        captureOut(e) {
          this.outSelect.key = e.key;
        },
        searchCb (key) {
          console.log(key)
        }
      },
      components: {
        jcSelect, jcOutSelect, jcAutoSearch
      }
    }
</script>
<style lang="scss">
    /* overflow 会隐藏超出的元素*/
    .select-page-container {
        .select-kind-box {
            position: relative;
            padding-left: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }

</style>
