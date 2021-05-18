const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('get endpoint is working');
})

app.post('/signin', (req, res)=>{
    res.json('signing in');
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})