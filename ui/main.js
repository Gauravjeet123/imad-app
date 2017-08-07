 //counter code
 
 var button = document.getElementById('counter');
// var counter = 0;
 
 button.onclick = function ()
 {
     // create a request object
     var request = new XMLHttpRequest();
     
     // capture the response and store it in a variable
     request.onreadystatechange = function (){
         if (request.readyState === XMLHttpRequest.DONE){
             // Take some action 
             if(request.status ===200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
             }
         }
         // not done anything
     };
        //Make a request to the counter endpoint
     request.open('GET','gauravjeetchhabra.imad.hasura-app.io/counter',true);
     request.send(null);
     
     //Render the variable in the correct span
     
     //counter=counter+1;
     
};