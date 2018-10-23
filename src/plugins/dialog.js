import confirm from '../packages/confirm/index.vue';
import jcDialog from '../packages/dialog/index.vue';
let dialogAy = [];
let uuid = 0;
let $el = null;
let dialog = {};
let index = 999;
const global = window;
const doc = global.document;
const createUnique = () => {
  return  Math.random().toString(36).substr(2);
}
dialog.install = (Vue, options) => {
  Vue.prototype.$confirm = ({type = "warn", title = '', msg = '', html = false, goCb, cancelCb = () => {}}) => {
    let warpElem = doc.createElement('div');
    let $el = null;
    let uniqueK = createUnique();
    const root = doc.body;
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
            title,
            index: (++index),
            uniqueK,
            close: function () {
              vm.$destroy();
              dialog[uniqueK] = null;
              delete  dialog[uniqueK];
              root.removeChild($el);
              $el = null;
            }
          }
        })
      }
    });
    root.append(warpElem);
    vm.$mount(warpElem);
    $el = vm.$el;
    dialog[uniqueK] = $el;
  }
  Vue.prototype.$dialog = ({html, modalClose = false}) => {
    let warpElem = doc.createElement('div');
    let $el = null;
    let uniqueK = createUnique();
    const root = doc.body;
    const vm = new Vue({
      components: {
        jcDialog
      },
      render(h) {
        return h('jc-dialog', {
          props: {
            html,
            uniqueK,
            index: (++index),
            close: function () {
              vm.$destroy();
              dialog[uniqueK] = null;
              delete  dialog[uniqueK];
              root.removeChild($el);
              $el = null;
            }
          }
        })
      }
    });
    root.append(warpElem);
    vm.$mount(warpElem);
    $el = vm.$el;
    dialog[uniqueK] = $el;
  }
};
export default dialog
