// 数组扁平化
// ES6语法
// depth代表扁平化深度
function flattenDepth(array, depth = 1) {
    let result = [];
    array.forEach(item => {
        let d = depth;
        if (Array.isArray(item) && d > 0) {
            result.push(...(flattenDepth(item, --d)))
        } else {
            result.push(item)
        }
    });
    return result;
}

console.log(flattenDepth([1, [2, [3, [4]], 5]])); // [ 1, 2, [ 3, [ 4 ] ], 5 ]
console.log(flattenDepth([1, [2, [3, [4]], 5]], 2)); // [ 1, 2, 3, [ 4 ], 5 ]
console.log(flattenDepth([1, [2, [3, [4]], 5]], 3));// [ 1, 2, 3, 4, 5 ]