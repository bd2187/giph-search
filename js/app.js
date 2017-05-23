"use strict"

var searchGIF = document.querySelector('#searchGIF');

var searchGIFobj = {
  searchGIFEvent() {
    return searchGIF.addEventListener('keyup', this.requestGIF);
  },
  requestGIF(e) {
    if (e.keyCode === 13) {
      var searchEndpoint = `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=dc6zaTOxFJmzC`;
      searchGIFobj.ajaxReq(searchEndpoint)
      .then(function(val){
        console.log(val);
      })
      .catch( function(err){
        console.log(err);
      } )
    }
  },
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
}

searchGIFobj.searchGIFEvent();
