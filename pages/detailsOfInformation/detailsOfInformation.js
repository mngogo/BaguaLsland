var postsData = require('../../data/shuju.js');
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fabulousNumber: 0,
    show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var id = options.id;
    this.setData({
      id: options.id
    })
    var information = postsData.detailedInformation;
    console.log(information)
    this.setData({
      informationImg: information[id].informationImg,
      // informationVideo: information[id].informationVideo,
      informationTitle: information[id].informationTitle,
      informationTime: information[id].informationTime,
      informationContent: information[id].informationContent,
    })

		// 设为已读
		var that = this;
		// 资讯数据
		util.ajax({
			url: app.globalData.path + 'Engineering/read',
			method: 'POST',
			data: {
				id: that.data.id,
				userId: wx.getStorageSync('userData').id
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					console.log('阅读成功')
				}
			}
		})
  },
  clickFabulous: function(e) {
    var that = this;
    // 点赞区间
    util.ajax({
      url: app.globalData.path + 'Engineering/fabulous',
      method: 'POST',
      data: {
        id: that.data.id,
        userId: wx.getStorageSync('userData').id,
        fabulousNumber: that.data.fabulousNumber + 1
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          // 点赞
          that.setData({
            show: true,
            fabulousNumber: that.data.fabulousNumber + 1
          })
        } else if (res.data.code == 1) {
          // 取消点赞
          that.setData({
            show: false,
            fabulousNumber: that.data.fabulousNumber - 1
          })
        } else {
					// 操作失败
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
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
    var that = this;
    console.log(that.data.id)
    // 资讯数据
    util.ajax({
      url: app.globalData.path + 'Engineering/details',
      method: 'GET',
      data: {
        id: that.data.id,
        userId: wx.getStorageSync('userData').id
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          that.setData({
            engineering: res.data.news,
            like: res.data.like,
						fabulousNumber: res.data.likeNumber,
						readNumber: res.data.readNumber
          })
          console.log(that.data.fabulousNumber);
          // 判断是否点赞
          if (that.data.like == null) {
            that.setData({
              show: false
            })
          }
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