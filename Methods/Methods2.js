//将JSON参数字典排序
function getSortStr(data) {
    var sArr = [];
    for (var i in data) {
        sArr.push(i + '=' + data[i]);
    }
    sArr.sort();  // 数组排序
    return sArr.join('&');
}
