<template>
    <div class="container radio-page-container">
        <jc-row>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <section class="radio-section-box">
                    <jc-radio
                            v-for="item, index in singleRadio.items"
                            v-model="singleRadio.key"
                            :k="item.k"
                            :label="item.label"
                            :disabled="item.disabled"
                            :key="item.k"
                    ></jc-radio>
                </section>
            </jc-col>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <section class="radio-section-box">
                    <jc-multi-radio
                            v-model="multiRadio.keys"
                            :max="2"

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
            </jc-col>
            <jc-col :colNum="3">
                <section class="radio-section-box">
                    <jc-multi-radio
                            v-model="multiRadioMin.keys"
                            :max="multiRadioMin.max"
                            :min="multiRadioMin.min"

                    >
                        <jc-radio
                                v-for="item, index in multiRadioMin.items"
                                :k="item.k"
                                :label="item.label"
                                :disabled="item.disabled"
                                :key="item.k"
                        >
                        </jc-radio>

                    </jc-multi-radio>
                </section>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
  import jcRadio from '../packages/radio/index.vue';
  import jcMultiRadio from  '../packages/multiRadio/index.vue'
  export default {
    data () {
      return {
        commonPadding: 10,
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
        onlyClick : {
          single: '',
          items: [
            {
              k: 0,
              label: '单选1'
            },
            {
              k: 1,
              label: '单选2'
            }, {
              k: 2,
              label: '单选3'
            }
          ]
        },
        multiRadio: {
          keys: [],
          items : []
        },
        multiRadioMin: {
          min: 1,
          max: 2,
          keys: [],
          items: [
            {
              k: 0,
              label: 'node'
            }, {
                k: 1,
              label: 'c'
            }, {
            k: 2,
              label: 'go'
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
    mounted () {
      setTimeout(() => {
        Object.assign(this.multiRadio, {
          keys: [2, 1],
          items : [
            {
              k : 0 ,
              label : '第一',
            } , {
              k : 1 ,
              label : '第二'
            } , {
              k : 2 ,
              label : '第三'
            }
          ]
        })
      }, 3000)
    },
    methods: {
      change () {
        this.multiRadio.items = [
          {
            k : 2 ,
            label : '第...1',
            disabled: true
          } , {
            k : 0 ,
            label : '第...2'
          } , {
            k : 1 ,
            label : '第...3'
          }
        ]
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
    .radio-page-container {
        padding-top: 20px;
        .radio-section-box {
            box-shadow: 0 0 1px #333;
            min-height: 300px;
            padding: 10px;
        }
    }
</style>
