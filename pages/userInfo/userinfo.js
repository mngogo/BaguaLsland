// pages/userInfo/userinfo.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    userInfo: {},
    index: 999999
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      userInfo: wx.getStorageSync('userData')
    })
    // 社区查询
    util.ajax({
      url: app.globalData.path + 'User/index',
      data: {},
      method: 'GET',
      success: function(res) {
        if (res.data.code == 0) {
					that.setData({
						community_array: res.data.community
					})
          res.data.community.forEach(function(item, index) {
            that.data.array.push(item.name)
            if (item.id == that.data.userInfo.community_id) {
              that.setData({
                index: index
              });
            }
          })
          that.setData({
            community: that.data.array,
          });
        }
      }
    })

  },
  // 社区选择
  community: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  submit: function(e) {
    var that = this;
    that.data.community_array.forEach(function(item, index) {
      if (index == that.data.index) {
        that.setData({
          community_id: item.id
        })
      }
    })

		if (e.detail.value.name == '') {
			return that.alertMethod('请输入您的用户名');
		}
		if (e.detail.value.mobile == '') {
			return that.alertMethod('请输入您的电话号码');
		}
		if (e.detail.value.mobile.length > 11) {
			return that.alertMethod('您的电话号码格式不正确');
		}
		if (that.data.index == 999999) {
			return that.alertMethod('请选择社区');
		}
    // 提交数据
    util.ajax({
      url: app.globalData.path + 'User/save',
      data: {
				community_id: that.data.community_id,
				name: e.detail.value.name,
				mobile: e.detail.value.mobile,
				userId:wx.getStorageSync('userData').id
      },
      method: 'POST',
      success: function(res) {
        //成功
        if (res.data.code == 0) {
					wx.setStorageSync('userData', res.data.data)
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
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

  },
  // 提示框
  alertMethod: function(text) {
    wx.showToast({
      title: text,
      icon: 'none'
    });
    return false;
  }
})