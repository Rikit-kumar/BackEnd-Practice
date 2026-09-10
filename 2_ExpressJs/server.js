// Through HTTP

// const http = require("http");

// const server = http.createServer((req, res) => {
// //   res.end("got the response");

//     if(req.url === "/"){
//         res.end('got the response')
//     }

//     if(req.url === "/product"){
//         res.end('got product API')
//     }

//     if(req.url === "/create"){
//         res.end('got create API')
//     }

// });

// const port = 3000;
// server.listen(port, ()=>{
//     console.log(`Server is runing on port ${port}`)
// })

// -----------> Throught Express <-------------

const express = require("express");
const app = express();
app.use(express.json());

let allUsers = [];

app.get("/", (req, res) => {
  res.send("Hey you reached here");
});

app.get("/users", (req,res)=>{
    res.send(allUsers);
})

app.post("/create", (req, res) => {
  let users = req.body;
  allUsers.push(users)
  res.send(allUsers);
});

app.put("/update/:id", (req,res)=>{
    let {id} = req.params;
    let {name} = req.body;

    let updatedUsers = allUsers.map((val)=> val.id === id ? {...val, name} : val);
    allUsers = updatedUsers;
    res.send(allUsers);
})

app.delete("/delete/:id", (req,res)=>{
    let {id} = req.params;
    let user = allUsers.filter((val)=> val.id !== id);
    allUsers = user;

    res.send("User deleted Successfully")
})

const port = 3000;
app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
