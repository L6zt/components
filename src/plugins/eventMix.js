// 父子事件 交互 有问题 待优化
const eventMixin = {}
eventMixin.install = (Vue, options) => {
	Vue.mixin({
		methods: {
			$getFarther (cpName) {
        let parent = this.$parent;
        const root = this.$root;
        while (parent.$options.name !== cpName && parent !== root) {
          parent = parent.$parent
        }
        return parent
			},
			$getFartherTree (cpName) {
				let tree = [];
        let parent = this.$parent;
        const root = this.$root;
				while ( parent.$options.name !== cpName && parent !== root ) {
					tree.push(parent);
          parent = parent.$parent;
        }
        return tree.reverse()
			},
			$checkFarther (cpName) {
				let parent = this.$parent;
				const root = this.$root;
				while (parent.$options.name !== cpName && parent !== root) {
					parent = parent.$parent
				}
				if (parent.$options.name !== cpName) {
					return false;
				}
				return true;
			},
			sendFather (cpName , {event, playLoad}) {
				// 子向父节点
				let parent = this.$parent
				const root = this.$root
				while (parent.$options.name !== cpName && parent !== root) {
					parent = parent.$parent
				}
				parent.$emit(event, playLoad)
			},
			sendInfiniteCd(cpName, {event, playLoad}) {
				// 最小组件
				const sendChildMsg = (item) => {
					let mainC = item.$children
					mainC.map(cmp => {
						// 获取组件姓名
						const name = cmp.$options.name
						if (name === cpName) {
							cmp.$emit(event, playLoad)
							sendChildMsg(cmp)
						}
						return
					})
				}
				// 初始化函数
				sendChildMsg(this)
			}
		}
	})
}
export default eventMixin
