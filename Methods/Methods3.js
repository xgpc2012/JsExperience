//对象深拷贝
var a = {
    "name": "1",
    "obj": {
        "t1": "1",
        "t2": "2"
    }
};

var b = deepCopy(a);

function deepCopy(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
    }
    return result;
}

a.obj.t1 = "3";
//{ t1: '3', t2: '2' }
console.log(a.obj);

//{ t1: '1', t2: '2' }
console.log(b.obj);