var express = require("express")
var app = express();

app.use("/public",express.static("public"))

app.listen(process.env.PORT || 9001, () => {
    console.log("server started");
})

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/simplepeernew.html");
})