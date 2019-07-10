// pages/wxLogin/wxLogin.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
	bindGetUserInfo: function(e) { //点击的“拒绝”或者“允许
    var that = this;
    var userInfo = {
      'session_key': '',
      'wxInfo': e.detail.userInfo,
      'memberInfo': '',
      'openid': '',
    };

    wx.login({
      success: function(res) {
        util.ajax({
          url: app.globalData.path + 'User/sessionKey',
          method: 'GET',
          data: {
            code: res.code
          },
          cachetime: 0,
          success: function(res) {
            if (!res.statusCode.errno) {
              userInfo.session_key = res.data.session_key;
              userInfo.openid = res.data.openid;
              wx.setStorageSync('userInfo', userInfo);
            }
						
						// 微信用户数据查询是否存在
						util.ajax({
							url: app.globalData.path + 'User/userData',
							method: 'POST',
							data: {
								openId: wx.getStorageSync('userInfo').openid,
								nickName: wx.getStorageSync('userInfo').wxInfo.nickName,
								avatar: wx.getStorageSync('userInfo').wxInfo.avatarUrl,
							},
							success: function (res) {
								wx.setStorageSync('userData', res.data.data);
								//成功
								if (res.data.code == 0) {
									setTimeout(function () {
										wx.navigateTo({
											url: '/pages/index/index'
										})
									}, 500)
								}else if(res.data.code == 1){
									setTimeout(function () {
										wx.navigateTo({
											url: '/pages/login/login'
										})
									}, 500)
								}else{
									wx.setStorageSync('userInfo', '');
									wx.showToast({
										title: '授权失败',
										icon: 'none',
										duration: 1000,
										mask: true
									});
								}
							}
						});

            wx.showToast({
              title: '已授权',
              icon: 'succes',
              duration: 1000,
              mask: true
            });
          }

        });
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
    var that = this;
    // 查询用户缓存数据
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    if (that.data.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
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