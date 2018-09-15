const wxShare = {

}
wxShare.install = (Vue, options) => {
	Vue.prototype.$wxShare = function({title, link, desc, imgUrl}) {
		this.$store.dispatch("getUserData")
			.then(data => {
				const {id} = data
				if(link.indexOf("?")!=-1){
					link = link+"&formId="+id;
				}else{
					link = link+"?formId="+id;
				}
				this.$wxConfig({
					share: {
						title,
						imgUrl,
						desc,
						link: `${link}`
					}
				})
			})
	}
}
export default wxShare