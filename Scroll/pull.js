/**
 * Created by pc on 2017/5/24.
 */
var data,
    myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset;

function pullDownAction() {
    console.log("下拉刷新");
}

function pullUpAction() {
    console.log("上拉加载");
}
 
//初始化绑定iScroll控件 
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    /**
     * 初始化iScroll控件
     */
    myScroll = new iScroll('wrapper', {
        useTransition: true,   //表示是否使用css3中的过渡效果，默认为true;
        topOffset: pullDownOffset,//pullDown区间高度
        hScrollbar: false, //false隐藏水平方向上的滚动条
        vScrollbar: false,// false 隐藏垂直方向上的滚动条
        onRefresh: function () {  //刷新方法
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                $("#pullUp").hide();
            }
        },
        //onScrollMove：主要表示根据用户下拉或上拉刷新的高度值,来显示不同的交互文字;
        onScrollMove: function () {  //手指触摸事件
            //this.y:表示手指下拉的高度
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < -55 && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                $("#pullUp").show();
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        //onScrollEnd:表示用户下拉刷新完,放开手指时所显示的不同的交互文字
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction();
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(); 
            }
        }
    });
}