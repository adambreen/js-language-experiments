//This will throw 'ReferenceError: test is not defined' if 
//entered verbatim into the node cli.
//however, if it's run as a program entire, it works
//similar to Crockford's explication of vars being
//effectively all declared at the top of their scope.

var metaData = {
    viewName: 'dashboard',
    method: test   //not yet defined
};

function test(){
    console.log('test');
}

//--------------------------

metaData.method();