//  //counter code
 
//  var button = document.getElementById('counter');
// // var counter = 0;
 
//  button.onclick = function ()
//  {
//      // create a request object
//      var request = new XMLHttpRequest();
     
//      // capture the response and store it in a variable
//      request.onreadystatechange = function (){
//          if (request.readyState === XMLHttpRequest.DONE){
//              // Take some action 
//              if(request.status === 200){
//                 var counter = request.responseText;
//                 var span = document.getElementById('count');
//                 span.innerHTML = counter.toString();
//              }
//          }
//          // not done anything
//      };
//         //Make a request to the counter endpoint
//      request.open('GET','gauravjeetchhabra.imad.hasura-app.io/counter',true);
//      request.send(null);
     
//      //Render the variable in the correct span
     
//      //counter=counter+1;
     
// };

//Counter Code
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function() {

//create a request to counter endpoint

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
if(request.readyState == XMLHttpRequest.DONE)
{
if(request.status==200)
{
var counter = request.responseText;
var span = document.getElementById('count');
span.innerHTML = counter.toString();
}
}
//not yet done - no action reqd
};

//make a request
request.open('GET','http://gauravjeetchhabra.imad.hasura-app.io/counter',true);
request.send(null);

};

//submit name

var nameInput = document.getElementById('name');
var name = nameInput.value;

var submit = document.getElementById('submit_btn');
submit.onclick = function () {

 //create a request to counter endpoint
var request = new XMLHttpRequest();
request.onreadystatechange = function () 
{
if(request.readyState == XMLHttpRequest.DONE)
{
if(request.status==200)
{
//capture a list of names and render it as a list
var names = ['name1','name2','name3','name4']  //request.responseText;
//names = JSON.parse(names);
var list = '';
for(var i=0;i< names.length; i++)
{
list +='' + names[i] + '';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
}
}
//not yet done - no action reqd
};
//make a request
// var nameInput = document.getElementById('n');
// var n = nameInput.value;
// request.open('GET','http://gauravjeetchhabra.imad.hasura-app.io/submit-name?name='+ n,true);
// request.send(null);
// };
