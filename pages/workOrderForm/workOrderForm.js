// pages/workOrderSubmit/workOrderSubmit.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imglist: [],
		videoList: [],
		video: [],
		array: ['类型一', '类型二', '类型三', '类型三'],
		index: 999999,
	},
	// 工单类型
	community: function (e) {
		this.setData({
			index: e.detail.value
		})
		console.log(this.data.index)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	// 选择图片
	upload: function () {
		var _this = this;
		var num = 3 - Number(this.data.imglist.length);
		// 选择文件
		wx.chooseImage({
			count: num, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				if (res.tempFilePaths) {
					for (var i = 0; i < res.tempFilePaths.length; i++) {
						_this.data.imglist.push(res.tempFilePaths[i]);
					}
					_this.setData({
						imglist: _this.data.imglist
					})
					// console.log(_this.data.imglist)
				}
			}
		})

	},
	// 点击删除图片
	deleteImg(e) {
		var that = this;
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					let imglist = that.data.imglist;
					let index = e.currentTarget.dataset.index;
					imglist.splice(index, 1);
					that.setData({
						imglist: imglist
					});
				}
			}
		})

	},
	// 点击放大
	previewImage: function (e) {
		var that = this;
		//获取当前图片的下表
		var index = e.currentTarget.dataset.index;
		//数据源
		var pictures = that.data.imglist;
		wx.previewImage({
			//当前显示下表
			current: pictures[index],
			//数据源
			urls: pictures
		})
	},
	//选择视频
	chooseVideo: function () {
		var that = this
		wx.chooseVideo({
			success: function (res) {
				var video = [res.tempFilePath]
				for (var i = 0; i < video.length; i++) {
					that.data.videoList.push(video[i]);
				}
				that.setData({
					videoList: that.data.videoList,
				})
				console.log(that.data.videoList)
			}
		})
	},
	// 点击删除视频
	// deleteVideo(e) {
	// 	var that = this;
	// 	wx.showModal({
	// 		title: '提示',
	// 		content: '是否删除？',
	// 		success: function (res) {
	// 			if (res.confirm) {
	// 				let videoList = that.data.videoList;
	// 				let index = e.currentTarget.dataset.index;
	// 				videoList.splice(index, 1);
	// 				that.setData({
	// 					videoList: videoList
	// 				});
	// 			}
	// 		}
	// 	})
	// }

})