function showView(MetaData){
    getTemplate('http://www.templatepath.com', function(template){
        MetaData.getMethod()('test');  //note the TWO ()s ... one to return the function, the second to call it
    });
}


function getTemplate(templatePath, callback){
    //get the template from templatePath...
    var template = '<div>blah blah blah</div>';

    callback(template);
}


var metaData = {
    viewName: 'dashboard',
    getMethod: function(){ return test; }
};

function test(string){
    console.log(string);
    console.log('context: ', this);
}


showView(metaData); //output: 'test'


