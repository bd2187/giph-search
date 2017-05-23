"use strict"

var searchGIF = document.querySelector('#searchGIF');

var GifRequest = {
  ajaxReq(url) {
    return new Promise( function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = handleData;
      xhr.send();

      function handleData() {
        if (xhr.status === 200 && xhr.readyState === 4) {
          var data = JSON.parse(xhr.responseText);
          resolve (data);
        } else {
          reject (xhr.statusText);
        }
      }
    } );
  }
};

var trendingGIFobj = Object.create(GifRequest);
trendingGIFobj.requestTrendingGifs = function() {
  var trendingGIFS = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
  this.ajaxReq(trendingGIFS)
  .then(function(val){
    console.log(val);
  })
  .catch(function(err){
    console.log(err);
  })
}

var searchGIFobj = Object.create(GifRequest);
searchGIFobj.searchGIFEvent = function() {
  return searchGIF.addEventListener('keyup', this.requestGIF);
};
searchGIFobj.requestGIF = function(e) {
  if (e.keyCode === 13) {
    searchGIFobj.ajaxReq(`http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=dc6zaTOxFJmzC`)
    .then(function(val){
      console.log(val);
    })
    .catch( function(err){
      console.log(err);
    } )
  }
}

trendingGIFobj.requestTrendingGifs();
searchGIFobj.searchGIFEvent();
