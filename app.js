// core node js pkgs
const fs = require('fs') //file system
const path = require('path')

const express = require('express')
const app = express()

// middleware, will be applied to all routes
//to parse request data coming from the browser
// urlencoded will set up a bodyparser, converts formData into JS object
app.use(express.urlencoded({ extended: false }))

app.get('/date', function (req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>')
})

app.get('/', function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Name: </label><input type="text" name ="username"/><button>Submit</button></form>',
  )
})

app.post('/store-user', function (req, res) {
  let user = req.body.username
  // __dirname - global node JS variable, holds absolute path to this dir
  const filePath = path.join(__dirname, 'data', 'users.json') //absolute path

  const fileData = fs.readFileSync(filePath) //the value is content interpreted as text
  const existingUsers = JSON.parse(fileData) //tranform it into JSON format

  existingUsers.push(user)
  fs.writeFileSync(filePath, JSON.stringify(existingUsers)) //writefilesync requires raw text so convert it back

  res.send('<h1>Username stored!</h1>')
})

// dynamic HTML responses
app.get('/users', function (req, res) {
  const filePath = path.join(__dirname, 'data', 'users.json')
  const fileData = fs.readFileSync(filePath)
  const existingUsers = JSON.parse(fileData)

  let resData = '<ul>'
  for (const user of existingUsers) {
    resData += '<li>' + user + '</li>'
  }

  resData += '</ul>'

  res.send(resData)
})

app.listen(3000)
