
Page({

  /**
   * 页面的初始数据
   */
  //tableData:[[message,id]]
  data: {
    tableData: [],
    // tempData:'',
    inputValue:'',
    lastId:0,
    onfocus:true
  },

  onShow:function(){
    this.setData({
      onfocus:true,
    })
    console.log('focus')

  },
  confirm: function(event) {
    let addData = event.detail.value;
    addData = addData.replace(/(^\s*)|(\s*$)/g, "");
    if(addData.length > 0) {
      let addid = this.data.lastId,
          arr = [addData,addid];
      this.data.tableData.push(arr);
      this.setData({
        // tempData: event.detail.value,
        tableData: this.data.tableData,
        // tempData:'',
        inputValue:'',
        lastId:this.data.lastId + 1,
        onfocus:true

      })
      console.log(this.data.tableData);
    }
    else{
      wx.showToast({
        title: '没内容啊',
        image: '../../utils/alert.png'
      })
    }

  },

  // addList: function() {
  //   if(this.data.tempData !== '') {
  //     let addData = this.data.tempData,
  //         addid = this.data.lastId,
  //         arr = [addData,addid];
  //     this.data.tableData.push(arr);
  //     //this.data.lastId += 1;
  //     this.setData({
  //       tableData: this.data.tableData,
  //       tempData:'',
  //       inputValue:'',
  //       lastId:this.data.lastId + 1
  //     })
  //     console.log(this.data.lastId)

  //   }
  // },

  cancel: function(event) {
    //console.log(event)
    //必须使用currentTarget!!!
    console.log('id'+event.currentTarget.id);
    let pid = Number(event.currentTarget.id.slice(0,1)),
        listarr = this.data.tableData;
       // console.log('pid'+pid);
    for(let i = 0 ,len = listarr.length; i < len;i++){
      if(listarr[i][1] === pid){
          let temp = listarr.splice(i,1);
         // console.log('slice'+temp);
          break;
      }
    }
    //console.log('listarr'+listarr);
    this.setData({
      tableData : listarr
    })
   // console.log('tabledata is:'+ this.data.tableData);
   
  },
  goRand:function() {
    let mydata = this.data.tableData;
    if(mydata.length > 1){
      wx.setStorage({
        key: 'randData',
        data: mydata,
        success:()=>{
          console.log('成功写入缓存！');
        }
      })

      wx.navigateTo({
        url: '../comrand/comrand',
        success: function(res) {
          console.log('跳转成功！')
        },
        fail: function (res) { console.log('跳转失败！')},
        // complete: function(res) {},
      })
    }
    else{
      wx.showToast({
        title: '选择至少2种',
        image: '../../utils/alert.png',
      })
    }
   
  }

  


 
})