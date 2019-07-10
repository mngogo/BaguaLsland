// pages/userSession/userSession.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		array: [{
			id: 3,
			name: '从你的全世界路过311111',
			date: '2019-06-28',
			status: 1
		}, {
				id: 2,
				name: '从你的全世界路过2',
				date: '2019-06-28',
				status: 2
			}, {
				id: 1,
				name: '从你的全世界路过1',
				date: '2019-06-28',
				status: 3
			}],
		// array:[],
		check: 0,
	},
	select: function (e) {
		let _this = this;
		_this.setData({
			check: e.currentTarget.dataset.id
		});
		console.log(_this.data.check)
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