const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user:'hennafatemah',
        password: 'rootroot',
        database: 'smart-detect'
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
    res.send(db.select('*').from('users'));
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db, bcrypt) })

app.put('/image', (req, res)=>{
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
            .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, ()=> {
    console.log('CORS-enabled web server is running on port 3000');
})