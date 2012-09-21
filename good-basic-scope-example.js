//A FUNCTION is the only thing that creates a new scope (ie. closure)

var something = 1;
{
    var something = 2;
    print("Inside: " + something);
}
print("Outside: " + something);

//output:
// 2
// 2



//Compare with

var variable = "top-level";
function parentFunction() {
    var variable = "local";
    function childFunction() {
        print(variable);
    }
    return childFunction;
}

var child = parentFunction();
child();

//output:
// local

// (the closure has captured the local variable)

//This is true even for simple functions:
var a = 10
function decrement(value){
    --value;
}
decrement(a);
a;
//output:
// 9
// 10    ... a has not changed


//Also note:

var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};

show(object1 == object2);
show(object1 == object3);

object1.value = 15;
show(object2.value);   //15   - object and object2 reference the SAME value. object1 === object2
show(object3.value);

//Faster way to Array.pop:
var a = [1,2,3,4,5];
a.length = 2;
a == [1,2]; //true



function map(array, f){
    var result = [];
    forEach(array, function(element){
       result.push(f(element));
    });
    return result;
}

function reduce(combine, base,array){
    forEach(array, function(element){
        base = combine(base,element);
    });

    return base;
}

function isZero(a){ return a == 0  ?1 : 0; }

function addIfZero(base, a){
    return base + a == 0 ? 1 : 0;
}


function countZeroes(array){
    return reduce(addIfZero, 0, array);

}

function countZeroes(array){
    return reduce(function(base, a){
        return base + (a == 0 ? 1 : 0);
    }, 0, array);
}



function forEach(array, action){
    for(i=0; i<array.length; i++){
        action(array[i]);
    }
}



function count(array, f){
    function returnFunction(){
        var number = 0;
        forEach(array, function(a){
            number += (f(a) ? 1 : 0);
        });

        return number;
    }

    return returnFunction;
}

function countZeroes(array){
    return reduce(count(array, function(a){ return a==0; }), 0, array);
}

countZeroes([0,0,0]);




