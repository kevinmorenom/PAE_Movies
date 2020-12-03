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
const multer = require('multer');

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

app.use(cors());

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/pps')
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const token = require('./src/models/token');

        token.findUserByToken(req.headers.authorization).then(user => {
            let userId = user._id;
            cb(null, `${userId}.${ext}`)
        }).catch(err => {
            console.log(err);
        });

    }
});

const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        const flag = file.mimetype.startsWith('image');
        cb(null, flag);
    }
});

app.post('/pp', upload.single('image'), (req, res) => {
    res.send('Archivo subido');
    console.log("ARchivo subido")
})

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
        methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
        allowedHeaders: ['authorization']
    }
});

io.on('connection', socket => {
    console.log('Usuario conectado');
    const authToken = socket.handshake.headers['authorization'];
    const token = require('./src/models/token');

    let userName = '';
    console.log(authToken, " se quiere conectar");
    token.findUserByToken(authToken).then(user => {
        userName = user.usuario;
        console.log({
            user
        });
        console.log('Connected ' + userName);
    }).catch(err => {
        console.log(err);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('watchedMovies', (data) => {
        console.log('User watched movie: ', data.original_title);

        socket.broadcast.emit('watchedMovies', {
            ...data,
            user: userName
        });
    })
});