// //Counter Code
// var button = document.getElementById('counter');
// var counter = 0;

// button.onclick = function() {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () 
//     {
//      if(request.readyState == XMLHttpRequest.DONE)
//     {
//      if(request.status === 200){
//             var counter = request.responseText;
//             var span = document.getElementById('count');
//             span.innerHTML = counter.toString();
//         }
//     }
//     //not yet done - no action reqd
// };
// //Make a request to counter endpoint
// request.open('GET','http://gauravjeetchhabra.imad.hasura-app.io/counter', true);
// request.send(null);
// };
//submit name

// var nameInput = document.getElementById('name');
// var name = nameInput.value;
// submit username/password to login 
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    //create a request
        var request = new XMLHttpRequest();
        
        //capture the response nd store it in a variable
        request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE)
    {
     if(request.status === 200)
        {
            //console.log('user logged in');
            alert('Logged in successfully');
        }else if(request.status === 403){
            alert('username/password is incorrect');
        }else if(request.status === 500){
            alert('Something went wrong on the server');
        }
            
            // var names =request.responseText;
            // names = JSON.parse(names); // converting from string back into an object/array
            //  var list = '';
            // for(var i=0; i< names.length; i++)
            // {
            //     list +='<li>' + names[i] + '</li>';
            // }
            // var ul = document.getElementById('namelist');
            // ul.innerHTML = list;
            // var counter = request.responseText;
            // var span = document.getElementById('count');
            // span.innerHTML = counter.toString();
        }
  //  }
    //not yet done - no action reqd
};

//make a request
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
// var nameInput = document.getElementById('name');
// var name = nameInput.value;
request.open('POST','http://gauravjeetchhabra.imad.hasura-app.io/login',true); //  /submit-name?name=' +name, true);
request.setRequestHeader('content-type','application/json');
request.send(JSON.stringify({username  : username , password : password}));

};


//submit name

// var nameInput = document.getElementById('name');
// var name = nameInput.value;
// var submit = document.getElementById('submit_btn');
// submit.onclick = function () {

 //create a request to counter endpoint
// var request = new XMLHttpRequest();
// request.onreadystatechange = function () 
// {
//   if(request.readyState == XMLHttpRequest.DONE)
//     {
//       if(request.status==200)
//       {
//capture a list of names and render it as a list
        //var names = ['name1','name2','name3','name4'];  //request.responseText;
//names = JSON.parse(names);
        // var list = '';
        // for(var i=0; i< names.length; i++)
        // {
        //     list +='<li>' + names[i] + '</li>';
        // }
        //     var ul = document.getElementById('namelist');
        //     ul.innerHTML = list;
      //}
    //}
        //not yet done - no action reqd
//};
//make a request
// var nameInput = document.getElementById('n');
// var n = nameInput.value;
// request.open('GET','http://gauravjeetchhabra.imad.hasura-app.io/submit-name?name='+ n,true);
// request.send(null);
// };
// };