<template>
    <div class="container">
        <section class="radio-kind-section">
            <jc-radio
                    v-for="item, index in singleRadio.items"
                    v-model="singleRadio.key"
                    :k="item.k"
                    :label="item.label"
                    :disabled="item.disabled"
                    :key="item.k"
            ></jc-radio>
        </section>
        <section class="radio-kind-section">
            <jc-multi-radio
                    v-model="multiRadio.keys"
                    :max="3"

            >
                <jc-radio
                        v-for="item, index in multiRadio.items"
                        :k="item.k"
                        :label="item.label"
                        :disabled="item.disabled"
                        :key="item.k"
                >
                </jc-radio>
            </jc-multi-radio>

        </section>
    </div>
</template>
<script>
  import jcRadio from '../packages/radio/index.vue';
  import jcMultiRadio from  '../packages/multiRadio/index.vue'
  export default {
    data () {
      return {
        singleRadio : {
          key: '',
          items : [
            {
              k : 0 ,
              label : '第一',
              disabled: true
            } , {
              k : 1 ,
              label : '第二'
            } , {
              k : 2 ,
              label : '第三'
            }
          ]
        },
        multiRadio: {
          keys: [0, 1],
          items : [
            {
              k : 0 ,
              label : '第一',
              disabled: true
            } , {
              k : 1 ,
              label : '第二'
            } , {
              k : 2 ,
              label : '第三'
            }
          ]
        }
      }
    } ,
    watch: {
      'multiRadio.keys' (value) {
        console.log(value);
      }
    },
    components : {
      jcRadio,
      jcMultiRadio
    }
  };
</script>
<style lang="scss">
    /* overflow 会隐藏超出的元素*/
    .radio-kind-section {
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 10px;
        overflow: hidden;
    }
</style>
