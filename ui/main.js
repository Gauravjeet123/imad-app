console.log('Loaded!');
// change the text of main-text div
var element = document.getElementById('main-text');

element.InnerHTML = 'New value';

// Move the image

var img = document.getElementById('img');
img.onclick = function(){
  
  // changing the CSS from Java Script
  img.style.marginLeft = '100px';
};