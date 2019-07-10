var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
		workOrder: [],
    check: 0,
		page:1,
  },
	select: function (e) {
		let that = this;
		that.setData({
			check: e.currentTarget.dataset.check,
		});
		that.result();
		that.workOrder()
	},
	result: function () {
		this.setData({
			workOrder: [],
			length: null,
			openof: 1,
			page: 1
		})
	},
	workOrder:function(){
		var that = this;
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Workorder/orderList',
			method: 'GET',
			data: {
				userId: wx.getStorageSync('userData').id,
				status: that.data.check,
				pageSize: 10, //每页展示的数据条数
				page: that.data.page //当前页码（从1开始）
			},
			success: function (res) {
				wx.hideLoading()
				wx.hideNavigationBarLoading() //完成停止加载
				//成功
				if (res.data.code == 0) {
					res.data.data.forEach(function (item) {
						that.data.workOrder.push(item)
					})
					that.data.page++;
					that.setData({
						length: res.data.data.length,
						workOrder: that.data.workOrder,
						page: that.data.page,
						openof: that.data.page
					})
				}
			},
			complete: function () {
				wx.hideNavigationBarLoading() //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
			},
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
		this.result();
		this.workOrder()
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
		this.workOrder();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})