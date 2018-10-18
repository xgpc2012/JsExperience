/**
 * Created by pc on 2017/9/12.
 */
//查询url字符串
var url1="http://mail.163.com/?a=1&b=2&c=3&d=xxx&e";
function querySearch(name,url){
    url=decodeURIComponent(url);
    var qstr=url.split("?")[1];
    var arr1=qstr.split("&");
    var obj={};
    
    arr1.forEach(function (item) {
        var iarr=item.split("=");
        obj[iarr[0]]=iarr[1];
    },this);
    return obj[name]?obj[name]:"";
}
console.log(querySearch("a",url1));

//获取最大公约数
function getMaxCommonDivisor(num1,num2){
    var minNum=num1>num2?num2:num1;
    var i=minNum;
    for(i;i>0;i--){
        if(num1%i==0&&num2%i==0){
            return i;
        }
    }
}

//获取最小公倍数
function getMinCommonMultiple(num1,num2){
    var worst=num1*num2;//最坏的情况
    var maxNum=num1<num2?num2:num1;
    var i=maxNum;
    for(i;i<=worst;i++){
        if(i%num1==0&&i%num2==0){
            return i;
        }
    }
}

//2
console.log(getMaxCommonDivisor(4,18));
//21
console.log(getMinCommonMultiple(3,7));
