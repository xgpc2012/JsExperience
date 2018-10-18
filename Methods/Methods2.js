//将JSON参数字典排序
function getSortStr(data) {
    var sArr = [];
    for (var i in data) {
        sArr.push(i + '=' + data[i]);
    }
    sArr.sort();  // 数组排序
    return sArr.join('&');
}

var data={
    "mobileNo":"15827523228",
    "userId":"1",
    "cardNo":"6214830279228042"
};

console.log(getSortStr(data));