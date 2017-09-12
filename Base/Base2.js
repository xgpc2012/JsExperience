/**
 * Created by pc on 2017/9/12.
 */
for (var i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', (function(index) {
        return function(){
            console.log(index);
        }
    })(i));
    document.body.appendChild(btn);
}

console.log(1 +  "2" + "2");
console.log(1 +  +"2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);