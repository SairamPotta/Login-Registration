const error = require('./middleware/error');
const user = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/registration-login', { useNewUrlParser: true, useFindAndModify: false })
.then(res => console.log('Database connected successfully'))
.catch(err => console.log('unable to connect database'));

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', user);

app.use(error);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server runnign in ${port} port`));