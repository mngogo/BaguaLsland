var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    workOrder: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      status: options.status
    })
  },
  workOrder: function() {
    var that = this;
    // 社区类型
    util.ajax({
      url: app.globalData.path + 'Workorder/orderList',
      method: 'GET',
      data: {
        status: that.data.status,
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        //成功
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.code == 0) {
          res.data.data.forEach(function(item) {
            that.data.workOrder.push(item)
          })
          that.data.page++;
          that.setData({
            length: res.data.data.length,
            workOrder: that.data.workOrder,
            page: that.data.page
          })
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    });
  },
  accept: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var key = e.currentTarget.dataset.index;

    // 接受数据
    wx.showModal({
      title: '提示',
      content: '确认接受工单？',
      success: function(res) {
        if (res.confirm) {
          util.ajax({
            url: app.globalData.path + 'Workorder/accept',
            method: 'POST',
            data: {
              workOrderId: id
            },
            success: function(res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 1000,
                  mask: true
                });
                // 修改数据
                // that.data.workOrder[key].status = 2;
                // that.setData({
                //   workOrder: that.data.workOrder
                // })

								var workOrder = that.data.workOrder;
								workOrder.splice(key, 1);
								that.setData({
									workOrder: workOrder
								})

              }
            }
          })
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
    this.workOrder()
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
    this.workOrder();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})