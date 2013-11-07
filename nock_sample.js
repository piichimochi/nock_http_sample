var HOSTSERVER = 'http://192.168.1.2';
var HOSTPORT = 3000;
var HOSTPATH = '/data';
var http = require('http');

function MyClass () {
}

MyClass.prototype.postData = function(someValueToSend, callback) { 
  // Form the json body 
  var postData = {  
    json: someValueToSend
  };   

  var postDataString = JSON.stringify(postData);
 
  var options = {  
    host: HOSTSERVER, 
    port: HOSTPORT, 
    path: HOSTPATH, 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json', 
      'Content-Length': postDataString.length 
    }    
  };   
 
  // Set up request 
  var statusCode; 
  var request = http.request(options, function(response) { 
    var str = ""; 
    response.on("data", function (data) { str += data });
    response.on("end", function () {
      console.log("Got result from source for post: ", str);
      callback(str);
    });
    //callback(response.statusCode) 
  });  
 
  // Post data 
  request.write(postDataString); 
  request.end(); 
 
  request.on('error', function(error) { 
    console.log('Got an error during POST request: ' + error.message); 
    console.log( error.stack );
  }); 
};

MyClass.prototype.getData = function(inputData, callback) {
  var http = require ('http')
  http.get(HOSTSERVER + ":" + HOSTPORT + HOSTPATH, function(response) {
    var str = ""; 
    response.on("data", function(data) { str += data; }); 
    response.on("end", function() {
      console.log("Got Result from source: ", str);
      callback(str);
    }); 
  }); 
};

 
module.exports.MyClass = MyClass;
