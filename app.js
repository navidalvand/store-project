const { Server } = require("./src/server/server.js");
require('dotenv').config()
const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI

new Server(PORT , DB_URI)

