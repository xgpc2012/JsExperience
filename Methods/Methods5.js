// 什么是防抖？什么是节流？
//
// 举例来说，比如要搜索某个字符串，基于性能考虑，肯定不能用户没输入一个字符就发送一次搜索请求，
// 一种方法就是等待用户停止输入，比如过了500ms用户都没有再输入，那么就搜索此时的字符串，这就是防抖；
// 节流比防抖宽松一些，比如我们希望给用户一些搜索提示，
// 所以在用户输入过程中，每过500ms就查询一次相关字符串，这就是节流。

//防抖
function debounce(fn, delay) {
    let handle;
    return function (e) {
        // 取消之前的延时调用
        clearTimeout(handle);
        handle = setTimeout(() => {
            fn(e);
        }, delay);
    }
}

function sayHi(e){
    console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', debounce(sayHi, 500));

//节流
function throttle(fn, delay) {
    let runFlag = false;
    return function (e) {
        // 判断之前的调用是否完成
        if (runFlag) {
            return false;
        }
        runFlag = true;
        setTimeout(() => {
            fn(e);
            runFlag = false;
        }, delay)
    }
}

function sayHi(e){
    console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi, 500));