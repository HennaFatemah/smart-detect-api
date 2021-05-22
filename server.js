const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true
    }
})

db
    .select('*')
    .from('users')
    .then(data => {
        console.log(data);
    })

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (_, res)=>{
    res.send('it is working');
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`CORS-enabled web server is running on port ${process.env.PORT}`);
})