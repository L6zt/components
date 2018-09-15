	const contentType = "application/x-www-form-urlencoded,multipart/form-data,application/json".split(",")
	const timeout = 8000
	const post = ({ url, data = {}, headers = {}, special = false, isUpload = false}) => {
	console.log(special);
		return new Promise((r, j)=> {
			$.ajax({
				method: "POST",
				url,
				data,
				headers,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				dataType: "json",
				timeout,
				contentType: special ? contentType[2] : isUpload ? contentType[1] : contentType[0],
				success: function success (rp) {
					let {flag, data, errorMsg: errMsg, errorCode: code} =  rp
					if (flag === 1) {
						r(data)
					} else {
						j({errMsg, code})
					}
				},
				error: function error (errMsg) {
					j({errMsg: "未知错误"})
				}
			})
		})
	}
	const get = ({ url, data = {}, headers = {}}) => {
		return new Promise((r, j)=> {
			$.ajax({
				method: "GET",
				url,
				data,
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				timeout,
				contentType: contentType[0],
				success: function success (rp) {
					let {flag, data, errorMsg: errMsg} =  rp
					if (flag === 1) {
						r(data)
					} else {
						j({errMsg})
					}
				},
				error: function error (errMsg) {
					j({errMsg: "未知错误"})
				}
			})
		})
	}
	export {post, get}