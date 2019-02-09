require('./mongodb')
var config = require('./config/config.json')
var express = require('express')
var cors = require('cors')
var Store = require('./models/stores')
var Industry = require('./models/industries')
var bodyparser = require('body-parser')

//Added Daniel
var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
var readdir = util.promisify(fs.readdir);
var csv = require('csv-parse');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest: './uploads/'})
var request = require('request')
// var obj = csv();
//Added Daniel


var app = express()
var PORT = process.env.PORT || 5000

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())

var server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.post('/apps/register', async (req, res) => {
  try {
    var store = await Store.create({
      name: req.params.name,
      description: req.params.description,
      token: new Date().getTime().toString()
    })
    res.send({ token: store.token })

  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/industries', async (req, res) => {
  try {
    var token = req.get('token')
    var store = await Store.findOne({ token })
    if (!store) {
      res.render('/apps/register');
      return res.status(401).send()
    }

  } catch (error) {
    return res.status(401).send()
  }
  var data = await Industry.find()
  return res.send({ data })
})

app.get('/industries/:id', async (req, res) => {
  try {
    var token = req.get('token')
    var store = await Store.findOne({ token })
    if (!store) {
      return res.status(401).send()
    }
  } catch (error) {
    return res.status(401).send()
  }
  var data = await Industry.findById(req.params.id)
  return res.send(data)
})

app.post('/industries/upload', async (req, res) => {
  try {
    var token = req.get('token')
    var store = await Store.findOne({ token })
    if (!store) {
      return res.status(401).send()
    }

    //Code for uploading from CSV

    //First function to read
    console.log('Starting CSV');

    async function readrow(file) {
      return new Promise(resolve => {
        fs.createReadStream('mycsv.csv')
          .pipe(csv())
          .on('data', (row) => {
            if (row[0] != 'name') {

              console.log(row[0]);
              console.log(row[1]);
              try {

                var industry = Industry.create({
                  name: row[0]
                });
                res.send({ industry })
              } catch (error) {
                res.send(error)
              }
            }
          })
          .on('end', () => {
            //CSV file successfully processed
          });
      })
    }




    await readrow('readed');

    //First function to read END
  } catch (error) {
    return res.status(401).send()
  }
  // var data = await Industry.find()
  // return res.send({ data })

})


//
app.post('/test', upload.single('myfile'), function (req, res){


 console.log(req.file);
 console.log(req.file.path)

 var filename = './'+req.file.path.toString();

console.log(filename)
console.log(typeof(filename));


 async function readrow(file) {
  return new Promise(resolve => {
    console.log("STARTTTT @@@@@@@@@@@@@")
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        if (row[0] != 'name') {

          console.log(row[0]);
          console.log(row[1]);
          // try {

          //   var industry = Industry.create({
          //     name: row[0]
          //   });
          //   res.send({ industry })
          // } catch (error) {
          //   res.send(error)
          // }
        }
      })
      .on('end', () => {
        //CSV file successfully processed
      });
  })


  
}


readrow(filename);
})


module.exports = server
