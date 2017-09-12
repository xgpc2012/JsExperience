/**
 * Created by pc on 2017/9/12.
 */
//利用Object原生的toString()方法来实现安全的类型检测
    
//检测数组
var isArray = function (value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}

//检测函数
var isFunction = function (value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}

//检测正则表达式
var isRegExp = function (value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}