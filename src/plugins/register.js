  import jcCol from '../components/col/index.vue';
  import jcRow from '../components/row/index.vue';
  const registerComp = {};
  const comps = [
    jcCol,
    jcRow
  ];
  registerComp.install = (Vue) => {
    comps.forEach(cmp => {
      Vue.component(cmp.name, cmp);
    })
  };
  export default registerComp
