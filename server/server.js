const http = require("http");
const app = require("./app");
require("dotenv").config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3004;
const connectDB = require("./api/config/db");
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 @ http://localhost:${PORT}`);
});
