/**
 * Created by pc on 2017/9/12.
 */

//作用域安全的构造函数

function SomeClass(a, b, c) {
    if (this instanceof SomeClass) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    else {
        return new SomeClass(a, b, c);
    }
}

//即使意外没用new关键字也会返回一个对象实例
//避免在全局对象上意外设置属性
var a=SomeClass(1,2,3);
console.log(a);

//使用构造函数窃取模式会破坏继承
function Polygon(sides){
    if (this instanceof Polygon) {
        this.sides = sides;
        this.getArea = function(){
            return 0;
        };
    } else {
        return new Polygon(sides);
    }
}

function Rectangle(width, height){
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
    this.getArea = function(){
        return this.width * this.height;
    };
}

//结合原型链可以解决继承被破坏导致属性无法继承
Rectangle.prototype = new Polygon();
var rect = new Rectangle(5, 10);
console.log(rect.sides); //2