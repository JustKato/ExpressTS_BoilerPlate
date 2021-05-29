// Imports
import dotenv from "dotenv";

// Load in the dotconfig configuration
dotenv.config();

// The server's port
const SERVER_HOSTNAME : string = process.env.SERVER_HOSTNAME || '0.0.0.0';
const SERVER_PORT     : string = process.env.SERVER_PORT || '6990';

// Server configuration
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port:     SERVER_PORT,
};

// The whole configuration
const config = {
    server: SERVER,
    devmode: process.env.DEV_MODE || 0,
};

export default config;