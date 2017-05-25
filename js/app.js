"use strict";

var GifRequest = {
  requestPromise(url) {
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
  },
  ajaxRequest(endpoint) {
    this.requestPromise(endpoint)
    .then(function(val){
      var gifsArr = val.data;
      console.log(gifsArr);
      displayGifs.generateHTML(gifsArr);
    })
    .catch(function(err){
      console.log(err);
    });
  }
};

var displayGifs = {
  generateHTML(gifs = []) {
    var ul = document.querySelector('#trending ul');
    ul.innerHTML = gifs.map( this.display ).join('');
  },
  display(gif) {
    var gifURL = gif.images.downsized.url;
    return `
      <li>
        <a href="${gifURL}">
          <img src="${gifURL}" alt="#">
        </a>
      </li>
    `;
  }
};

var trendingGifs = Object.create(GifRequest);
var trendingEndpoint = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=50";

trendingGifs.ajaxRequest(trendingEndpoint);

var searchedGifs = Object.create(GifRequest);
searchedGifs.inputListener = function() {
  var self = this;
  var searchInput = document.querySelector('#searchInput');
  function searchCB(e) {
    if (e.keyCode === 13) {
      var searchEndpoint = `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=dc6zaTOxFJmzC&limit=50`;
      self.ajaxRequest(searchEndpoint);
    }
  }
  searchInput.addEventListener('keyup', searchCB);
}

searchedGifs.inputListener();
