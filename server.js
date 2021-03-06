var express = require('express');
var morgan = require('morgan');
var path = require('path');


var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'gauravjeetchhabra',
    database: 'gauravjeetchhabra',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD  // environment variable 
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRandomSecretValue',            
    cookie : {maxAge: 1000 * 60 * 60 * 24 * 30 } 
}));


var articles = {
// 'article-one': {
//      title : 'Article one | Gauravjeet',
//     heading : 'Article one',
//     date : 'Aug 17, 2017',
//     content :`<p>
//                 This is the content of my first article. This is the content of my first article
//                  </p>`
//},
// 'article-two' : {
//     title : 'Article Two | Gauravjeet',
//     heading : 'Article two',
//     date : 'August 20, 2017',
//     content :`<p>
//                 This is the content of my second article. This is the content of my  article
                 
//             </p>`
//               },
'article-three' : {
    title : 'Article three | Gauravjeet',
    heading : 'Article three',
    date : 'Aug 05, 2017',
    content :`<p>
                This is the content of my third article. This is the content of my article
                This is the content of my third article. This is the content of my   article
            </p>`
              }
};

function createTemplate(data) {
    
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    
var htmlTemplate = `
    <!Doctype html>
<html>
    <head>
    <title>
         ${title}
    </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
     <div class="container">    
        <div>
            <a href="/">Home</a>
        </div>
       <hr/>
        <h3> 
           ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        
        <div>
           ${content}
        </div>
    </div> 
    </body>
</html>

`
;
return htmlTemplate;

}


app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input,salt){
    //How do we create a hash ?
    var hashed =crypto.pbkdf2Sync(input, salt, 10000, 512,'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
    //algorithm : md5
    //"password" ==> 98df74d3ad7777485f80e6fd51e5ada
    //"password-this-is-some-random-string" ==> 11e2d618bfb7ce20c7b6091f5566b53663ce39d
    //"password" ==>"password-this-is-a-salt" ==> <hash> ==<hash> * 10k times
    
    
}
app.get('/hash/:input',function(req , res){
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    // we will take username , password and this will create entry in user table
    //{"username":"gauravjeetchhabra","password":"password"} 
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
     pool.query('INSERT INTO "user" (username,password) VALUES ($1, $2)',[username, dbString], function(err, result){
       if(err){
           res.status(500).send(err.toString()); // make the error available
       } else {
           res.send("user successfully created" + username); //JSON.stringify(result.rows));
       }
     });
});
app.post('/login',function(req,res){
     var username = req.body.username;
    var password = req.body.password;
    
     pool.query('SELECT * FROM "user" WHERE username= $1', [username], function(err, result){
       if(err){
           res.status(500).send(err.toString()); // make the error available
       } else {
           if(result.rows.length === 0){
               res.send(403).send('username/password is invalid');
           }else{
               // match the password
               var dbString = result.rows[0].password;
               var salt =dbString.split('$')[2];
               var hasedPassword = hash(password , salt); // Creating a hashed based on the password submitted and the original salt
               if (hasedPassword == dbString){
                   
                   
                   // set a session
                 //  You have to set session before you send a response to client
                   req.session.auth = { userId: result.rows[0].id}; // we have to first set a session value before sending the response
                   res.send('credentials correct!');
                   //set a cookie with session id( that is generted randomly)
                    // internally on  the server side, it will maps the session id to an object
                    //{ auth: {userId }}
                    
               }else {
                   res.send(403).send('username/password is invalid');
               }
              //  res.send("user successfully created" + username); 
           }
          //JSON.stringify(result.rows));
       }
     });
});
    
app.get('/check-login',function(req, res){
    if(req.session && req.session.auth &&  req.session.auth.userId){
        res.send('You are logged in: '+ req.session.auth.userId.toString());
    }else{
        res.send('you are not logged in');
    }
});

app.get('/logout', function(req , res){
    delete req.session.auth;
    res.send('Logged out');
});


var pool = new Pool(config);
app.get('/test', function (req, res){
    //make a select request
    //return a response with the result
    pool.query('SELECT * FROM test', function(err, result){
       if(err){
           res.status(500).send(err.toString()); // make the error available
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
    
});

var counter = 0;
app.get('/counter', function (req, res) {
counter = counter + 1;
res.send(counter.toString());
});

var names = [];
app.get('/submit-name' , function (req,res) { //URL: /submit-name?name=xxxxx
//get the current name
var name = req.query.name; //to do

names.push(name);
//JSON JavaScript Object Notation
res.send(JSON.stringify(names));
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req , res){
    counter = counter + 1;
    res.send(counter.toString());
    
});
app.get('/favicon.ico', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

var names= [];
app.get('/submit-name', function(req, res){
    //get the name from request object
    var name = req.query.name;
    
    // ONCE we extract the name value we will concatenate the name value to the overall list of name
    names.push(name);
    
    // JSON JavaScript Object Notation --- A way of converting javaScript objects into Strings
    res.send(JSON.stringify(names)); // this will convert an array into string 

});


app.get('/articles/:articleName', function (req , res){
    
    //articleName == article-one
    // articles[articleName] == {} content object for article one
    
    //SELECT * FROM article WHERE title= '\';DELETE WHERE a= \'
    // every good libraries provide a way to insert PARAMETER INSIDE OUR SQL QUERY in a way that PARAMETER is safe 
   // pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName+"'", function(err,result){
        pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           if(result.rows.length === 0){
               res.status(404).send('Article not found');
           }else{
               var articleData=result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
    //var articleName = req.params.articleName;
    //  res.send(createTemplate(articleData));  //(articles[articleName]));
    
});

//app.get('/ui/favicon.ico', function (req, res) {
//res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
//});

//app.use('/ui',express.static(path.join(__dirname,'ui'));

app.get('/article-two',function (req , res){
     res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function (req , res){
     res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
