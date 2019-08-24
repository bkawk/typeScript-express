const sockets = function(io: any) {

  io.on("connection", function(socket: any) {
    console.log("a user connected");
      // whenever we receive a 'message' we log it out
      socket.on("message", function(message: any) {
        console.log(message);
      });
  });
      
}

export = sockets;
