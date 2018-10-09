<template>
    <div class="container button-page-container">
        <section>{{count}}</section>
        <jc-button
                :clickFn="captureClick"
        >
            confirm
        </jc-button>
        <jc-button
                :clickFn="captureClickT"
        >
            dialog
        </jc-button>
        <jc-button
                :disabled="true"
                :clickFn="captureClick"
        >
            禁止
        </jc-button>
        <jc-button
                :clickFn="captureClick"
                type="base"
        >
            基础蓝
        </jc-button>
    </div>
</template>
<script>
  import jcButton from '../packages/jcButton/index.vue'
  export default {
    data: function () {
      return {
        count: 0
      }
    },
    components: {
      jcButton
    },
    methods: {
      captureClick (ctx) {
        this.count ++;
        this.$confirm({
          title: '我来做测试啦!',
          msg: '你确定吗，哈哈。',
          goCb (close) {
            console.log('success');
            return true
          },
          cancelCb (close) {
            console.log('cancel');
            return true
          }
        })
      },
      captureClickT () {
        let that = this;
        this.$dialog({
          html (h, close) {
            return [
              h ('h3', {
                class: 'auto-dialog-title',
              }, [
                `我在做测试`,
              ]),
              h('section', {
                class: 'auto-dialog-con',
              }, [
                h('div', {}, '其实我想变得更加强大!'),
                h('p', {on: {
                    click () {
                      that.count ++
                    }
                  }}, `点点我!看看数据回不会变,${that.count}`)
              ])
            ]
          }
        });
      },
      captureOut () {
        console.log('out')
      }
    }
  }
</script>
<style>
    .button-page-container {

    }
    .auto-dialog-title {
        position: relative;
        font-size: 14px;
        font-weight: normal;
        padding-bottom: 10px;
        text-align: center;
        border-bottom: 1px dashed #ccc;
    }
    .auto-dialog-con {
        line-height: 1.5;
        font-size: 12px;
    }
</style>
