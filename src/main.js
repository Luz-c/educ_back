const dotenv = require("dotenv")
dotenv.config();
const express = require('express');
const app = express();
const connectToDB = require('./api/config/database');
const logMiddleware = require('./api/middlewares/logsMiddleware')
const errorsMiddleware = require('./api/middlewares/errorsMiddleware')


connectToDB();

app.get('/', (req, res) => {
    res.send('Hello World from Sandrelle');
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logMiddleware);
app.use(errorsMiddleware)

const port = process.env.APP_PORT || 3000


app.listen(port, () => {
    console.log(`Serveur is running on port ${port}`);
});