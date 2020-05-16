import express from "express";
import dotenv from "dotenv";
var cors = require('cors')
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use('/static', express.static(__dirname + '/img'));

export default server;