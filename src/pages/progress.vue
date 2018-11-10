<template>
    <div class="progress-container container">
        <jc-row>
            <jc-col
                    :colNum="4"
                    :padding="commonPadding"
            >
                <circle-progress></circle-progress>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    import circleProgress from '../packages/circleProgress/index.vue'
    export default  {
      data () {
        return {
          commonPadding: 10
        }
      },
      components: {
        circleProgress
      }
    }
</script>
