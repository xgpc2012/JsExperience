/**
 * Created by pc on 2017/9/12.
 */

//利用Object原生的toString()方法来实现安全的类型检测
//检测数组
function isArray(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}
//检测函数
function isFunction(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}
//检测正则表达式
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}
var a=[1,2];
console.log(isArray(a));//true