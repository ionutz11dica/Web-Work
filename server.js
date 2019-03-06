const http = require('http');
const api = require('./api')

const port = process.env.PORT || 4000;

const server = http.createServer(api);

server.listen(port,()=>{
    console.log('Server listen on port '+port)
})