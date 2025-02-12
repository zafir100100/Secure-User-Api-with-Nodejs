require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = new UserRoutes();

app.use('/api', userRoutes.getRoutes());

app.listen(process.env.API_SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.API_SERVER_PORT}`);
});
