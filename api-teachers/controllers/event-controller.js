const events = require("events");
emitter = new events.EventEmitter


class EventController {
    async connect(request, res){
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Connection-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
        })
        emitter.on('newMessage', (message) => {
            res.write(`412412`)
        })

        emitter.emit('newMessage', 111)
    }

}

module.exports = new EventController()