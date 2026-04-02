import { WebSocket,WebSocketServer } from "ws";

// function sendJson(socket,payload){
//     if(socket.ready !== WebSocket.OPEN) return;

//     socket.send(JSON.stringify(payload));
// }
function sendJson(socket, payload){
    try {
        socket.send(JSON.stringify(payload));
    } catch (err) {
        console.error("Send error:", err);
    }
}

function broadcast(wss,payload){
    for (const client of wss.clients){
        if(client.ready !== WebSocket.OPEN) return;

        client.send(JSON.stringify(payload));
    }
}

export function attachWebSocketServer(server){
    const wss=new WebSocketServer({
        server,
        path:'/ws',
        maxPayloaad:1024*1024
    });

    wss.on('connection',(socket)=>{
        sendJson(socket,{type:'welcome'});

        socket.on('error',console.error);
    });

    function broadcastMatchCreated(match){
        broadcast(wss,{type:'match_created',data:match});

    }

    return {broadcastMatchCreated}
}