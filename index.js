const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");
const lamda = require("./modules/utils").lamda2;
lamda(10, 20);
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const taskModel = require('./modules/tasks/task.model');

// REALTIME SOCKET IO
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect("mongodb+srv://edacytalent:12345@cluster0.9z1a3.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Successfully connected to Atlas DB");
    initApp();
}).catch(
    (error) => {
        console.error(error);
    }
)
async function initApp() {
    app.get('/taches', async (req, res) => {
        const status = req.query.status || '';
        const user = { firstName: "John", lastName: "Bishop" }
        const taskList = await taskModel.find({ status: { $regex: status, $options: "i" } });
        // const taskList = await taskModel.find({ status: status })
        // res.json({taskList})
        res.status(200).render('index', { user, taches: taskList });
    })




    io.on('connection', (socket) => {
        console.log('Nouveau client connecté');
    
        socket.on('addItem', async (item) => {
            const task = await taskModel.create(item)
            io.emit('newItem', item);
        });
    
        socket.on('disconnect', () => {
            console.log('Client déconnecté');
        });
    });

    require('./modules/auth/auth.routes')(app);
    // require('./modules/auth/auth.guard')(app);
    require('./modules/tasks/task.routes')(app);
    
}


// app.listen(3000, () => {
//     console.log("App is listening on port 3000");
// });
server.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
  });