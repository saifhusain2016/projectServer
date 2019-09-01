const express = require('express');
const hbs  = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname+'/'));

app.use((req,res,next) => {

  var now = new Date().toString();
  var log = `${now} \n ${req.method} \n ${req.url}`;
  console.log(log);

  fs.appendFile('server.log',log+'\n' , (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });

  next();

});

app.use((req,res,next) =>{
    res.render('maintainance.hbs');
});


app.get('/',(req,res) => {
    res.render('home.hbs',{
      pageTitle: 'Home Page',
      welcomeMessage: 'Hi!.. Welcome to Home Page..!!!',
      time: new Date().getFullYear()
    });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
      pageTitle: 'ABOUT PAGE',
      date: new Date().getFullYear()
    });
});

app.listen(8000);
