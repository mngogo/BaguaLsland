var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		comment: [],
		page: 1,
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
	},
	comment: function () {
		var that = this;
		// 查询用户数据
		util.ajax({
			url: app.globalData.path + 'WorkOrder/comment',
			method: 'GET',
			data: {
				pageSize: 10, //每页展示的数据条数
				page: that.data.page //当前页码（从1开始）
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					wx.hideLoading()
					wx.hideNavigationBarLoading() //完成停止加载
					//成功
					if (res.data.code == 0) {
						res.data.data.forEach(function (item) {
							that.data.comment.push(item)
						})
						that.data.page++;
						that.setData({
							length: res.data.data.length,
							comment: that.data.comment,
							page: that.data.page
						})
					}
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
		this.comment();
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
		this.comment();
	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	}
})