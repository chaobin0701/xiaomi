(function(){

  var leftBtn = document.getElementsByClassName("swiper-button-prev")[0]
  var rightBtn = document.getElementsByClassName("swiper-button-next")[0]
  
  // 获取轮播图片数组
  var imgList = document.querySelectorAll('.swiper-slide-duplicate')
  // 获取小圆点数组
  var navList = document.querySelectorAll('.swiper-pagination-bullet')
  // 定义一个序号，用来控制当前轮播图的
  var currentIndex = 0
  
  var flag = true
  var timer = null

  // 定义入口函数
  var init = function(){    
    // 先改变第一张的轮播图片的透明度为1 显示出来
    imgList[currentIndex].style.opacity = 1     
    
    // 执行事件绑定函数
    initEvent();
    // 执行放大1.1倍的函数 初始动画
    runAnimation11();

    // 执行自动播放函数
    // 自动播放先执行放大1.5函数 再改变currentIndex的值 用新的值去执行放大1.1倍的函数
    // 由于init入口函数一开始就调用了放大1.1倍的函数 所以自动播放的函数执行顺序刚好可以接上
    autoRunAnimation()
  }


  // 定义一个事件绑定函数
  var initEvent = function(){
    // 按钮的划入划出
    leftBtn.addEventListener('mouseover',onleftBtnOver)
    leftBtn.addEventListener('mouseout',onleftBtnOut)
    rightBtn .addEventListener('mouseover',onrightBtnOver)
    rightBtn .addEventListener('mouseout',onrightBtnOut)

     //  通过箭头的父元素的id 给箭头绑定click事件函数
     arrowContainer.addEventListener('click', onArrowContainerClick)
    
     //  通过forEach循环给小圆点添加click事件函数 (icon图标点击事件)
     navList.forEach(function (node, index) {
       // bind()方法会创建一个新函数 this值给到传递的第一个函数 即node(也是点击的小圆圈)  并传递该node的index值
       node.addEventListener('click', onNavListClick.bind(node, index))
     })
  }

  // Btn按钮划入划出
  var onleftBtnOver = function(){
    leftBtn.style.backgroundPositionX = "167px" ; 
  }
  var onleftBtnOut = function(){ 
    leftBtn.style.backgroundPositionX = "249px" ; 
  }
  var onrightBtnOver = function(){
    rightBtn.style.backgroundPositionX = "125px" ; 
  }
  var onrightBtnOut = function(){
    rightBtn.style.backgroundPositionX = "208px" ;
  }

  /* 定义初始化动画自动运行函数 */
  var autoRunAnimation = function () { 
    // 开启定时器 运行放大1.5倍的函数、放大1.1倍的函数
     timer = setInterval(function () {
       runAnimation15('right')
       runAnimation11()
     }, 3000);
   }


  /* icon图标点击事件 */
   var onNavListClick = function (index) {
    
    // 停止正在运行的自动轮播定时器
    clearInterval(timer)
    // 判断 若flag为false  或  currentIndex(当前轮播图片的序号)等于index值的话 不运行函数
    if(!flag || currentIndex === index) return
    // 改变flag的值为false 关闭函数入口
    flag = false;

    
    //执行放大1.5倍的动画 (结束动画，执行与当前的图片 为下一张图片的出现做开始动画) 
    runAnimation15()
    // 改变currentIndex的值 为 index的值 
    currentIndex = index
    // 执行放大1.1倍的动画 和 开启自动轮播动画的定时器
    runAnimation11()
    autoRunAnimation()

    // 通过forEach循环 去除所有小圆圈的active类名
    navList.forEach(function (node) {
      node.classList.remove('active')
    })
    // 给当前this（当前this对象已经通过 bind方法 改变）的添加上avtive的类名
    this.classList.add('active')
  }


  /* 箭头点击事件函数 */
  var onArrowContainerClick = function (e) {
    //点击时 清除正在运行的定时器
    clearInterval(timer) 
    
    // 判断flag的状态 若flag为false 则不运行这个函数 若flag为true则继续运行
    if(!flag) return

    // 若继续运行 将flag的值改为false 关闭函数入口
    flag = false

    // 依次运行1.5倍函数 1.1倍函数 和开启自动轮播定时器函数
      // target : 自动判断我们点的是哪个元素 可返回事件的目标节点（触发该事件的节点）
      // 通过target判断触发节点 通过判断触发节点的target值 改变传入runAnimation15的参数
    console.log(e.target.classList.contains('arrow-left'))
    runAnimation15(e.target.classList.contains('arrow-left') ? 'left' : 'right')
    runAnimation11()
    autoRunAnimation()
  }



   /* 定义一个瞬间放大1.5倍的动画函数 */
  var runAnimation15 = function (direction) {
    // 放大当前的显示图片,放大1.5倍
    imgList[currentIndex].style.opacity = 0 ;
    imgList[currentIndex].style.transition = 'all .8s ease'
    
    // 记录一个值tempIndex 值是变换之前的currenIndex值
    var tempIndex = currentIndex

    /* 当动画完成之后 调整样式为空 */ 
    // 利用保存的tempIndex值和setTimeout函数的滞后处理，1s后删除上一个显示的图片的属性
    setTimeout ( function () {
      imgList[tempIndex].style = 'none'
      flag = true;
    },1000)
    

    // 根据传入的direction值 改变currentIndex值
    if (direction === 'right') {
      // 若direction值为'right'  则增加currentIndex的值 通过把增加后的currentIndex 模于 轮播图片数组的长度 使currentIndex的值不超出范围
      currentIndex = ++currentIndex % imgList.length;
    } else {
      // 若direction值不为'right'  则减少currentIndex的值 
      --currentIndex
      // 再判断减小后currentIndex的值是否小于0 若小于0则使currentIndex的值变为轮播图长度-1
      if (currentIndex < 0) {
        currentIndex = imgList.length - 1
      }
    }


    /*icon图标的样式处理*/
    // 对icon图标进行处理 先删除所有icon图标的active类名 再给当前的图标添加上icon图标
    navList.forEach(function (node) {
      node.classList.remove('active')
    })
    navList[currentIndex].classList.add('active')
  }


   /* 定义一个放大1.1倍的动画函数 */
  var runAnimation11 = function () {
  imgList[currentIndex].style.opacity = 1;
  imgList[currentIndex].style.transition = 'opacity 1s linear';
 }

  init()
})()