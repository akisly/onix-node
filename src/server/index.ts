import http from "http";
import server from "./server";
import events from "./events";

const port: number = server.get("port");

events.bind(http.createServer(server).listen(port), port);