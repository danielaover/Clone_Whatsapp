<b>🚀 Projeto Clone_Whatsapp</b>

#
💻 Utilizei HTML, CSS, Javascript, React e Socket.io como backend. 💻<br>
#
Segue o arquivo para o backend:

npm init -y<br>
npm i express socket.io nodemon

>> Crie a pasta <br>
(src/server.js)<br>
Pasta src/server.js 


const express = require ('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;


const users = [];


io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    })


socket.on("join", (name) => {
const user = {id: socket.id, name};
users.push(user);
// io.emit("message", {name: null, message: `${name} entrou no chat`})
    io.emit("users", users)
})

socket.on("message", (message) => {
io.emit("message", message);
})
 })

server.listen(port, () => console.log(`servidor rodando na porta ${port}`))


![image](https://github.com/user-attachments/assets/3092ebbf-80ab-4b78-a176-e9604b39b1cf)

![image](https://github.com/user-attachments/assets/c623836e-c4b3-40d6-9767-378c72f73223)


