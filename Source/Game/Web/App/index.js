import * as ko from "knockout";
import io from "socket.io/socket.io";

export class index
{
    constructor() {
        let socket = io.connect("http://localhost:3000");
        socket.on("Quiz", data => {
            console.log(data);
            socket.emit("MyOtherEvent", {my: "data"});
        });
    }
} 