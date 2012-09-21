//Classes are state with functions

function Behaviour(config){
    this.config = config;

    this.doIt = function(itemToActOn){
        if(this.config.flag ){
            console.log('yes');
        } else{
            console.log('no');
        }
    }
}

//note the NEW keyword here:
var b = new Behaviour({flag: false});



//b.doIt($("item"));



