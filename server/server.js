import express from "express";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";
import cookieParser from "cookie-parser";
import loginRoutes from "./routes/loginRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import slideRoutes from "./routes/slideRoutes.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();

// Use static files under client/dist
app.use(express.static(join(__dirname, '../client/dist')));

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Request logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use("/api/login", loginRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/template", templateRoutes);
app.use("/api/slide", slideRoutes)

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist', 'index.html'));
});

// Connect to the database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit the process with an error code
    });

const sockets = [];

const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connect", (socket) => {
    sockets.push(socket);

    socket.on("message", (buffer) => {
        const message = buffer.toString();
        for (const recipient of sockets) {
            recipient.send(message)
        }
    })
})
// Start the server

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});

server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
        wsServer.emit("connect", socket, req)
    });
});