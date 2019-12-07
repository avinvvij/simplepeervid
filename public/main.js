var Peer = require('simple-peer');
var wrtc = require('wrtc');

var peer1 = new Peer({
    initiator: window.location.hash === "#init" ? true : false, wrtc: wrtc, trickle: false,
    reconnectTimer: 100,
    iceTransportPolicy: 'relay', config: {
        iceServers: [
            {
                urls: "stun:numb.viagenie.ca"
            },
            {
                urls: "turn:numb.viagenie.ca",
                username: "avinvij26@gmail.com",
                credential: "avinvij"
            }
        ]
    }
})
peer1.on("signal", function (data) {
    document.getElementById("myId").value = JSON.stringify(data);
})

document.getElementById("connect").addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value);
    peer1.signal(otherId);
    console.log("otherId: " + otherId)
})

document.getElementById("send").addEventListener("click", function () {
    var yourmessage = document.getElementById("message").value;
    peer1.send(yourmessage);
})

peer1.on("data", function (data) {
    console.log(data);
    document.getElementById("chatmsgs").innerHTML = "<label>" + data + "</label><br/>" + document.getElementById("chatmsgs").innerHTML
})