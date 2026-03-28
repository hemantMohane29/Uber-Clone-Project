const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} is already in use. Close the other Node/server using this port, or set PORT in .env to a free port (PowerShell: $env:PORT=3001; node server.js).`
    );
    process.exit(1);
  }
  throw err;
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

