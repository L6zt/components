<template>
    <div class="container table-page-container">
        <table>
            <tr>
                <th style="width: 25%">.....</th>
                <th style="width: 25%">letter</th>
                <th style="width: 25%">word</th>
                <th style="width: 25%">code</th>
            </tr>
            <tbody>
                <tr>
                    <td>1</td>
                    <td colspan="2">a</td>
                    <td>var a = 1;</td>
                </tr>
                <tr>
                    <td rowspan="2" style="vertical-align: middle">合并</td>
                    <td>d</td>
                    <td>空间</td>
                    <td>var c = 1;</td>
                </tr>
                <tr>
                    <td>b</td>
                    <td>空间</td>
                    <td>() => {};</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>c</td>
                    <td>我爱犹怜</td>
                    <td>new Promise();</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import slotTest from '../packages/slotTest/index.vue'
    export default {
      components: {
        slotTest
      },
      data () {
        return {
          list: [1, 2, 3]
        }
      }
    }
</script>
<style lang="scss">
    .table-page-container {
        padding-top: 20px;
    }
    table {
        position: relative;
        width: 100%;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        tr {
            border-bottom: 1px solid #ccc;
            th, td {
                border-right: 1px solid #ccc;
            }
        }
        th, td {
            text-align: center;
            padding: 10px 0 ;
            font-size: 14px;
        }
        tbody tr {
            &:hover {
                background: #409eff;
                color: #fff;
                cursor: pointer;
            }
        }

    }
</style>
