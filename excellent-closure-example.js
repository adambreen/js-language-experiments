function makeAddFunction(amount) {
    //function add(number) "captures" the value of amount at the time that makeAddFunction is called
    function add(number) {
        return number + amount;
    }
    return add;
}

var addTwo = makeAddFunction(2);
var addFive = makeAddFunction(5);
console.log(addTwo(1) + addFive(1)); //output = 9



//another nice example:
function greaterThan(x) {
    return function(y) {
        return y > x;
    };
}

var greaterThanTen = greaterThan(10);  //this is the same idea as Alex

console.log(greaterThanTen(9));