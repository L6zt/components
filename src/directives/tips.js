import { on , off , once, contains, elemOffset, position, addClass, removeClass } from '../utils/dom';
import Vue from 'vue'
const global = window;
const doc = global.document;
const top = 15;
export default {
  name : 'jc-tips' ,
  bind (el , binding , vnode) {
    Vue.nextTick(() => {
      const { context } = vnode;
      const { expression } = binding;
      const fWarpElm = doc.createElement('div');
      const handleFn = binding.expression && context[expression] || (() => '');
      const createElm = handleFn();
      fWarpElm.className = 'hide jc-tips-warp';
      fWarpElm.appendChild(createElm);
      doc.body.appendChild(fWarpElm);
      el._tipElm = fWarpElm;
      el._createElm = createElm;
      el._tip_hover_fn = function(e) {
        // 删除节点函数
          removeClass(fWarpElm, 'hide');
          fWarpElm.style.opacity = 0;
          setTimeout(() => {
            const offset = elemOffset(fWarpElm);
            const location = position(el);
            fWarpElm.style.cssText =  `left: ${location.left  - offset.width / 2}px; top: ${location.top - top - offset.height}px;`;
            fWarpElm.style.opacity = 1;
          }, 16);
      };
      const handleLeave = function (e) {
        fWarpElm.style.opacity = 0;
        once({
          el,
          type: 'transitionEnd',
          fn: function() {
            console.log('hide');
            addClass(fWarpElm, 'hide');
          }
        })
      };
      el._tip_leave_fn =  handleLeave;
      el._tip_mouse_up_fn = function (e) {
        const target = e.target;
        if (!contains(fWarpElm, target) && el !== target) {
          handleLeave(e)
        }
      };
      on({
        el,
        type: 'mouseenter',
        fn: el._tip_hover_fn
      });
      on({
        el,
        type: 'mouseleave',
        fn: el._tip_leave_fn
      });
      on({
        el: doc.body,
        type: 'mouseup',
        fn: el._tip_mouse_up_fn
      })
    });
  } ,
  componentUpdated(el , binding , vnode) {
    const { context } = vnode;
    const { expression } = binding;
    const handleFn = expression && context[expression] || (() => '');
    Vue.nextTick( () => {
      const createNode = handleFn();
      const fWarpElm = el._tipElm;
      if (fWarpElm) {
        fWarpElm.replaceChild(createNode, el._createElm);
        el._createElm = createNode;
        const offset = elemOffset(fWarpElm);
        const location = position(el);
        fWarpElm.style.cssText =  `left: ${location.left  - offset.width / 2}px; top: ${location.top - top - offset.height}px;`;
      }
    })
  },
  unbind (el , bind , vnode) {
    const body = doc.body;
    off({
      el: dov.body,
      type: 'mouseup',
      fn: el._tip_mouse_up_fn
    });
    body.removeChild(el._tipElm);
    el._tipElm = null;
    el._createElm = null;
    el = null;
  }
}
