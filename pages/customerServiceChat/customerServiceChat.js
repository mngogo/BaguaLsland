// pages/customerServiceChat/customerServiceChat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    chat: [{
        speaker: 'server',
        contentType: 'text',
        content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
      },
      {
        speaker: 'customer',
        contentType: 'text',
        content: '我怕是走错片场了...'
      }, {
        speaker: 'server',
        contentType: 'text',
        content: '欢迎来到王者荣耀，敌军还有30秒到达战场，请做好准备！'
			},
			{
				speaker: 'customer',
				contentType: 'text',
				content: '我要玩吃鸡...'
			}, {
				speaker: 'server',
				contentType: 'text',
				content: '欢迎来到刺激战场，请各位选手们做好准备！'
			},
			{
				speaker: 'customer',
				contentType: 'text',
				content: '我要玩吃鸡...'
			}, {
				speaker: 'server',
				contentType: 'text',
				content: '欢迎来到刺激战场，请各位选手们做好准备！'
			},
			{
				speaker: 'customer',
				contentType: 'text',
				content: '我要玩吃鸡...'
			}, {
				speaker: 'server',
				contentType: 'text',
				content: '欢迎来到刺激战场，请各位选手们做好准备！'
			},
			{
				speaker: 'customer',
				contentType: 'text',
				content: '我要玩吃鸡...'
			}, {
				speaker: 'server',
				contentType: 'text',
				content: '欢迎来到刺激战场，请各位选手们做好准备！'
			},
			{
				speaker: 'customer',
				contentType: 'text',
				content: '我要玩吃鸡...'
			}, {
				speaker: 'server',
				contentType: 'text',
				content: '欢迎来到刺激战场，请各位选手们做好准备！'
			},
			{
				speaker: 'customer',
				contentType: 'text',
				content: '我要玩吃鸡...'
			}, {
				speaker: 'server',
				contentType: 'text',
				content: '欢迎来到刺激战场，请各位选手们做好准备！'
			}
    ]
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
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var height = res.windowHeight * 2 - 74;
        that.setData({
          height: height
        })
      },
    })

    that.setData({
      scrollHeight: '100vh',
    })
    that.setData({
      toView: 'msg-' + (that.data.chat.length - 1)
    })

  },
  //失去聚焦(软键盘消失)
  // blur: function(e) {
  //   this.setData({
  //     scrollHeight: '100vh',
  //   })
  //   this.setData({
  //     toView: 'msg-' + (msgList.length - 1)
  //   })

  // },
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