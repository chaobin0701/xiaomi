(function(){
    var headerSearch = document.getElementsByClassName("search")[0]
    var headerSubmit = document.getElementsByClassName("submit")[0]
    var navItem = document.querySelectorAll(".nav-item")
    var text = document.querySelectorAll(".text")
    var itemChildren = document.querySelectorAll(".item-children")
    var cratIndex = document.querySelectorAll(".crat-index")
    var timer = null
    var index = 0
    var key = true
    // 定义入口函数
    var init = function () {
        initEvent();
        autoCartIndex()
    }

    // 事件绑定函数
    var initEvent = function(){
        // 顶部列表事件
        navItem.forEach(function(node){
            node.addEventListener('mouseover',onNavitemNavItemEnter)
            node.addEventListener('mouseout',onNavitemNavItemOut)
        });

        // 搜索按钮的悬停事件
        headerSubmit.addEventListener('mouseover',onHeaderSubmitOver)
        headerSubmit.addEventListener('mouseout',onHeaderSubmitOut)

        // 搜索框的悬停事件
        headerSearch.addEventListener('mouseover',onHeaderSearchOver)
        headerSearch.addEventListener('mouseout',onHeaderSearchOut)
    }

    var onNavitemNavItemEnter = function() {
        // 先全部删除带select的类名，再给鼠标划过的元素添加select类名
        var i = this.getAttribute("date-index")
        text.forEach(function(node){
            node.classList.remove('select')
        })
        text[i].classList.add('select')
        if(i <= 6){
            itemChildren[i].style.height = "230px"
            itemChildren[i].style.borderTop = "1px solid #e0e0e0"
            itemChildren[i].style.boxShadow = "0px 4px 4px 1px #e0e0e0"
        }

        /* border-top: 1px solid #e0e0e0; */
        /* box-shadow: 0px 4px 4px 1px #e0e0e0; */
    }

    var onNavitemNavItemOut = function() {
        text.forEach(function(node){
            node.classList.remove('select')
        })
        var i = this.getAttribute("date-index")
        
        if(i <= 6){
            itemChildren[i].style.height = "0px"
            itemChildren[i].style.borderTop = "none"
            itemChildren[i].style.boxShadow = "none"
        }
        
    }

    // 搜索按钮悬停事件
    var onHeaderSubmitOver = function(){
        headerSubmit.style.background = '#ff6700';
        headerSubmit.style.color = '#fff';
        headerSubmit.style.border = '1px solid #ff6700'
        headerSearch.style.border = '1px solid #ff6700'
    }
    var onHeaderSubmitOut = function(){
        headerSubmit.style.background = '#fff';
        headerSubmit.style.color = '#424242';
        headerSubmit.style.border = '1px solid #e0e0e0'
        headerSearch.style.border = '1px solid #e0e0e0'
    }

    //搜索框悬停事件
    var onHeaderSearchOver = function(){
        headerSubmit.style.border = '1px solid #ff6700'
        headerSearch.style.border = '1px solid #ff6700'
    }

    var onHeaderSearchOut = function(){
        headerSubmit.style.border = '1px solid #e0e0e0'
        headerSearch.style.border = '1px solid #e0e0e0'
    }

    // 加载
    var autoCartIndex = function(){
        setInterval(function(){
            
            if(index === 2){index = -1}
            cratIndex.forEach(function(node,index){
                node.classList.remove('select')      
            })
            ++index; 
            cratIndex[index].classList.add('select')
        },400)
    }

    init()
})()