//const app = getApp()
Page({
  data:{
    Pos: [{ leftPos: 29, topPos: 61 }, { leftPos: 8, topPos: 63 }, 
      { leftPos: 19, topPos: 80 }, { leftPos: 40, topPos: 78 }, { leftPos: 59, topPos: 79 }, { leftPos: 49, topPos: 60 },
      { leftPos: 72, topPos: 63 }, { leftPos: 0, topPos: 43 }, { leftPos: 21, topPos: 43 }, { leftPos: 82, topPos: 47 },
      ],
    primPos: [{ leftPos: 29, topPos: 61 }, { leftPos: 8, topPos: 63 },
    { leftPos: 19, topPos: 80 }, { leftPos: 40, topPos: 78 }, { leftPos: 59, topPos: 79 }, { leftPos: 49, topPos: 60 },
    { leftPos: 72, topPos: 63 }, { leftPos: 0, topPos: 43 }, { leftPos: 21, topPos: 43 }, { leftPos: 82, topPos: 47 },
    ],
    animationData : {},
    yes: 0,
    no:0,
    outleft:'0.5rem',
    outbottom:'1rem'
  },
 
 //按键球跳动
  tapAnimate: function() {

     //设定落球为不显示，设置display更高效一点！
     this.setData({
       animationData:{},
       outleft: '0.5rem',
       outbottom: '1rem',
       no:0,
       yes:0
     })

     let alertAnswer = ()=> {

       let oddoreven = parseInt(Math.random()*100) % 2,
         // mycolor = ['rgba(235, 216, 111, 0.6)', 'rgba(107, 206, 235, 1)'],
           answer = (oddoreven === 1 ? 'Yes':'No');
       console.log(oddoreven)
       this.setData({
         no:!oddoreven,
         yes:oddoreven
       })

      //设置动画
       let animation = wx.createAnimation({
         duration: 300,
         timingFunction: 'ease-out',
       });

       this.animation = animation;
       animation.translate(0,20).step();
       animation.translate(0,-4).step();
       animation.translate(0, 20).step();
       this.setData({
         animationData: animation.export()
       });
       return answer;
    };
       
    //上升下降球,this是非箭头函数的this，极好,updown为1 上升，updown为0下降
    let upBall = (pos,i,step,updown) =>{
      let myleft = 'Pos['+i+'].leftPos',
          mytop = 'Pos[' + i + '].topPos';
          // step = Number(Math.random()*10 - 5);
      //console.log(this.toString())
      if(updown === 1){
        if(pos.topPos > 15 && pos.leftPos > -0.5 && pos.leftPos <= 82){
          pos.leftPos += step;
          pos.topPos -= 25;
          this.setData({
            [myleft]: pos.leftPos,
            [mytop]:  pos.topPos,
          })    
        }
        else{
          updown = 0;
        } 
      }
      else if(updown === 0){
        if (pos.topPos < this.data.primPos[i].topPos) {
          pos.topPos += 25;
          if (pos.leftPos !== this.data.primPos[i].leftPos) {
            pos.leftPos -= step;
          }
          this.setData({
            [myleft]: pos.leftPos,
            [mytop]: pos.topPos,
          })
        }
        else {
          updown = -1;
        }
      }

      else{
        return true;
      }
      setTimeout(() => { upBall(pos, i, step,updown); }, 0);
    }


    //左边距离的位置
    // let step = [-0.8,3,4,-2,-2.5,-1.5,-2.3,2.1,1,-2];
    let step = [-15.8, 18, 20, -18, -18.5, -16.5, -17.3, 16.1, 16, -18];
    for(let k = 0; k < 10 ; k++){
       let updown = 1;
       upBall(this.data.Pos[k], k,step[k],updown);
       //console.log(this.data.Pos[k]);
    }

  let promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
      let answer = alertAnswer();
      console.log(answer);
      resolve(answer);
    }, 1000);
    
  })
  promise.then((ans)=>{
    setTimeout(()=>{
      wx.showToast({
        title: ans,
        image: '../../utils/' + ans + '.png',
        mask: false
      });
    },800)
 
  });


  
  },
  // tapAnswer: function(){
  //   let answer = this.data.ballAns;
  //   wx.showToast({
  //     title: answer,
  //     image: '../../utils/' + answer + '.png',
  //     mask: false
  //   });
  //   this.setData({
  //     no:'none'
  //   })
  // }
 
})