<template>
 <div class="pagination-comp">
     <a
        class="pagination-item"
        v-for="item, index in list"
        :class="value === item.key ? 'active' : ''"
        @click="handleClick(item.key)"
        :key="index"
        href="#"
     >
         {{item.value}}
     </a>
 </div>
</template>

<script>
  // 【1...234...5】
  export default {
    name : "jc-pagination" ,
    props : {
      value : {
        type : Number ,
        default : 0
      } ,
      allPage : {
        type : Number ,
        required : true
      } ,
      spacePage : {
        type : Number ,
        required : true
      } ,
      clickCb : {
        type : Function ,
        required : false
      }
    } ,
    watch : {
      value : {
        immediate : true ,
        handler () {
          this.handleCurChange ();
        }
      } ,
      allPage : {
        immediate : true ,
        handler () {
          this.handleCurChange ();
        }
      }
    } ,
    data () {
      return {
        list : []
      };
    } ,
    methods : {
      handleClick (key) {
        let {value, allPage} = this;
        switch ( key ) {
          case '-1': {
            this.$emit('input', value - 1 <= 0 ? 1 : value - 1);
            break;
          }
          case '+1': {
            this.$emit('input', value + 1 >= allPage ? allPage : value + 1);
            break;
          }
          case '...': {
            break;
          }
          default: {
            this.$emit('input', parseInt(key));
          }
        }
      } ,
      handleCurChange () {
        let { value: curPage , allPage , spacePage } = this;
        let list = [];
        if ( allPage < spacePage ) {
          allPage = spacePage;
        }
        ;
        if ( curPage > allPage ) {
          curPage = allPage;
        }
        ;
        if ( curPage < 1 ) {
          curPage = 1;
        }
        ;
        if ( curPage < spacePage ) {
          list.push ( {
            key : '-1' ,
            value : '上一页'
          } );
          for ( let i = 1 ; i <= spacePage ; i++ ) {
            list.push ( {
              key : i ,
              value : i
            } );
          }
          ;
          if ( spacePage !== allPage ) {
            list.push ( {
              key: '...',
              value: '...'
            },{
              key : allPage ,
              value : allPage
            } );
          }
          ;
          list.push ( {
            key : '+1' ,
            value : '下一页'
          } );
        }
        ;
        if ( curPage >= spacePage && curPage <= (allPage - spacePage + 1)) {
          let its = ( spacePage - 1 ) / 2;
          let startIndex = curPage - its;
          let endIndex = curPage + its;
          list.push ( {
            key : '-1' ,
            value : '上一页'
          } , {
            key : 1 ,
            value : 1
          } , {
            key : '...' ,
            value : '...'
          } );
          for ( let i = startIndex ; i <= endIndex ; i++ ) {
            list.push ( {
              key : i ,
              value : i
            } );
          }
          ;
          list.push ( {
              key : '...' ,
              value : '...'
            } ,
            {
              key : allPage ,
              value : allPage
            } , {
              key : '+1' ,
              value : '下一页'
            } );
        }
        ;
        if ( curPage >= spacePage && curPage > (allPage - spacePage + 1)) {
          list.push({
            key: '-1',
            value: '上一页'
          }, {
            key: 1,
            value: 1
          }, {
            key: '...',
            value: '....'
          });
          for (let i = allPage - spacePage + 1; i <= allPage; i++) {
            list.push({
              key: i,
              value: i
            })
          };
          list.push({
            key: '+1',
            value: '下一页'
          })
        }
        this.list = list;
      }
    }
  };
</script>

<style lang="scss">
 .pagination-comp {
     .pagination-item {
         display: inline-block;
         padding: 5px 10px;
         text-align: center;
         color: #333;
         font-size: 12px;
         border: 1px solid #ccc;
         margin-right: 10px;
         &.active {
             background: #409eff;
             color: #fff;
             border-color: #409eff;
         }
     }
 }
</style>
