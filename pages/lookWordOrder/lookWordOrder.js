var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
		workOrder:[],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
	},
	workOrder: function() {
    var that = this;
    // 查询用户数据
    util.ajax({
      url: app.globalData.path + 'WorkOrder/workOrderLook',
      method: 'GET',
      data: {
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
		this.workOrder();
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