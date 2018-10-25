// 轮播图
// 每个网站包括苹果都有的轮播图组件（什么是组件）
/*
1. 写一个 div 里面有 3 个 img 标签
2. 只显示当前活动的 img 标签
3. 加 1 个按钮，点击的时候切换图片
*/

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // 上一张 offset 是 -1
    // 下一张 offset 是 1
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click')
        var button = event.target
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var showImageAtIndex = function(slide, index) {
    log('slide', index, slide)
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 注意, 尽管 js 支持字符串和数字直接相加, 但是我们不要这么做
    // 因为非常容易出 bug, 所以要转成同一个类型才能相加
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'gua-active'
    removeClassAll(className)
    log('remove class', nextSelector)
    var img = e(nextSelector)
    log('next img')
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    removeClassAll('gua-white')
    // 2. 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('gua-white')
}

var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        var self = event.target
        var index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        var slide = self.closest('.gua-slide')
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.gua-slide')
    // 默认是播放下一张, 下一张的 offer 是 1, 直接传
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    var clockId = setInterval(function() {
        // 每 2s 都会调用一次
        playNextImage()
    }, 2000)
}

bindEventSlide()
bindEventIndicator()
autoPlay()


// 第一个参数是定时会被调用的函数
// 第二个参数是延迟的时间, 以毫秒为单位, 1000 毫秒等于 1 秒
// setTimeout 只会执行一次
// log('开始时间', new Date())
// setTimeout(function() {
//     log('时间到', new Date())
// }, 2000)

// setInterval 会无限执行函数
// setTimeout 和 setInterval 函数都会有一个返回值
// 返回值可以用来清除定时函数
// var clockId = setInterval(function() {
//     log('时间到', new Date())
// }, 1000)

// setTimeout 和 setInterval 函数都会有一个返回值
// 返回值可以用来清除定时函数
// log('clock id', clockId)
// clearInterval(clockId)
// clearTimeout(clockId)


// var f = function() {
//     var clockId = setTimeout(function() {
//         if (满足什么条件) {
//             f()
//         } else {
//             // 清除定时器
//             clearTimeout(clockId)
//         }
//     }, 300)
// }
// f()
