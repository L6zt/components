<template>
    <div class="container ç">
        <jc-row>
            <jc-col
                    :colNum="1"
                    class="page-col-dv"
            >
                123
            </jc-col>
            <jc-col :colNum="1"
                    :offsetNum="2"
                    class="page-col-dv"
            >
                456
            </jc-col>
        </jc-row>
    </div>
</template>
<script>
    import jcCol from  '../components/col/index.vue';
    import jcRow from  '../components/row/index.vue';
    export  default  {
      components: {
	      jcRow, jcCol
      },
      beforeMount () {
      	console.log('in row-col-page')
      }
    }
</script>
<style lang="scss">
    .row-col-page {
        .page-col-dv {
            background: blue;
        }
    }
</style>
