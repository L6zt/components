import confirm from "../packages/confirm/index.vue"
let dialogAy = [];
let uuid = 0;
let dialog = {};
dialog.install = (Vue, options) => {
  Vue.prototype.$confirm = ({type = "warn", title = '', msg = '', html = false, goCb, cancelCb = () => {}}) => {
    let warpElem = window.document.createElement('div');
    let $el = null;
    const root = window.document.body;
    console.log(goCb, 'goCb');
    const vm = new Vue({
      components: {
        confirm
      },
      render(h) {
        return h('confirm', {
          props: {
            goCb,
            cancelCb,
            html,
            msg,
            type,
            title
          }
        })
      }
    });
    root.append(warpElem);
    vm.$mount(warpElem);
    $el = vm.$el;
  }
};
export default dialog
