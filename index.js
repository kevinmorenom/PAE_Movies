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
// const apiNews = require('./api');
// app.use('/api', apiNews);

app.use('/', apiRoutes);
app.use('/api', jsonParser);
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

app.listen(port, () => {
    console.log('App is runnings in port ' + port);
});