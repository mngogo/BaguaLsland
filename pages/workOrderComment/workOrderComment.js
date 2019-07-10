var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zp: 5,
    score: 5,
    satisfied: [{
      id: 1,
      type: 1,
      status: 1,
    }, {
      id: 2,
      type: 2,
      status: 2,
			}],
		status: 1
  },
  // 满意度效果
  selectIndexNum(e) {
    let i = e.currentTarget.dataset.index;
    if (i == this.data.score) {
      this.setData({
        score: -1
      })
    } else {
      this.setData({
        score: e.currentTarget.dataset.index - 0
      })
    }
    this.setData({
      zp: this.data.score + 1,
    })
  },
  // 是否解决效果
  satisfiedTap: function(e) {
    var that = this;
		var checked = e.currentTarget.dataset.id;
		var status = e.currentTarget.dataset.status;
    var satisfiedList = this.data.satisfied;
    for (var i = 0; i < satisfiedList.length; i++) {
      if (satisfiedList[i].id == checked) {
        satisfiedList[i].status = 1;
      } else {
				satisfiedList[i].status = 2;
      }
    }
    that.setData({
      satisfied: satisfiedList
    })
		// 是否解决数据
		that.data.satisfied.forEach(function (item) {
			if (that.data.status == item.status) {
				that.setData({
					solve: item.id
				})
			}
		})

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		var that = this;
		that.setData({
			id: options.workOrderId
		})
  },
	submit:function(){
		var that = this;
		if (that.data.zp == 0) {
			return that.alertMethod('请对本次服务做出评分');
		}
		// 是否解决数据
		that.data.satisfied.forEach(function (item) {
			if (that.data.status == item.status) {
				that.setData({
					solve: item.id
				})
			}
		})
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Workorder/workOrderComment',
			method: 'POST',
			data: {
				userId: wx.getStorageSync('userData').id,
				workOrderId: that.data.id,
				solve: that.data.solve,
				satisfied:that.data.zp
			},
			success: function (res) {
				if (res.data.code == 0) {
					wx.showToast({
						title: res.data.msg,
						icon: 'success',
						duration: 1500 //持续的时间
					});
					setTimeout(function () {
						wx.navigateBack({
							data: 1
						})
					}, 2000)
				}else{
					wx.showToast({
						title: '提交失败',
						icon: 'none',
						duration: 1500 //持续的时间
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
  alertMethod: function (text) {
		wx.showToast({
			title: text,
			icon: 'none'
		});
		return false;
	},
})