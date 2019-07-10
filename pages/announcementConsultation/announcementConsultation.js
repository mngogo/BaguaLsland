var postsData = require('../../data/shuju.js');
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whetherImg: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        that.setData({
          height: windowWidth - 36
        })
      },
    })
    var allInformation = postsData.detailedInformation;
    var newInformation = []
    for (var i = 0; i < allInformation.length; i++) {
      // var currentInformation = allInformation
      newInformation.push(allInformation[i])
      // console.log("newInformation", newInformation)
      if (i == 2) {
        break;
      }
    }
    var allmonitor = postsData.monitor;
    var newmonitor = []
    for (var i = 0; i < allmonitor.length; i++) {
      // var currentInformation = allmonitor
      newmonitor.push(allmonitor[i])
      // console.log("newInformation", newInformation)
      if (i == 5) {
        break;
      }
    }
    that.setData({
      information: newInformation,
      monitor: newmonitor
    });
    // for (var i = 0; i < this.data.information.length; i++) {
    //   var currentInformation = this.data.information[i];
    //   var informationImg = currentInformation.informationImg;
    //   var informationVideo = currentInformation.informationVideo;
    //   console.log("currentInformation", informationImg)
    // }

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
		// 资讯数据
		util.ajax({
			url: app.globalData.path + 'Engineering/index',
			method: 'GET',
			data: {
				status:1
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					that.setData({
						engineering: res.data.data
					})
				}
			}
		})
  },
  onPostTap: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
  },
  clickFeedback: function(e) {
    wx,
    wx.navigateTo({
      url: '/pages/questionFeedback/questionFeedback',
    })
  },
  clickMoreInformation: function(e) {
    wx.navigateTo({
      url: '/pages/moreInformation/moreInformation',
    })
  },
  clickInformation: function(e) {
    // console.log(e.currentTarget.dataset.index)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detailsOfInformation/detailsOfInformation?id=' + id,
    })
  },
  clickMonitoringQuery: function(e) {
    wx.navigateTo({
      url: '/pages/moreMonitoringQuery/moreMonitoringQuery',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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