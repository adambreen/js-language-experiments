
function abc(){
    console.log('hello');
}
var obj = {
    method: abc
};
//1
abc.toString() === 'function abc(){console.log(\'hello\');}';
//2
obj.method.toString() === 'function abc(){console.log(\'hello\');}';

//The result of toString() on a function is, however, implementation-specific.
//Firefox, for instance, returns a 'compiled' version of a function, thus

function add(){

    return 2+3;

}

add.toString() === 'function add(){return 5;}';   //in Firefox
add.toString() === 'function add(){return 2+3;}'; //in node.js





