const dotenv = require("dotenv")
dotenv.config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
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

// Swagger configuration
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the project',
        },
        servers: [
            {
                url: 'http://localhost:3009/api',
            },
        ],
    },
    apis: ['./src/api/routes/*.js'], // Path to the API docs
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', require('./api/routes/auth.route'));
app.use('/api/assessment', require('./api/routes/assessmentRoutes'));
app.use('/api/user', require('./api/routes/userRoutes'));
app.use('/api/student-assessment', require('./api/routes/studentAssessmentRoutes'));
app.use('/api/student-answer', require('./api/routes/studentAnswerRoutes'));
app.use('/api/question', require('./api/routes/questionRoutes'));
app.use('/api/index', require('./api/routes/index'));



const port = process.env.APP_PORT || 3000


app.listen(port, () => {
    console.log(`Serveur is running on port ${port}`);
});