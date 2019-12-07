var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (mySocket) => {
    console.log("user connected");
    io.sockets.emit("newuser" , mySocket.id)
    mySocket.on("disconnect", () => {
        console.log("User disconnected");
    })
    mySocket.on("mystream", (msg) => {        
        io.sockets.emit("mystream", mySocket.id+"@"+msg);
    })
})

app.get("/", (req, res, next) => {
    res.sendfile(__dirname + "/simplepeer.html");
})

http.listen(process.env.PORT || 9001, () => {
    console.log("server started at 9001");
})
