Page({

  /**
   * 页面的初始数据
   */
  data: {
    expression: ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗",
      "😙", "😚", "🙂", "🤗", "🤔", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫",
      "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "🙁", "😖", "😞", "😟",
      "😤", "😢", "😭", "😦", "😧", "😨", "😩", "😬", "😰", "😱", "😳", "😵", "😡", "😠", "😷", "🤒", "🤕",
      "🤢", "🤧", "😇", "🤓",
    ],
    msgList: [{
      speaker: 'server',
      contentType: 'text',
      content: '你好啊😀',
      imgs: ""
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好啊',
      imgs: ""
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好啊',
      imgs: ""
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好啊',
      imgs: ""
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好啊',
      imgs: ""
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好啊',
      imgs: ""
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好啊',
      imgs: ""
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我不太好呢',
      imgs: ""
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我不太好呢',
      imgs: ""
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我不太好呢',
      imgs: ""
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我不太好呢',
      imgs: ""
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我不太好呢',
      imgs: ""
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '嘻嘻嘻嘻嘻 ',
      imgs: ""
    },

    ],
    showFunction: true,
    showEmoj: true,
    paddingBottom: 62,
    inputVal: '',
    scrollTop: 10000,
    bottom: 0,
    keyHeight: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //使聊天信息永远在最下面
  getBottom: function () {
    var that = this;
    const query = wx.createSelectorQuery()
    query.select('#talkInterface').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      // console.log('talkInterface', res);
      var height = res[0].height;
      that.setData({
        scrollTop: height
      })
    })
  },

  //动态获取底部盒子高度
  // paddingBottom: function(e) {
  //   var that = this;
  //   const query = wx.createSelectorQuery()
  //   query.select('#flag').boundingClientRect()
  //   query.selectViewport().scrollOffset()
  //   query.exec(function(res) {
  //     console.log(res);
  //     var height = res[0].height;
  //     console.log("paddingBottom", height)
  //     that.setData({
  //       paddingBottom: height
  //     })
  //   })
  // },
  //点击更多（+号)
  clickMore: function (e) {
    console.log("点击了加号")
    if (this.data.showEmoj == false) {
      this.setData({
        showEmoj: true,
        showFunction: false,
        paddingBottom: 162
      })
    } else {
      if (this.data.showFunction == false) {
        this.setData({
          showFunction: true,
          paddingBottom: 62
        })
      } else {
        console.log("当加号下面内容没有时点击出现")
        this.setData({
          showFunction: false,
          paddingBottom: 162
        })
        console.log(this.data.paddingBottom)
      }
    }
    this.getBottom()
  },
  //点击表情按钮
  clickLaugh: function (e) {
    if (this.data.showFunction == false) {
      this.setData({
        showEmoj: false,
        showFunction: true,
        paddingBottom: 337
      })
    } else {
      if (this.data.showEmoj == false) {
        this.setData({
          showEmoj: true,
          paddingBottom: 62
        })
      } else {
        this.setData({
          showEmoj: false,
          paddingBottom: 337
        })
      }
    }
    this.getBottom();
  },
  //选择照片
  clickPicture: function (e) {
    this.setData({
      showFunction: true
    })
    var that = this;
    if (that.data.show == true) {
      setTimeout(function () {
        that.setData({
          showFunction: false
        })
      }, 1000)
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("img", res)
        var imgs = res.tempFilePaths;
        var msgList = that.data.msgList;
        msgList.push({
          speaker: 'customer',
          contentType: 'img',
          content: '',
          imgs: imgs,
          video: ''
        })
        console.log(msgList)
        that.setData({
          msgList: msgList,
          inputVal: '',
          paddingBottom: 62,
        });
        that.getBottom();
      },
    })
  },
  //展示图片
  showImg: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var that = this;
    console.log((that.data.msgList[id]).imgs[index])
    wx.previewImage({
      urls: that.data.msgList[id].imgs,
      current: (that.data.msgList[id]).imgs[index]
    })
  },
  //选择视频
  clickVideo: function (e) {
    this.setData({
      showFunction: true
    })
    var that = this;
    if (that.data.show == true) {
      setTimeout(function () {
        that.setData({
          showFunction: false
        })
      }, 1000)
    }
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res);
        var video = res.tempFilePath;
        var msgList = that.data.msgList;
        msgList.push({
          speaker: 'customer',
          contentType: 'video',
          content: "",
          imgs: "",
          video: video
        })
        console.log(msgList)
        that.setData({
          msgList: msgList,
          inputVal: '',
          paddingBottom: 62,
        });
        that.getBottom();
      }
    })
  },
  //选择表情
  clickEmoj: function (e) {
    var index = e.currentTarget.dataset.index;
    var biaoqing = this.data.expression[index]
    var value = this.data.inputVal;
    this.setData({
      inputVal: value + biaoqing
    })
  },
  //实时获取input框内容
  bindinput: function (e) {
    // console.log(e)
    var value = e.detail.value;
    this.setData({
      inputVal: value
    })
  },
  //点击发送
  clikSend: function (e) {
    // console.log('2')
    var inputVal = this.data.inputVal;
    var msgList = this.data.msgList;
    if (inputVal == "") {
      return this.alertMetod('消息不能为空哦~');
    } else {
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: inputVal,
        imgs: '',
        video: ''
      })
      this.setData({
        msgList: msgList,
        inputVal: '',
        showFunction: true,
        showEmoj: true,
        paddingBottom: 62 + this.data.keyHeight
      })
    }
    this.getBottom();
  },
  focus: function (e) {
    var that = this;
    var keyHeight = e.detail.height;
    // console.log(keyHeight)
    that.setData({
      showFunction: true,
      showEmoj: true,
      paddingBottom: 62 + keyHeight,
      bottom: keyHeight,
      keyHeight: keyHeight
    })
    that.getBottom();
  },
  alertMetod(text) {
    wx.showToast({
      title: text,
      icon: "none",
      duration: 2000,
      mask: true
    });
    return false;
  },
  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      paddingBottom: 62,
      bottom: 0
    })
  },
  sendClick: function (e) {
    console.log(e)
    var value = e.detail.value;
    console.log(value);
    var msgList = this.data.msgList;
    console.log(msgList)
    if (value == "") {
      return this.alertMetod('消息不能为空哦~');
    } else {
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: value,
        imgs: "",
        video: '',
      })
      this.setData({
        msgList: msgList,
        inputVal: '',
        paddingBottom: 62 + this.data.keyHeight
      })
    }
    this.getBottom();
  },
  //点击scroll-view的大盒子
  clickContent: function (e) {
    console.log("点击中间内容")
    this.setData({
      showFunction: true,
      showEmoj: true,
      paddingBottom: 62,
    })
  },
  //工单提交
  workOrder:function(e){
wx.navigateTo({
  url: '../workOrderSubmit/workOrderSubmit',
})
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