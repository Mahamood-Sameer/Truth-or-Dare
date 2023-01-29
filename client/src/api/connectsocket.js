// sockets
import io from "socket.io-client";

export const connectsocket = async () => {
  const socket = await io.connect("http://localhost:5000", {
    transports: ["websocket"],
  });

  return socket;
};
