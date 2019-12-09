const swarm = require("discovery-swarm");
const crypto = require("crypto");
const myId = crypto.randomBytes(32)
const getPort = require('get-port')


console.log(myId.toString('hex'));
const sw = swarm({ id: myId });
const allPeers = [];
getPort().then(port => {
    sw.listen(port, () => {
        console.log("Started at " + port);
        sw.join("fun-channel");
        sw.on('connection', (conn, info) => {
            console.log("received connection");
            if (info.initiator) {
                try {
                    conn.setKeepAlive(true, 600)
                } catch (exception) {
                    log('exception', exception)
                }
            }


            conn.on('data', data => {
                // Here we handle incomming messages
                log(
                    'Received Message from peer ' + peerId,
                    '----> ' + data.toString()
                )
            })

            conn.on('close', () => {
                console.log("disconnected");
            })

        })
    });
})


