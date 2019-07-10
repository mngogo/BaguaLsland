var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this;
		that.setData({
			id: options.id
		})
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Workorder/workOrderDetails',
			method: 'GET',
			data: {
				workOrderId: that.data.id
			},
			success: function (res) {
				if (res.data.code == 0) {
					that.setData({
						workOrder: res.data.workOrder,
						handle: wx.getStorageSync('userData'),
						image: res.data.image,
					})
				}
			}
		})

	},
	submit:function(e){

		var that = this;
		var handlingFeedback = e.detail.value.handlingFeedback;
		var workOrderId = e.detail.value.id;
		if (handlingFeedback == '') {
			return that.alertMethod('请输入反馈内容');
		}
		util.ajax({
			url: app.globalData.path + 'Workorder/handlingFeedback',
			method: 'POST',
			data: {
				workOrderId: workOrderId,
				handlingFeedback: handlingFeedback,
				userId: wx.getStorageSync('userData').id,
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					wx.showToast({
						title: res.data.msg,
						icon: 'success',
						duration: 1000
					});
					// wx.navigateBack({
					// 	delta: 1
					// })
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1500
					});
				}
			}
		})
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
	 alertMethod: function (text) {
		wx.showToast({
			title: text,
			icon: 'none'
		});
		return false;
	},
})