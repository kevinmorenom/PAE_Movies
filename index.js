require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const MongoConnect = require('./src/controllers/db.controller');
const apiRoutes = require('./routes');
const cors = require('cors');
// const apiNews = require('./api');
// app.use('/api', apiNews);

app.use(cors());
app.use('/', jsonParser);
app.use('/', apiRoutes);

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            "title": "News API ",
            "description": "This is a sample server for news app",
            "contact": {
                "name": "KM",
            },
            "version": "1.0.0",
            "servers": ["http://localhost:" + port]
        }
    },
    apis: ['index.js', './routes/index.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = app.listen(port, () => {
    console.log('App is runnings in port ' + port);
});

const socketIo = require('socket.io');
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST','UPDATE','DELETE'],
        allowedHeaders: ['authorization']
    }
});

io.on('connection', socket =>{
    console.log('Usuario conectado');
    const authToken = socket.handshake.headers['authorization'];
    const token = require('./src/models/token');

    let userName = '';

    token.findUserByToken(authToken).then(user =>{
        userName = user.usuario;
        console.log({user});
        console.log('Connected '+ userName);
    }).catch(err =>{
        console.log(err);
    });

    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    })

    socket.on('watchedMovies', (data)=>{
        console.log('User watched movie: ', data.original_title);

        socket.broadcast.emit('watchedMovies', {...data, user: userName});
    })
});

