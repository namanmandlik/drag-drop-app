const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(8000, () => {
console.log('Server started!');
});

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

var multer  =   require('multer');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
      console.log(file);
    callback(null, file.originalname);
  }
});

app.post('/api/file',function(req,res){
    var upload = multer({ storage : storage}).single('file');
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.send(200, req.file.originalname);
    });
});