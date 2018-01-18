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
      wx.showModal({
        title: 'Tips',
        content: '没有啦，待会再来~~',
        showCancel: false
      })
      imgsViewed.splice(0, imgsViewed.length);
      var t = this;
      wx.showLoading({
        title: '正在加载...',
      });
      console.log("refreshing...")
      wx.request({
        url: config.service.getGifUrl,
        success: function (data) {
          imgs = data.data.result;
          t.setData(
            {
              img_url: data.data.result[i].url,
            }
          )
          wx.hideLoading();
        }
      });
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
      data: 'miaomiao3098@163.com',
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
      console.log("xx"+res.target)
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

  // actionMenu: function () {
  //   wx.showActionSheet({
  //     itemList: ['转发'],
  //     success: function (res) {
  //       if (!res.cancel) {
  //         console.log(res.tapIndex)
  //         if (res.tapIndex == 0) {
  //           wx.showShareMenu({
  //             withShareTicket: true,
  //             complete: function ()
  //             {
  //               return {
  //                 title: '喵喵',
  //                 path: 'pages/index/index?url=' + encodeURIComponent(imgs[index].url),
  //                 success: function (res) {
  //                   // 转发成功
  //                   wx.showToast({
  //                     title: '转发成功',
  //                   })
  //                 },
  //                 fail: function (res) {
  //                   // 转发失败
  //                 }
  //               }
  //             }
  //           })
  //         }
  //       }
  //     }
  //   });
  // },

  onLoad: function (o) {
    var value = wx.getStorageSync('new')
    if (!value) {
      wx.showModal({
        showCancel: false,
        title: 'Tips',
        content: '下拉页面查看下一张图片~',
        confirmText: '知道了',
        success: function () {
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
