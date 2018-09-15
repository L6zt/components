<template>
    <div :class="className" :style="inlinePadding">
        <slot></slot>
    </div>
</template>
<script>
	export default {
		name : 'jc-col' ,
		props : {
			colNum : {
				type : [String , Number] ,
				default : 0
			} ,
			offsetNum : {
				type : [String , Number] ,
				default : 0
			} ,
			pullNum : {
				type : [String , Number] ,
				default : 0
			} ,
			padding : {
				type : [String , Number] ,
				default : 0
			}
		} ,
		computed : {
			className () {
				let className = 'jc-col-base';
				let { colNum , offsetNum , pullNum } = this;
				colNum && ( className += ` jc-col-${colNum}` );
				offsetNum && ( className += ` jc-col-offset-${offsetNum}` );
				pullNum && ( className += `jc-col-pull-${pullNum}` );
				return className
			} ,
			inlinePadding () {
				let { padding } = this;
				if ( padding ) {
					return {
						'paddingLeft' : `${padding}px` ,
						'paddingRight' : `${padding}px`
					}
				}
				return {}
			}
		} ,
		created () {
			this.checkParent ();
		} ,
		methods : {
			checkParent () {
				if ( this.$parent.$options.name !== 'jc-row' ) {
					console.warn ( 'jc-col need to have jc-row  for parent component' )
				}
			}
		}
	}
</script>
<style lang="scss">
    .jc-col-base {
        position: relative;
        float: left;
    }

    @for $i from 1 through 12 {
        .jc-col-#{$i} {
            width: 100% / 12 * $i;
        }
    }

    @for $i from 1 through 12 {
        .jc-col-offset-#{$i} {
            margin-left: 100% / 12 * $i;
        }
    }

    @for $i from 1 through 12 {
        .jc-col-pull-#{$i} {
            left: 100% / 12 * $i;
        }
    }
</style>
