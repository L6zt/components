<script>
    import modal from  '../modal/index.vue'
    import jcButton from  '../jcButton/index.vue'
    export default {
      props: {
        msg: {
          type: String
        },
        html: {
          type: [Function, Boolean]
        },
        title: {
          type: String
        },
        goCb: {
          type: Function
        },
        cancelCb: {
          type: Function
        }
      },
      components: {
        modal,
        jcButton
      },
      render (h) {
        const {msg, html, title, goCb, cancelCb} = this;
        return h('modal', {
          class: 'confirm-dialog-container'
        }, [
          h('section', { class: 'confirm-msg-tip'},  [
            h('h3', {class: 'confirm-title'}, title),
            h('div', {class: 'confirm-msg'}, html ? html(h) : msg),
            h('section', {
              class: 'jc-confirm-btn-box'
            }, [
              h('jc-button', {
                props: {
                  type: 'base',
                  clickFn: goCb
                }
              }, ['确定']),
              h('jc-button', {
                cancelCb
              }, ['取消'])
            ])
          ]),
        ])
      }
    }
</script>
<style lang="scss">
    .confirm-dialog-container {
        .confirm-msg-tip {
            position: absolute;
            min-width: 300px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 5px;
            .confirm-title {
                font-size: 14px;
                text-align: center;
                word-break: break-all;
                font-weight: normal;
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
            }
            .confirm-msg {
                font-size: 16px;
                padding: 0 20px;
                line-height: 1.5;
            }
        }
    }
</style>
