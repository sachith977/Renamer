var express = require('express');
var app = express();
var cors = require('cors');
bodyParser = require('body-parser');
const { PerformanceObserver, performance } = require('perf_hooks');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
var xmlparser = require('express-xml-bodyparser');
app.use(xmlparser());
var firebase = require('firebase');
var firebaseConfig = {
  apiKey: "AIzaSyBwAoFjqObWRLKp3LiOYUMGhd2XbUG2LvM",
  authDomain: "renamer-app.firebaseapp.com",
  databaseURL: "https://renamer-app.firebaseio.com",
  projectId: "renamer-app",
  storageBucket: "renamer-app.appspot.com",
  messagingSenderId: "2290676403",
  appId: "1:2290676403:web:5d61f62fdfa6ca813bb6c6",
  measurementId: "G-KVW21YWE1S"
};
firebase.initializeApp(firebaseConfig);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials:true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.post('/', function(req, res) {

  //var all_paths = req.body.fname;
  var all_paths =req.body.urlname;
  console.log("react urlname",req.body.urlname);
  var clean_all_paths = all_paths.replace(/\\/g, '/');
  console.log("Path: "+clean_all_paths);
  console.log("Generating!");
  var t0 = performance.now();
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python',['E:/RENAMER_FINAL/RENAMER/RENAMER-app-SDGP-master/python.py',JSON.stringify(clean_all_paths)]);
  

  pythonProcess.stdout.on('data', (data) => {
    
  
    });

    var fs = require('fs');
          var database = firebase.database();
          var acc=database.ref('/accuracy');
          acc.on('value',gotAccuracy)
          function gotAccuracy(data){
            var accuracy = data.val();
            if(accuracy!= null){
              console.log('Accuracy = '+accuracy+'%');
              var db = firebase.database();                   
              var survey = db.ref('/accuracy')
              survey.remove();
              var delete_accuracy=db.ref('/accuracy');
              delete_accuracy.remove();
              console.log("genarated!");
              var database = firebase.database();
              var ref = database.ref('/path');
              if(ref!=null){
                ref.on('value',gotOldData);
          
          
          function gotOldData(data){
          var path = data.val();
          if(path != null){
            length = path.length;
            half_length = length/2;
            old_array = [];
            for (i = 0; i < half_length; i++) {
              old_array.push(path[i]);
            }
          
            new_array = []
            for(k=half_length; k<length; k++){
              new_array.push(path[k]);
            }
            for (j=0;j<half_length;j++){
              for(p=j;p<half_length-1;p++){
                if(new_array[j]==new_array[p]){
                
                }
              
              }
            }
            for(i = 0; i<half_length;i++){
              fs.renameSync(old_array[i],new_array[i]);
              var db = firebase.database();                   
              var ref = db.ref();
              var survey = db.ref('/path')
              survey.remove();
              
          
          }
          console.log("Renamed!");
          var t1 = performance.now();
          var total_time = (t1 - t0)/1000
          total_time = total_time.toFixed(2);
          console.log("Time taken to rename: " +total_time+" seconds")
          
          

          }
          
          
        
          

        }
      }
    }
  }
  return;
});


  app.listen(3001, function () {

    console.log('Example app listening on port 3001');
});
