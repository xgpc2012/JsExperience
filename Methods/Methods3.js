//对象深拷贝
function deepCopy(source) {
    let result = {};
    for (let key in source) {
        result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
    }
    return result;
}

let a = {
    "name": "1",
    "obj": {
        "t1": "1",
        "t2": "2"
    }
};

let b = deepCopy(a);

a.obj.t1 = "3";
//{ t1: '3', t2: '2' }
console.log(a.obj);

//{ t1: '1', t2: '2' }
console.log(b.obj);