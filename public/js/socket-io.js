// CLIENT SIDE JAVASCRIPT!!!!

(function() {
	var socket = io()
	var delays = document.getElementById('delays')
	var delayForm = document.getElementById('delayForm')
	var startStation = document.getElementById('start-station')
	var endStation = document.getElementById('end-station')
	var delayReason = document.getElementById('delayReason')
	var serverOffline = document.getElementById('serverOffline')
	var nsWebsite = "<a href='https://www.ns.nl/reisinformatie/actuele-situatie-op-het-spoor'>NS Reisinformatie</a>"

	// var timer = window.setInterval(function () {
 //    if (messages.length > 0)
 //        messages.shift()
 //    else
 //        window.clearInterval(timer);
	// }, 10 * 1000)

	delayForm.addEventListener('submit', function(event) {
		event.preventDefault()
		// console.log(delayReason.value)
		socket.emit('delay', {
			delayReason: delayReason.value,
			startStation: startStation.value,
			endStation: endStation.value,
			time: new Date().toLocaleString()
		})
		delayReason.value = ''
		startStation.value = ''
		endStation.value = ''
	})

	socket.on('delay', function(data) {
		var delay = document.createElement('article')
		delay.classList.add('user-delays')
		
		var delayHeader = document.createElement('h2')
		var singleMessage = document.createElement('p')
		var time = document.createElement('span')
		var date = new Date()
		
		
		delayHeader.innerHTML = data.startStation +" "+"-"+" "+ data.endStation
		singleMessage.innerHTML = data.delayReason
		time.innerHTML = date.toLocaleString()

		delays.append(delay)
		delay.append(delayHeader)
		delay.append(singleMessage)
		delay.append(time)
	})

	socket.on('connect_error', function() {
  		console.log('error')
  		serverOffline.innerHTML = `It seems our servers are experiencing some issues, we're trying to reconnect. When the server reconnects this message will disappear. In the meantime check out the ${nsWebsite} for information about delays.`
  		serverOffline.classList.remove('hide')
  	})

	socket.on('connect', function() {
    	console.log('succes!')
    	serverOffline.innerHTML = ''
    	serverOffline.classList.add('hide')
  })



})()
