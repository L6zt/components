<template>
    <div class="pagination-container container">
        <jc-row>
            <jc-col
                    :padding="10"
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
                    :padding="10"
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
                    :padding="10"
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
<style lang="scss">
    .pagination-con-box {
        position: relative;
        width: 100%;
        height: 200px;
        display: table;
        box-shadow: 1px 1px 1px #bdacac , -1px -1px 1px #bdacac;
        margin-top: 10px;
        & > div {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
    }
</style>
