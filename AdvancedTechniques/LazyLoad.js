/**
 * Created by pc on 2017/9/12.
 */

// 惰性载入表示函数执行的分支仅会发生一次。有两种实现惰性载入的方式
// 第一种就是在函数被调用时再处理函数。
// 在第一次调用的过程中，该函数会被覆盖为另外一个按合适方式执行的函数，
// 这样任何对原函数的调用都不用再经过执行的分支了
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        createXHR = function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined") {
        createXHR = function () {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function () {
            throw new Error("No XHR object available.");
        };
    }
    return createXHR();
}

//第二种实现惰性载入的方式是在声明函数时就指定适当的函数。
//这样，第一次调用函数时就不会损失性能了
//而在代码首次加载时会损失一点性能。
var createXHR = (function () {
    if (typeof XMLHttpRequest != "undefined") {
        return function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined") {
        return function () {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        return function () {
            throw new Error("No XHR object available.");
        };
    }
})()