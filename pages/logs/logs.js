//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: 0,
    logdata:''
  },
  onLoad: function () {
    this.setData({
      logs: wx.getStorageSync('usetime') || 0 
      })
    let mylog = this.data.logs;
    if(mylog !== 0){
      this.setData({
        logdata : 'CHOOSE4U 已经帮你做了'+ mylog + '次选择啦~~ 嘻嘻 '
    })
   }
   else{
      this.setData({
        logdata: '欢迎使用CHOOSE4U~~ '
      })
   }

  }
})
