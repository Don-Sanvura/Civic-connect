import {createServer} from 'node:http';import {createService,createHandler} from './app.js';
const port=Number(process.env.PORT??3000);if(!Number.isInteger(port)||port<1||port>65535){console.error('Invalid PORT');process.exit(1)}
let service;try{service=createService()}catch(e){console.error('Configuration error: '+e.message);process.exit(1)}
const server=createServer(createHandler(service));server.listen(port,'0.0.0.0',()=>console.log('CivicConnect listening on '+port));for(const sig of ['SIGINT','SIGTERM'])process.on(sig,()=>server.close(()=>process.exit(0)));
