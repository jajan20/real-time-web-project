const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const dotenv = require('dotenv')
dotenv.load()

const username = process.env.NS_USERNAME
const password = process.env.NS_PASSWORD

const ejs = require('ejs')
const ns = require('ns-api') ({
	username: username,
	password: password
})

const stations = []
const messages = []

ns.stations(function(err, data) {
    getAllStationNames(data)
})

function getAllStationNames(data) {
  Object.keys(data).forEach((key) => {
    if (data[key].Land === 'NL') {
      stations.push(data[key].Namen.Lang)
    }
  })
}


app.set('view engine, ejs')
app.use(express.static('./public'))

app.get('/', function(req, res) {
	ns.storingen(function(err, data) {
    console.log(data)

      // console.log(stations)
      res.render('index.ejs', {data, stations, messages})
	})
})

io.on('connection', function(socket){
    socket.on('delay', function(data){
      messages.push({
        startStation: data.startStation,
        endStation: data.endStation,
        time: data.time,
        reason: data.delayReason
      })
      io.emit('delay', data)
  })
})

http.listen(8008, function(){
	console.log(`(ง ื▿ ื)ว 8008`)
})


