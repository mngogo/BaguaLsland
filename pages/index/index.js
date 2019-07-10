var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
		// 获取banner图
    util.ajax({
      url: app.globalData.path + 'Index/index',
      method: 'GET',
      data: {},
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          res.data.banner.forEach(function(item,index) {
						// var banner = 'banner[' + that.data.filePath + '' + item.image+'].url';
						// 拼接url路径
						res.data.banner[index].image = that.data.filePath+''+item.image;
          })
          that.setData({
						banner: res.data.banner
          });
        }
      }
    });
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
    this.setData({
      filePath: app.globalData.filePath
    })
		var userInfo = wx.getStorageSync('userInfo');
		// console.log(userInfo)
		// if (!userInfo){
		// 	wx.redirectTo({
		// 		url: '/pages/login/login'
		// 	})
		// }
    // console.log(this.data.filePath)
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