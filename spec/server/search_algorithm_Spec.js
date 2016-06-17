var searchAlgorithm = require('../../server/search/searchalgorithm');
var totalUserPrefs = searchAlgorithm.totalUserPrefs;
var histogram = searchAlgorithm.histogram;
var threeHeighest = searchAlgorithm.threeHeighest;
var percentage = searchAlgorithm.percentage;
var parseBestOptions = searchAlgorithm.parseBestOptions;

describe('totalUserPrefs', function(){

  it('Should be a function', function(){
    expect(totalUserPrefs).toBeDefined();
  });

  // it ('Should ')

});

describe('histogram', function(){

  it('Should be a function', function(){
    expect(histogram).toBeDefined();
  });

});

describe('threeHeighest', function(){

  it('Should be a function', function(){
    expect(threeHeighest).toBeDefined();
  });

});

describe('percentage', function(){

  it('Should be a function', function(){
    expect(percentage).toBeDefined();
  });

});

describe('parseBestOptions', function(){

  it('Should be a function', function(){
    expect(parseBestOptions).toBeDefined();
  });

});
