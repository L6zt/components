<template>
<div class="hello-container">
  <div>
    <h3>{{title}}</h3>
    <p><span>ajax</span>{{ asyncText }}</p>
    <button @click="getAjax" class="btn">调用接口</button>
    <button @click="reset" class="btn">重置</button>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import jcButton from '../packages/jcButton/index.vue'
const ajaxInitTip = '...pending'
export default {
  data() {
    return {
      title: 'hello world',
      asyncText: ajaxInitTip
    }
  },
  methods: {
    getAjax() {
      return axios.get('https://api.myjson.com/bins/nxz4y').then(res => {
        const { data } = res;
        this.asyncText = data
      })
    },
    reset () {
      this.asyncText = ajaxInitTip
    }
  },
  components: {
    jcButton
  }

}
</script>

<style lang="scss">
.hello-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  .btn {
    border: 1px solid #ccc;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
  }
}
</style>
