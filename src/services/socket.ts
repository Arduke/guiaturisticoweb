import io from "socket.io-client";

//const token =  localStorage.getItem("@GuiaTuristico::token")
//const socket = io("http://localhost:7777/", { transports: ['websocket'], autoConnect: false })
const socket = io("https://guia-turistico-api.herokuapp.com/", { transports: ['websocket'] })

export default socket;
