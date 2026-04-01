// Import express
import express from 'express';
import http from 'http';
import {matchRouter} from "./routes/matches.js"
import { attachWebSocketServer } from "./ws/server.js";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT || 8000);
const HOST=process.env.HOST || '0.0.0.0';

const app = express();
const server=http.createServer(app);
// Middleware to parse JSON
app.use(express.json());


// Root GET route
app.get('/', (req, res) => {
  res.send('Hello! Your Express server is running.');
});

app.use('/matches',matchRouter);

const {broadcastMatchCreated}=attachWebSocketServer(server);
app.locals.broadcastMatchCreated=broadcastMatchCreated;

// Start server and log URL
server.listen(PORT,HOST, () => {
  const baseUrl=HOST==='0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;

  console.log(`Server is running at ${baseUrl}`);
  console.log(`WebSocket Server is running on ${baseUrl.replace('http','ws')}/ws`);
});
