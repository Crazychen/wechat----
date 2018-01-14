// pages/view/view.js
var imgs = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    var t = this;
    wx.getStorageInfo({
      success: function (res) {
        wx.hideLoading();
        t.setData({
          imgs: res.keys,
        });
        imgs = res.keys;
      },
    })
  },

  imgPreview: function (e) {
    wx.previewImage({
      urls: imgs,
    })
  },

  actionImg: function (e) {
    var t = this;
    wx.showActionSheet({
      itemList: ['删除收藏'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if (res.tapIndex == 1) {

          }
          else if (res.tapIndex == 0) {
            wx.removeStorage({
              key: e.target.dataset.imgsrc,
              data: 'obj',
              success: function () {
                wx.showToast({
                  title: '删除成功',
                });
                //
                wx.getStorageInfo({
                  success: function (res) {
                    wx.hideLoading();
                    t.setData({
                      imgs: res.keys,
                    });
                    imgs = res.keys;
                  },
                })
                //
              }
            });
          }
        }
      }
    });
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