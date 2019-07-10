var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: [],
    videoList: [],
    video: [],
    workType: [],
    index: 999999,
		goodsPic:[],
		videos:[],
		title: '',
		typeId: '',
		content:'',
  },
  // 获取表单数据
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  // 工单类型
  community: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 数据提交
  submit: function() {
		var that = this;
		// 获取工单类型Id
		that.data.typeArray.forEach(function(item,index){
				if(that.data.index == index){
					that.setData({
						typeId:item.id
					})
				}
		})
		// 数据否空判断
		if (that.data.title == '') {
			return that.alertMethod('请填写工单标题');
		}
		if (that.data.typeId == '') {
			return that.alertMethod('请选择工单类型');
		}
		if (that.data.content == '') {
			return that.alertMethod('请工单内容');
		}
		if (that.data.imglist.length == 0) {
			return that.alertMethod('请上传图片');
		}
		if (that.data.videoList.length == 0) {
			return that.alertMethod('请上传视频');
		}
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Workorder/save',
			method: 'POST',
			data: {
				imglist:that.data.imglist,
				title:that.data.title,
				content:that.data.content,
				videoList: that.data.videoList,
				userId:wx.getStorageSync('userData').id,
				typeId: that.data.typeId
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					wx.showToast({
						title: res.data.msg,
						icon: 'success',
						duration: 1000
					});
					wx.navigateBack({
						delta: 1
					})
				}else{
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1500
					});
				}
			}
		});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		var that = this;
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Workorder/index',
			method: 'GET',
			data: {},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					var array = [];
					that.setData({
						typeArray: res.data.workType
					})
					res.data.workType.forEach(function (item) {
						array.push(item.name)
					})
					that.setData({
						workType: array
					});
				}
			}
		});
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
  // 选择图片
  upload: function() {
    var that = this;
    var num = 3 - Number(this.data.imglist.length);
    // 选择文件
    wx.chooseImage({
      count: num, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFilePaths) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            that.upload_img(res.tempFilePaths[i])
          }
          that.setData({
          	imglist: that.data.imglist
          })
        }
      }
    })

	},
	// 上传文件
	upload_img: function (url) {
		var that = this;

		wx.uploadFile({
			url: app.globalData.path + 'Workorder/upload',
			filePath: url,
			formData: {},
			name: 'file',
			success: function (res) {
				var json = JSON.parse(res.data);
				if (json.code == 0) {
					that.data.imglist.push(json.data);
					that.setData({
						imglist: that.data.imglist
					})
				}
			}
		})

	},
  // 点击删除图片
  deleteImg(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
					let imglist = that.data.imglist;
          let index = e.currentTarget.dataset.index;
					imglist.splice(index, 1);
          that.setData({
            imglist: imglist,
          });
        }
      }
    })

  },
  // 点击放大
  previewImage: function(e) {
    var that = this;
    //获取当前图片的下表
    var index = e.currentTarget.dataset.index;
    //数据源
    var pictures = that.data.imglist;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },
  //选择视频
  chooseVideo: function() {
    var that = this
    wx.chooseVideo({
      success: function(res) {
        var video = [res.tempFilePath]
        for (var i = 0; i < video.length; i++) {
					that.uploadVideo(video[i]);
        }
        that.setData({
          videoList: that.data.videoList,
        })
      }
    })
	},
	// 上传视频
	uploadVideo: function (url) {
		var that = this;
		wx.uploadFile({
			url: app.globalData.path + 'Workorder/video',
			filePath: url,
			formData: {},
			name: 'video',
			success: function (res) {
				var json = JSON.parse(res.data);
				if (json.code == 0) {
					that.data.videos.push(json.data);
					that.setData({
						videoList: that.data.videos
					})
				}
			}
		})

	},
  // 点击删除视频
  deleteVideo(e) {
  	var that = this;
  	wx.showModal({
  		title: '提示',
  		content: '是否删除？',
  		success: function (res) {
  			if (res.confirm) {
  				that.setData({
  					videoList: '',
						videos:''
  				});
  			}
  		}
  	})
  },
  // 提示框
  alertMethod: function(text) {
    wx.showToast({
      title: text,
      icon: 'none'
    });
    return false;
  },
})