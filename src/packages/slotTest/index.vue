<script>
    export default {
      name: 'jc-slot-test',
      render (h) {
        window._sp_slots || (window._sp_slots = this.$slots);
        console.log(this.$parent.$options.name);
        return h('div', {

         }, [
           this.$slots.handle,
           this.$slots.base,
          this.$slots.comp
         ])
      }
    }
</script>
