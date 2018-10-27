<template>
    <div class="switch-container container">
        <jc-row>
            <jc-col
                    :colNum="3"
                    :padding="commonPadding"
            >
                <section class="switch-box-section">
                    <jc-switch
                            v-model="isOnA"
                    >
                    </jc-switch>
                    <jc-switch
                            v-model="isOnB"
                            type="access"
                    >
                    </jc-switch>
                    <jc-switch
                            v-model="isOnC"
                            type="warn"
                    >
                    </jc-switch>
                </section>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    import jcSwitch from '../packages/switch/index.vue';
    export default {
      data () {
        return {
          commonPadding: 10,
          isOnA: true,
          isOnB: false,
          isOnC: true,
        }
      },
      components: {
        jcSwitch
      }
    }
</script>
<style lang="scss">
    .switch-container {
        .switch-box-section {
            padding: 10px 0;
        }
    }
</style>
