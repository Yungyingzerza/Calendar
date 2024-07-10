const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {connect, sync} = require('./config/database');

dotenv.config();
const app = express();

const authenRouter = require('./controller/authen.routes');

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
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

app.use('/authen', authenRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});