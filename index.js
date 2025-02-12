require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoutes = require('./routes/authRoutes');
const UserRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.API_SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());

const authRoutes = new AuthRoutes();
const userRoutes = new UserRoutes();

app.use('/api', authRoutes.getRoutes());
app.use('/api', userRoutes.getRoutes());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
