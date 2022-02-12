/**
 * @description 老虎机游戏逻辑部分
 * @author pfan
 * 
  * * 调用方式：
 * 
 * 例如：import Machine from "./utils/machine.js"
 *
 *  wxss 文件需要引入 machine.wxss
 * `@import './utils/machine.wxss'`
 * 
 * wxml 文件需要引入 machine.wxml
 * 例如：<import src="utils/machine.wxml" />
 *      <template is = "machine" data="{{...machine}}"></template> 
 * 
 * js 中调用
 * 
 *   this.machine = new Machine(this, {
 *     height: 40,  //单个数字高度
 *     len: 10,     //单个项目数字个数
 *     transY1: 0,
 *     num1: 3,    //结束数字
 *     transY2: 0,
 *     num2: 0,    //结束数字
 *     transY3: 0,
 *     num3: 0,  //结束数字
 *     transY4: 0,
 *     num4: 1,  //结束数字
 *     speed: 24,  //速度
 *     callback: () => {
 *         //停止时回调        
 *     }      
 *   })
 */



export default class Machine {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.height = opts.height
    this.len = opts.len
    this.transY1 = opts.transY1
   
    this.transY2 = opts.transY2
 
    this.transY3 = opts.transY3

    this.endCallBack = opts.callback
  }

  start () {
    let { len, height, transY1, transY2, transY3,  endCallBack } = this
    let num1 = this.page.data.num1
    let num2 = this.page.data.num2
    let num3 = this.page.data.num3
    let speed = this.page.data.speed
    let totalHeight = height * len 
    let sRange = Math.floor(Math.random()*2 + 2)
    let halfSpeed = speed / 2
    // let endDis1 = num1 == 0 ? len * height : num1 * height
    // let endDis2 = num2 == 0 ? len * height : num2 * height
    // let endDis3 = num3 == 0 ? len * height : num3 * height
    let endDis1 = num1 * height
    let endDis2 = num2 * height
    let endDis3 = num3 * height
    let i1 = 1, i2 = 1, i3 = 1

    this.timer1 = setInterval(() => {
      let ret = this.transYFun(i1, endDis1, transY1, totalHeight, sRange, speed, halfSpeed)
      if (ret) {
        i1 = ret[0]
        transY1 = ret[1]
        let machine = this.page.data.machine
        machine.transY1 = transY1
        this.page.setData({
          machine
        })
      } else {
        clearInterval(this.timer1)
      }      
    }, 1000 / 60)

    setTimeout(() => {
      this.timer2 = setInterval(() => {
        let ret = this.transYFun(i2, endDis2, transY2, totalHeight, sRange, speed, halfSpeed)
        if (ret) {
          i2 = ret[0]
          transY2 = ret[1]
          let machine = this.page.data.machine
          machine.transY2 = transY2
          this.page.setData({
            machine
          })
        } else {
          clearInterval(this.timer2)
        }
      }, 1000 / 60)
    }, 200)    

    setTimeout(() => {
      this.timer3 = setInterval(() => {
        let ret = this.transYFun(i3, endDis3, transY3, totalHeight, sRange, speed, halfSpeed)
        if (ret) {
          i3 = ret[0]
          transY3 = ret[1]
          let machine = this.page.data.machine
          machine.transY3 = transY3
          this.page.setData({
            machine
          })
        } else {
          endCallBack("end");
          clearInterval(this.timer3)
        }
      }, 1000 / 60)
    }, 400)    

  }

  transYFun(i, endDis, transY, totalHeight, sRange, speed, halfSpeed) {
    if (i <= sRange) {
      transY -= speed 
      if (Math.abs(transY) > totalHeight) {
        transY = transY + totalHeight
        i++
      }
    } else if (i > sRange && i < sRange + 2) {
      transY -= halfSpeed
      if (Math.abs(transY) > totalHeight) {
        transY = transY + totalHeight
        i++
      }
    } else {
      // if (transY == -endDis)return  // 有小数点误差      
      if (Math.floor(transY + endDis) == 0 )return        
      let dropSpeed = endDis + transY < halfSpeed ? 1 : halfSpeed
      transY -= dropSpeed
      if (Math.abs(transY) > endDis) transY = -endDis
    }
    return [i, transY]

  }

}

