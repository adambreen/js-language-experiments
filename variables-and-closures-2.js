function showView(MetaData){

    getTemplate('http://www.templatepath.com', function(template){
        console.log('view name is:', MetaData.viewName);

        MetaData.method();
    });
}


function getTemplate(templatePath, callback){
    //get the template from templatePath...
    var template = '<div>blah blah blah</div>';

    callback(template);
}

function test(){
    console.log('test');
}

var metaData = {
    viewName: 'dashboard',
    method: test
};



//the closure will have access to metaData's properties, including methods
showView(metaData);
// output:
// view name is: dashboard
// test


