require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// const MongoConnect = require('./src/controllers/db.controller');
const apiRoutes = require('./routes');
// const apiNews = require('./api');
// app.use('/api', apiNews);

app.use('/', apiRoutes);
app.use('/api', jsonParser);
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');


app.listen(port, () => {
    console.log('App is runnings in port ' + port);
});