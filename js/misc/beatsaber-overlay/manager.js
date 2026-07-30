"use strict";
function connect() {
    let ip = query.get("ip") || "localhost";
    let port = query.get("port") || 6557;
    let socket = new WebSocket(`ws://${ip}:${port}/socket`);
    socket.addEventListener("open", () => console.log("WebSocket opened"));
    socket.addEventListener("message", (message) => {
        let data = JSON.parse(message.data);
        let event = events[data.event];
        if (event) {
            event(data.status, data.time);
        }
    });
    socket.addEventListener("close", () => {
        console.log("Failed to connect to server, retrying in 3 seconds");
        setTimeout(connect, 3000);
    });
}
connect();
//# sourceMappingURL=manager.js.map