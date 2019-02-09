require('./mongodb')
const config = require('./config/config.json')
const express = require('express')
const cors = require('cors')
const Store = require('./models/stores')
const Industry = require('./models/industries')
const bodyparser = require('body-parser')

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const csv = require('csv-parse');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: './uploads/' })
const request = require('request')


const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())
app.set('view engine', 'ejs');

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})


app.get('/apps/register', async (req, res) => {
  res.render('register')
});

app.post('/apps/register', async (req, res) => {
  console.log(req.body.name);
  console.log(req.body.description);
  try {
    var store = await Store.create({
      name: req.body.name,
      description: req.body.description,
      token: new Date().getTime().toString()
    })
    token = store.token;

    res.set('token', token);
    return res.send({ token: token })

  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/industries', async (req, res) => {
  try {
    var token = req.get('token')
    var store = await Store.findOne({ token })
    if (!store) {
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


app.get('/industries/upload/noauth', async (req, res) => {
  res.render('upload');
})

app.post('/industries/upload/noauth', upload.single('myfile'), function (req, res) {
  let filename = './' + req.file.path.toString();

  async function readrow(file) {
    return new Promise(function (resolve, reject) {
      fs.createReadStream(file)
        .pipe(csv())
        .on('data', (row) => {
          if (row[0] != 'name') {

            console.log(row[0]);
            console.log(row[1]);

            //Create in DB 
            new Promise(function (resolve, reject) {
              let industry = Industry.create({
                name: row[0]
              })
              console.log(industry);
              resolve(industry);
            });
          }
        })
      reject(new Error("There was an error"));

    })
      .catch(err => res.send(err))
  }
  readrow(filename);

})


module.exports = server
