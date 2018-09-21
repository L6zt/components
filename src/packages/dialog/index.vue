<script>
    import modal from '../modal/index.vue';
    export default {
      name: 'jc-dialog',
      data () {
        return {
          count: 1
        }
      },
      props: {
        html: {
          type: Function,
          default: function () {
            return null
          }
        },
        close: {
          type: Function
        }
      },
      methods: {
        dialogClose () {
          (this.count--) || this.close();
        }
      },
      components: {
        modal
      },
      render (h) {
        const {close, html, index} = this;
        return h('modal', {
          class: 'dialog-container',
          style: {
            'zIndex': index
          },
          directives: [
            {
              name: 'click-out',
              expression: 'dialogClose',
            }
          ],
        }, [
          h('section', {
            class: 'dialog-content'
          }, html(h, close))
        ])
      }
    }
</script>
<style>
    .dialog-content {
        position: absolute;
        left: 50%;
        top: 50%;
        padding: 10px;
        transform: translate(-50%, -50%);
        background: #fff;
        box-shadow: 0 0 3px #333;
    }
</style>
