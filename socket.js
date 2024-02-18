const { all } = require("express/lib/application");

const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// var users = [];
var username = [];

io.on( "connection", function( socket ) {
    console.log( "A user connected" );
    
    socket.on("msg", function(data){
        io.emit("reply", data, username)
    })
    
    socket.on("allname", function(datas){
        username.push(datas);
        io.emit("allusers", username)
    })

    socket.on("disconnect", function(b){
        username.splice(username.indexOf,1)
        io.emit("disconnected", username)
    })
});


module.exports = socketapi;