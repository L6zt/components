<template>
    <div class="select-page-container container">
        <section class="select-kind-box">
            <jc-select
                    :items="baseSelect.items"
                    :k="baseSelect.key"
                    @selectEvent="captureBase($event)"
            >
            </jc-select>
        </section>
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
        <section class="select-kind-box">
            <jc-out-select
                    :items="outSelect.items"
                    :k="outSelect.key"
                    @selectEvent="captureOut($event)"
            >
            </jc-out-select>
        </section>
    </div>
</template>
<script>
    import jcSelect from '../packages/select/index.vue';
    import jcOutSelect from '../packages/outSelect/index.vue';
    export default {
      data () {
        return {
          baseSelect: {
            key: null,
            items: [{
              key: 0,
              v: '第一选项'
            }, {
              key: 1,
              v: '第二选项'
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
            }]
          }
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
        }
      },
      components: {
        jcSelect, jcOutSelect
      }
    }
</script>
<style>
    /* overflow 会隐藏超出的元素*/
    .select-kind-box {
        position: relative;
        padding-left: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>
