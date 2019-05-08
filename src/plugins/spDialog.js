import jcMask from '../packages/mask/index.vue';
let dialogAy = [];
const spDialog = {}
let uuid = 0;
let $el = null;
let index = 999;
const global = window;
const doc = global.document;
const root = doc.body;
const createUnique = () => {
  return  Math.random().toString(36).substr(2);
};
spDialog.install = (Vue, options) => {
  Vue.prototype.$spDialog = (rootComponent , options) => {
    const { css = {} , rootComponentProps } = options
    let warpElem = doc.createElement ( 'div' );
    let $el = null;
    let uniqueK = createUnique ();
    const vm = new Vue ( {
      data () {
        return {}
      } ,
      components : {
        jcMask ,
        rootComponent : rootComponent
      } ,
      render (h) {
        const rootNode = h ( 'div' , {} , [
          h ( 'jc-mask' , {
            props : {
              css
            }
          } , [
            h ( 'root-Component' , {
              props : rootComponentProps
            } )
          ] )
        ] );
        return rootNode
      }
    } );
    root.append ( warpElem );
    vm.$mount ( warpElem );
    dialogAy.push ( vm )
  };
  Vue.prototype.$spDialog.close = function () {
    const topVm = dialogAy.pop();
    if (topVm) {
      topVm.$destroy();
      root.removeChild(topVm.$el);
    }
  }
};
export default spDialog
