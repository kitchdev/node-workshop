var request = require('request');


request('http://api.open-notify.org/iss-now.json', function(err, result){
    if(err){
        console.log('there was an error')
    }
    else{
        
        var actualObject = JSON.parse(result.body);
        // console.log(actualObject.iss_position.latitude.toFixed(2));
        
        
        console.log('the iss postion is: ', actualObject.iss_position.latitude.toFixed(2), actualObject.iss_position.longitude.toFixed(2));
    }
});