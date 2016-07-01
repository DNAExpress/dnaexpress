var eventControls = require('../../server/events/events_controller.js');
var express = require('express');
var app = express();
var $ = require('jquery');

describe('Event Controller', function () {
  describe('createEvent', function() {

    it('Should be a function', function () {
      expect(eventControls.createEvent).toBeDefined();
    });

    it('Should return a status of 200', function () {
      var statusCode;
      $.post( "/api/events/create", function( data ) {
        // $( ".result" ).html( data );
        console.log(data);
      });
      app.post("/api/events/create", function () {});
    });
  });
});
