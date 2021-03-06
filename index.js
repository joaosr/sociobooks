var express = require("express");
var app = express();
var path = require("path");

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(path.join(__dirname+'/static')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

// console.log("http://localhost:3000");
//
// //app.listen(3000);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
