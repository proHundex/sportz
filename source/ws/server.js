import { WebSocket,WebSocketServer } from "ws";
import { wsArcjet } from "../arcjet";

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
         if (client.readyState !== WebSocket.OPEN) continue;
       sendJson(client, payload);
    }
}



export function attachWebSocketServer(server){
    const wss=new WebSocketServer({
        server,
        path:'/ws',
        maxPayload:1024*1024
    });

    wss.on('connection', async (socket,req)=>{ 
      if(wsArcjet){
        try {
            const decision = await wsArcjet.protect(req);
            const reason =decision.reason.isRateLimit() ? 'Rate limit exceeded ' : 'Access denied ';

            socket.close(code,reason);
            return;
        } catch (e){
            console.error('WS connection error',e);
            socket.close(1011,'Server security error');
            return;
        }
      }



        socket.isAlive=true;
        socket.on('pong',()=>{socket.isAlive=true; })
        sendJson(socket,{type:'welcome'});

        socket.on('error',console.error);
    });
    
        const interval=setInterval(()=>{
            wss.clients.forEach((ws)=>{
                if(ws.isAlive=== false)return ws.terminate();
                ws.isAlive=false;
                ws.ping();
            })
        },30000)

        wss.on('close',()=> clearInterval(interval));


    function broadcastMatchCreated(match){
        broadcast(wss,{type:'match_created',data:match});

    }

    return {broadcastMatchCreated}
}