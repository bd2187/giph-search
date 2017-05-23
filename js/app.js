"use strict"

var searchEndpoint = "http://api.giphy.com/v1/gifs/search?q=psycho&api_key=dc6zaTOxFJmzC";

ajaxReq(searchEndpoint)
  .then(function(val){
    console.log(val);
  })
  .catch( function(err){
    console.log(err);
  } )



function ajaxReq(url) {
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
