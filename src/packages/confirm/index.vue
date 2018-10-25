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
        },
        uniqueK: {
          type: String
        },
        index: {
          type: [String, Number]
        },
        close: {
          type: Function
        }
      },
      data () {
        return {
          isActive: false
        }
      },
      components: {
        modal,
        jcButton
      },
      mounted () {
        this.$nextTick(() => {
          this.isActive = true;
        })
      },
      render (h) {
        const {msg, html, title, goCb, cancelCb, index, close, isActive} = this;
        console.log('h');
        return h('modal', {
          class: 'confirm-dialog-container',
          style: {
            'zIndex': index
          }
        }, [
          h('section', { class: !isActive ? 'confirm-msg-tip trans-start' : 'confirm-msg-tip is-active'},  [
            h('h3', {class: 'confirm-title'}, title),
            h('div', {class: 'confirm-msg'}, html ? html(h) : msg),
            h('section', {
              class: 'jc-confirm-btn-box clear-fix'
            }, [
              h('jc-button', {
                props: {
                  type: 'base',
                  size: 'small',
                  clickFn: () => {
                    if (goCb(close)) {
                      close();
                    }
                   }
                }
              }, ['确定']),
              h('jc-button', {
                props: {
                  size: 'small',
                  clickFn: () => {
                    if (cancelCb(close)) {
                      close();
                    }
                  }
                }
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
            transform: translate(-50%, -50%) scale3d(0, 0, 1);
            background: #fff;
            border-radius: 5px;
            transition: all ease 500ms;
            &.trans-start {
                opacity: 0;
            }
            &.is-active {
                transform: translate(-50%, -50%) scale3d(1, 1, 1);
            }
            .confirm-title {
                font-size: 10px;
                text-align: center;
                word-break: break-all;
                font-weight: normal;
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
            }
            .confirm-msg {
                font-size: 14px;
                padding: 20px 20px;
                line-height: 1.5;
            }
            .jc-confirm-btn-box {
                padding-bottom: 20px;
                &>button {
                    float: right;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
