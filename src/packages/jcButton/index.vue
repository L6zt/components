<template>
    <button :class="className"
            @click="insertClick"
            :disabled="disabled"
    >
        <i v-show="isLoading"></i>
        <slot></slot>
    </button>
</template>
<script>
  export default {
    props : {
      isLoading : {
        type : Boolean ,
        default : false
      } ,
      clickFn : {
        type : Function ,
        default : function() {
        }
      },
      isActive: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'primary'
      },
      size: {
        type: String,
        default: 'small'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    } ,
    computed : {
      className () {
        const {disabled, type, isActive, isLoading, size} = this;
        let className = 'jc-button';
        switch ( size ) {
          case 'media' : {
            className += ` ${size}-btn`;
            break;
          }
          case 'big' : {
            className += ` ${size}-btn`;
            break;
          }
          case 'small' : {
            className += ` ${size}-btn`;
            break;
          }
          default : {
            className += ` normal-btn`
          }
        }
        if (!disabled) {
          // 按钮分类
          switch ( type ) {
            case 'success' : {
              className += ` ${type}-btn`;
              break;
            }
            case 'error' : {
              className += ` ${type}-btn`;
              break;
            }
            case 'base' : {
              className += ` ${type}-btn`;
              break;
            }
            default : {
              className += ` primary-btn`;
              break;
            }
          }
          // 按钮大小
          // 是否激活
          isActive && (className += ` active`);
          // 是否加载中
          isLoading && (className += ` is-loading`)
        } else {
          className += ' disabled-btn'
        }
        return className
      }
    } ,
    mounted () {
      console.log(this.clickFn)
    },
    methods : {
      insertClick (e) {
        const { isLoading , clickFn } = this;
        if ( !isLoading ) {
          clickFn ( {
            _this : this ,
            e
          } );
        }
      }
    }
  };
</script>
<style lang="scss">
    /*disabled*/
    $btn-disabled-bg: #ccc;
    $btn-disabled-color: #ddd;
    /*default*/
    $btn-default-bg:  #fff;
    $btn-default-border-color:  #dcdfe6;
    $btn-default-bg-active: #c6e2ff;
    $btn-default-color-active:  #409eff;
    $btn-default-border-color-active:  #409eff;
    /*base*/
    $btn-base-bg: #409eff;
    $btn-base-color: #fff;
    $btn-base-border-color: #409eff;
    $btn-base-bg-active: #66b1ff;
    @mixin smallSize () {
        font-size: 12px;
        padding: 5px 15px;
    }
    @mixin normalSize () {
        font-size: 14px;
        padding: 10px 20px;
    }
    @mixin media () {
        font-size: 16px;
        padding: 12px 25px;
    }
    @mixin defaultActive () {
        border-color: $btn-default-border-color-active ;
        background-color: $btn-default-bg-active;
        color: $btn-default-border-color-active;
    }
    @mixin baseActive () {
        background-color: $btn-base-bg-active;
    }
    .jc-button {
        transition: all ease-in-out 300ms;
        &.disabled-btn {
            cursor: not-allowed;
            background-color: $btn-disabled-bg;
            color: $btn-disabled-color;
        }
        &.small-btn {
            @include smallSize();
        }
        &.normal-btn {
            @include normalSize();
        }
        &.media-btn {
            @include  media()
        }
    }
    .jc-button.primary-btn {
        border: 1px solid $btn-default-border-color;
        &.active, &:hover {
            @include  defaultActive();
        }
    }
    .jc-button.base-btn {
        border: 1px solid $btn-base-border-color;
        color: #fff;
        background-color: $btn-base-bg;
        &.active, &:hover {
            @include  baseActive();
        }
    }
</style>
