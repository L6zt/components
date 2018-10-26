<template>
    <div class="pagination-container container">
        <jc-row>
            <jc-col
                    :commonPadding="10"
                    :colNum="6"
            >
                <section class="pagination-con-box">
                    <jc-pagination
                            v-model="pageA"
                            :allPage="12"
                            :spacePage="3"
                    >
                    </jc-pagination>
                </section>
            </jc-col>
            <jc-col
                    :commonPadding="10"
                    :colNum="6"
            >
                <section class="pagination-con-box">
                    <jc-pagination
                            v-model="pageB"
                            :allPage="3"
                            :spacePage="3"
                    >
                    </jc-pagination>
                </section>
            </jc-col>
            <jc-col
                    :commonPadding="10"
                    :colNum="6"
            >
                <section class="pagination-con-box">
                    <jc-pagination
                            v-model="pageC"
                            :allPage="12"
                            :spacePage="5"
                    >
                    </jc-pagination>
                </section>
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    import jcPagination from '../packages/pagination/index.vue'
    export  default {
      data () {
        return {
          pageA: 1,
          pageB: 1,
          pageC: 5
        }
      },
      components: {
        jcPagination
      }
    }
</script>
<style>
    .pagination-con-box {
        padding: 10px 0;
    }
</style>
