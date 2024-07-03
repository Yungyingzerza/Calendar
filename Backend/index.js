const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {connect, sync} = require('./config/database');

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

// Connect to the database
async function initializeDatabase() {
    await connect();
    await sync();
  }
initializeDatabase();

app.get('/', (req, res) => {
    res.json('Hello World!');
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});