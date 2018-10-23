<template>
    <div class="jc-auto-search-comp">
        <div class="jc-auto-search_input-box">
            <input type="text" v-model="value">
        </div>
    </div>
</template>
<script>
    export default {
      props: {
        value: {
          type: String
        }
      },
      data () {
        return {

        }
      },
      computed () {

      },
      created () {
        console.log(this)
      },
      methods: {

      }
    }
</script>
