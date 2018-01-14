//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
const util = require('../../utils/util.js')

// 引入配置
var config = require('../../config');

var imgs = [];
var imgsViewed = [];
var index = 0;
var saveImg = function (path) {
  wx.downloadFile({
    url: path, //仅为示例，并非真实的资源
    success: function (res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      }
    }
  })
};

Page({
  data: {
    img_url: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onPullDownRefresh: function () {
    var i = ++index < imgs.length ? index : 0;
    // wx.showLoading({
    //   title: '下一喵',
    // });
    console.log("index=" + index);
    this.setData({
      img_url: imgs[i].url
    })
    if (i == 0) {
      imgsViewed.splice(0, imgsViewed.length);
    }
    imgsViewed.push(imgs[i].url);
    index = i;
  },

  imgLoaded: function (e) {
    wx.stopPullDownRefresh();
  },

  gotoInfo: function () {
    wx.previewImage({
      urls: ["http://imglf4.nosdn.127.net/img/L2NybEptNG1rRnlXaW0xZW03Q0cwalQxY3NqMTZzUk5HZDlJVE5nSGpMbUswRnB2ZlJsS1dBPT0.jpg"]
    })
    // wx.showToast({
    //   title: '喵~',
    // })
  },

  copyValue: function () {
    wx.setClipboardData({
      data: 'chen2a2b@163.com',
      success: function (res) {
        wx.showToast({
          title: '拷贝email成功~',
        })
      }
    })
  },

  imgPreview: function () {
    wx.previewImage({
      current: imgsViewed[imgsViewed.length - 1],
      urls: imgsViewed,
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '喵喵',
      path: 'pages/index/index?url=' + encodeURIComponent(imgs[index].url),
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  actionImg: function () {
    wx.showActionSheet({
      itemList: ['收藏'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if (res.tapIndex == 1) {
            saveImg(imgs[index].url);
          }
          else if (res.tapIndex == 0) {
            wx.setStorage({
              key: imgs[index].url,
              data: 'obj',
              success: function () {
                wx.showToast({
                  title: '收藏成功',
                })
              }
            });
          }
        }
      }
    });
  },

  nextImg: function () {
    var i = ++index < imgs.length ? index : 0;
    wx.showLoading({
      title: '正在加载...',
    });
    console.log("index=" + index);
    this.setData({
      img_url: imgs[i].url
    })
    index = i;
  },

  onLoad: function (o) {
    console.log("xxx="+o.url)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     });
    //   }
    // })
    // }

    var value = wx.getStorageSync('new')
    if (!value)
    {
      wx.showModal({
        showCancel: false,
        title: 'Tips',
        content: '下拉页面查看下一张图片~',
        success: function()
        {
          wx.setStorage({
            key: 'new',
            data: 'true',
          })
        }
      })
    }

    var t = this;
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      url: config.service.getGifUrl,
      success: function (data) {
        imgs = data.data.result;
        if (o.url) {
          t.setData(
            {
              img_url: decodeURIComponent(o.url),
            }
          )
          imgsViewed.push(o.url);
        } else {
          t.setData(
            {
              img_url: data.data.result[index].url,
            }
          )
          imgsViewed.push(data.data.result[index].url);
        }
        wx.hideLoading();
      }
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
