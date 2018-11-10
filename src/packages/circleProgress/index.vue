<template>
    <div class="circle-progress-comp">
        <canvas
                ref="canvas"
                :width="width"
                :height="width"
        >

        </canvas>
    </div>
</template>
<script>
    export default {
      _canvas: null,
      props: {
        width: {
          type: [Number],
          default: 100
        },
        cw: {
          type: [Number],
          default: 5
        }
      },
      mounted () {
        const {canvas} = this.$refs;
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this.draw();
      },
      methods: {
        draw (percent) {
          const {_ctx, width, cw} = this;
          const centerLc = width / 2;
          const startRotate = 0;
          const endRotate = Math.PI;
          const dvRotate = startRotate - endRotate;
          const midR = centerLc -  cw;
          _ctx.translate(centerLc, centerLc);
          _ctx.arc(0, 0, centerLc - cw, startRotate , endRotate, false);
          _ctx.stroke();
          _ctx.lineWidth = cw;
          _ctx.save();
          _ctx.translate(midR * - Math.cos(-dvRotate), midR * Math.sin(-dvRotate));
          _ctx.rotate(endRotate);
          _ctx.moveTo(0 , 0);
          _ctx.arc(0, 0, cw / 4, 0 , Math.PI, false);
          _ctx.stroke();
        }
      }
    }
</script>
<style lang="scss">

</style>
