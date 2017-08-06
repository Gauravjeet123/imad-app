console.log('Loaded!');
// change the text of main-text div
 var element = document.getElementById('main-text');//.innerHTML = 'NEW VALUE';

element.innerHTML ='New value';

// Move the image

var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight()
{
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
    
}



img.onclick = function(){
  
  // changing the CSS from Java Script
  var interval = setInterval(moveRight,50);
 // img.style.marginLeft = '100px';
  
 };