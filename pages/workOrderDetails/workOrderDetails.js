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
  onLoad: function(options) {

		var that = this;
		that.setData({
			id: options.workOrderId
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

		var that = this;
		
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Workorder/workOrderDetails',
			method: 'GET',
			data: {
				userId: wx.getStorageSync('userData').id,
				workOrderId: that.data.id
			},
			success: function (res) {
				if (res.data.code == 0) {
					that.setData({
						workOrder: res.data.workOrder,
						handle: res.data.handleUser,
						image: res.data.image,
					})
					console.log(that.data.handle)
				}
			}
		})

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})