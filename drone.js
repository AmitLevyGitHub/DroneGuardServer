const { drone, droneHost, dronePort, io } = require('./config')

drone.send('command', 0, 7, dronePort, droneHost, (err, success) => {
	if (err) {
		console.log(err)
	}
})

const keepAlive = () => {
	drone.send('command', 0, 7, dronePort, droneHost, err => {
		if (err) console.log(err)
	})
}

let interval
io.on('connection', socket => {
	socket.on('command', command => {
		if (command === 'takeoff') interval = setInterval(keepAlive, 10000)
		if (command === 'land') clearInterval(interval)
		console.log(command)
		drone.send(command, 0, command.length, dronePort, droneHost, err => {
			if (err) console.log(err)
		})
		io.emit('command', command)
	})
})
