var HOSTSERVER = 'http://192.168.1.2';
var HOSTPORT = 3000;
var HOSTPATH = '/data';
var MyClass = require('../nock_sample').MyClass;
var http = require('http');
var request = require('request');
var assert = require('assert');
var nock = require('nock');

describe('MyClass', function () {

  var myClass = new MyClass();

  // POST 
  describe('postData()', function() {
    it('should expect 200 OK responses', function(done) {
       var someValueToSend = 10; 
       nock(HOSTSERVER + ":" + HOSTPORT)
         .post(HOSTPATH, '*')
         .reply(200, "OK world");

       myClass.postData(someValueToSend, function(response) {
         console.log("Got response from POST testing: " + response);
         //assert.equal(statusCode, 200)
       }); 

       done();
    })  
  }); 

  // GET 
  describe('getData()', function() {
    it('should return a string', function(done) {
       nock(HOSTSERVER + ":" + HOSTPORT)
         .get(HOSTPATH)
         .reply(200, "Hello World!");

       myClass.getData("meow", function(response) {
         console.log("Got response from testing: " + response);
       }); 

       done();
    })  
  });
});




