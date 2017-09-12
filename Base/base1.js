/**
 * Created by pc on 2017/9/12.
 */
//逻辑或返回第一个是 true 的操作数 或者 最后一个是 false的操作数
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
//逻辑与返回第一个是 false 的操作数 或者 最后一个是 true的操作数
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
//如果逻辑与和逻辑或作混合运算，则逻辑与的优先级高：
console.log(1 && 2 || 0); //2
console.log(0 || 2 && 1); //1
console.log(0 && 2 || 1); //1

console.log([] == false) //true
console.log({} == false) //false
console.log(Boolean([])) //true
console.log(Boolean({})) //true

console.log(false == '0');
console.log(false === '0');

console.log([] == 0);

var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;