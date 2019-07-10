var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['八卦洲社区', '社区一', '社区二', '社区三'],
    array: [],
    index: 999999,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 查询用户缓存数据
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(that.data.userInfo);

    console.log(wx.getStorageSync('userInfo'));
    // 查询社区数据
    if (that.data.userInfo) {
      util.ajax({
        url: app.globalData.path + 'User/index',
        data: {},
        method: 'GET',
        success: function(res) {
          if (res.data.code == 0) {
            res.data.community.forEach(function(item, index) {
              that.data.array.push(item.name)
            })
            that.setData({
              community: that.data.array,
            });
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/wxLogin/wxLogin'
      })
    }
  },
	onLaunch: function () {
		wx.login({
			success: function (res) {
				if (res.code) {
					//发起网络请求
					console.log(res.code)
				} else {
					console.log('获取用户登录态失败！' + res.errMsg)
				}
			}
		});
	},
	getPhoneNumber: function (e) {
		console.log(e.detail);
		console.log(e.detail.errMsg)
		console.log(e.detail.iv)
		console.log(e.detail.encryptedData) 
		// wx.login({
		// 	success: res => {
		// 		console.log(res.code);
		// 		wx.request({
		// 			url: app.globalData.path + 'Apiuser/sessionKey',
		// 			data: {
		// 				'encryptedData': encodeURIComponent(e.detail.encryptedData),
		// 				'iv': e.detail.iv,
		// 				'code': res.code
		// 			},
		// 			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		// 			header: {
		// 				'content-type': 'application/json'
		// 			}, // 设置请求的 header
		// 			success: function (res) {
		// 				if (res.status == 1) {//我后台设置的返回值为1是正确
		// 					//存入缓存即可
		// 					wx.setStorageSync('phone', res.phone);
		// 				}
		// 			},
		// 			fail: function (err) {
		// 				console.log(err);
		// 			}
		// 		})
		// 	}
		// })
	},
	
  // 社区选择
  community: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  out: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 获取表单数据
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  login: function() {
    var name = this.data.name;
    var tel = this.data.tel;
    if (name === '' || tel === '') {
      wx.showToast({
        title: '姓名、电话不能为空',
        icon: 'none',
        duration: 2000 //持续的时间
      });
    } else {

      //登录
      util.ajax({
        url: app.globalData.path + 'Apiuser/login',
        method: 'POST',
        data: {
          name: name,
          tel: tel,
          avatar: wx.getStorageSync('userInfo').avatarUrl
        },
        success: function(res) {
          // 成功
        }
      });
    }
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