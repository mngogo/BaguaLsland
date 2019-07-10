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
	onLoad: function (options) {
		console.log(this.data.canIUse)
	},
	getPhoneNumber: function (e) { //点击获取手机号码按钮
		var that = this;

		wx.checkSession({
			success: function () {
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)

				var ency = e.detail.encryptedData;
				var iv = e.detail.iv;
				var sessionk = that.data.sessionKey;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					that.setData({
						modalstatus: true
					});
				} else { //同意授权
					wx.request({
						method: "GET",
						url: app.globalData.path+'Apiuser/userTel',
						data: {
							encrypdata: ency,
							ivdata: iv,
							sessionkey: sessionk
						},
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: (res) => {
							console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
							console.log(res);
							var phone = res.data.phoneNumber;
							console.log(phone);
						},
						fail: function (res) {
							console.log("解密失败~~~~~~~~~~~~~");
							console.log(res);
						}

					});

				}

			},

			fail: function () {

				console.log("session_key 已经失效，需要重新执行登录流程");

				that.wxlogin(); //重新登录

			}

		});



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
		var that = this;
		// 查询用户缓存数据
		that.setData({
			userInfo: wx.getStorageSync('userInfo')
		})
		if (that.data.userInfo && that.data.userInfo.tel) {
			wx.navigateTo({
				url: '/pages/login/login'
			})
		}
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

	}
})