var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
'article-one': {
     title : 'Article one | Gauravjeet',
    heading : 'Article one',
    date : 'Aug 05, 2017',
    content :`<p>
                This is the content of my first article. This is the content of my first article
                 
            </p>`
},
'article-two' : {
    title : 'Article Two | Gauravjeet',
    heading : 'Article two',
    date : 'August 5, 2017',
    content :`<p>
                This is the content of my second article. This is the content of my  article
                 
            </p>`
              },
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
            ${date}
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

app.get('/:articleName', function (req , res){
    
    //articleName == article-one
    // articles[articleName] == {} content object for article one
    
    var articleName = req.params.articleName;
     res.send(createTemplate(articles[articleName]));
    
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

var names= [];
app.get('/submit-name', function(req, res){
    //get the name from request object
    var name = req.query.name;
    
    // ONCE we extract the name value we will concatenate the name value to the overall list of name
    names.push(name);
    
    // JSON JavaScript Object Notation --- A way of converting javaScript objects into Strings
    res.send(JSON.stringify(names)); // this will convert an array into string 

});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
