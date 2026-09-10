// console.log("Hello From Backend")

let http = require('http');

let server = http.createServer((req, res)=>{
    
    res.end('Server is Created');
})

const port = 3000;
server.listen(port, ()=>{
    console.log(`Server is Running in Port ${port}`);
})