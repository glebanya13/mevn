const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { routes } = require('./src/routes')
const bodyParser = require('body-parser')

const app = express()

app.set('port', 5000);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/mevnshop')
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

routes.forEach(item => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})