import { io } from "socket.io-client";
const socket = io.connect("https://stingy-experienced-tv.glitch.me/");
export default socket;