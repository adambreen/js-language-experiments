function showView(MetaData){

    getTemplate('http://www.templatepath.com', function(template){
        console.log('view name is:', MetaData.viewName);
    });

}

function getTemplate(templatePath, callback){
    //get the template from templatePath...
    var template = '<div>blah blah blah</div>';

    callback(template);
}

var metaData = {
    viewName: 'dashboard'
};

//the closure will have access to metaData's properties
showView(metaData);  // output: 'view name is: dashboard'



