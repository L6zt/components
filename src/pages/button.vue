<template>
    <div class="container">
        <section>{{count}}</section>
        <jc-button
                :clickFn="captureClick"
        >
            点击
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
      mounted () {
        this.$confirm({
          title: '我来做测试啦',
          msg: '你确定吗，哈哈。',
          goCb: () => {
            console.log('success')
          }
        })
      },
      methods: {
        captureClick (ctx) {
          this.count ++;
        },
        captureOut () {
          console.log('out')
        }
      }
    }
</script>
