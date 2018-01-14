// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  bindViewTap: function() {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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