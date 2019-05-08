<template>
    <div class="test-a">
        <label>
            <input type="text" v-model="txt">
            <i>{{txt}}</i>
        </label>
        <section>
            <jc-button
                    :clickFn="handleData"
                    type="base"
            >生成弹层</jc-button>
            <jc-button
                    :clickFn="closeDialog"
            >关闭弹层</jc-button>
        </section>
        sec
    </div>
</template>
<script>
    import {deepClone} from '../../utils/handleObj'
    import jcButton from '../../packages/jcButton/index.vue'
    export default  {
      props: {
        value: {
          required: false,
        },
        getDataCb : {
          required: true,
          type: Function
        }
      },
      data () {
        return {
          txt: this.value,

        }
      },
      components: {
        jcButton
      },
      methods: {
         handleData () {
          const {$data} = this;
          let outData = deepClone($data);
          console.log($data);
          console.log(outData);
          this.getDataCb(outData);
        },
        closeDialog () {
          this.$spDialog.close();
        }
      }
    }
</script>
<style lang="scss">
    .test-a {
        position: absolute;
        left: 50%;
        top: 50%;
        padding: 20px;
        transform: translate(-50%, -50%);
        background: #fff;
        color: #333;
        border-radius: 2px;
        box-sizing: border-box;
    }
</style>
