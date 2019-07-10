var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    community_id:0,
    selectArea: false,
    index: 9999,
		title: '',
		content:'',
    wordNumber: "100",
    uploaderImgList: [],
    uploaderPicNum: 0,
    showUpImgload: true,
    uploaderVideoNum: 0,
    showUpVideoload: true,
    uploaderVideoList: [],
  },
  //删除图片
  clearImg: function(e) {
		var that = this;
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					let uploaderImgList = that.data.uploaderImgList;
					let index = e.currentTarget.dataset.index;
					uploaderImgList.splice(index, 1);
					that.setData({
						uploaderImgList: uploaderImgList,
					});
					that.setData({
						uploaderPicNum: that.data.uploaderImgList.length,
					});
				}
			}
		})
  },
  //展示图片
  showImg: function(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderImgList,
      current: that.data.uploaderImgList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  uploadPicture: function(e) {
		var that = this;
		var num = 9 - Number(this.data.uploaderImgList.length);
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
				}

      }
    })
	},
	// 上传文件
	upload_img: function (url) {
		var that = this;
		// 上传图片
		wx.uploadFile({
			url: app.globalData.path + 'Workorder/upload',
			filePath: url,
			formData: {},
			name: 'file',
			success: function (res) {
				var json = JSON.parse(res.data);
				if (json.code == 0) {
					that.data.uploaderImgList.push(json.data);
					that.setData({
						uploaderImgList: that.data.uploaderImgList,
						uploaderPicNum: that.data.uploaderImgList.length
					})
				}
			}
		})

	},
  //上传视频
	uploadVideo: function(e) {
		var that = this
		wx.chooseVideo({
			success: function (res) {
				var uploaderVideoList = [res.tempFilePath]
				for (var i = 0; i < uploaderVideoList.length; i++) {
					that.upload_videos(uploaderVideoList[i]);
				}
			}
		})
	},
	// 上传视频
	upload_videos: function (url) {
		var that = this;
		wx.uploadFile({
			url: app.globalData.path + 'Workorder/video',
			filePath: url,
			formData: {},
			name: 'video',
			success: function (res) {
				var json = JSON.parse(res.data);
				if (json.code == 0) {
					that.data.uploaderVideoList.push(json.data);
					that.setData({
						uploaderVideoList: that.data.uploaderVideoList,
						uploaderVideoNum: that.data.uploaderVideoList.length,
					})
				}
			}
		})

	},
  //删除视频
  clearVideo: function (e) {
		var that = this;
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					let uploaderVideoList = that.data.uploaderVideoList;
					let index = e.currentTarget.dataset.index;
					uploaderVideoList.splice(index, 1);
					that.setData({
						uploaderVideoList: uploaderVideoList,
					});
					that.setData({
						uploaderVideoNum: that.data.uploaderVideoList.length,
					});
				}
			}
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		// 获取用户数据及所有社区
		var that = this;
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Engineering/problem',
			method: 'GET',
			data: {
				userId:wx.getStorageSync('userData').id
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					var array = [];
					that.setData({
						community: res.data.community,
						communityData: res.data.community,
						user:wx.getStorageSync('userData')
					})
					res.data.community.forEach(function (item,index) {
						array.push(item.name)
						if (wx.getStorageSync('userData').community_id == item.id){
							that.setData({
								index:index,
								community_id:item.id
							})
						}
					})
					that.setData({
						community: array
					});
				}
			}
		});
  },
  bindShowMsg: function(e) {
    var rotate = this.data.selectArea;
    this.setData({
      select: !this.data.select,
      selectArea: !rotate
    })
  },

  mySelect: function(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      community: name,
      select: false
    })
  },
  pickChange: function(e) {
		var that = this;
		that.setData({
      index: e.detail.value
    });
		that.data.communityData.forEach(function (item,index){
			if (index == that.data.index){
				that.setData({
					community_id:item.id
				})
			}
		})
  },
  bindWordLimit: function(e) {
    var cursor = e.detail.cursor
    this.setData({
      wordNumber: 100 - cursor
    })

		let item = e.currentTarget.dataset.model;
		this.setData({
			[item]: e.detail.value
		});
  },
	// 数据提交
	submit: function () {
		var that = this;

		// 数据否空判断
		if (that.data.title == '') {
			return that.alertMethod('请输入标题');
		}
		if (that.data.content == '') {
			return that.alertMethod('请输入内容');
		}
		if (that.data.uploaderImgList.length == 0) {
			return that.alertMethod('请上传图片');
		}
		if (that.data.uploaderVideoList.length == 0) {
			return that.alertMethod('请上传视频');
		}
		if (that.data.userName == 0) {
			return that.alertMethod('请输入您的姓名');
		}
		if (that.data.userTel == 0) {
			return that.alertMethod('请输入电话号码');
		}
		if (that.data.community_id == 0) {
			return that.alertMethod('请选择所在社区');
		}
		// 社区类型
		util.ajax({
			url: app.globalData.path + 'Engineering/saveProblem',
			method: 'POST',
			data: {
				imgList: that.data.uploaderImgList,
				title: that.data.title,
				content: that.data.content,
				videoList: that.data.uploaderVideoList,
				userId: wx.getStorageSync('userData').id,
				communityId: that.data.community_id,
				userName: that.data.userName,
				userTel: that.data.userTel,
			},
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					wx.showToast({
						title: res.data.msg,
						icon: 'success',
						duration: 2000
					});
					setTimeout(function () {
						wx.navigateBack({
							delta: 1
						})
					}, 2000)
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
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
  // 提示框
  alertMethod: function (text) {
		wx.showToast({
			title: text,
			icon: 'none'
		});
		return false;
	},
})