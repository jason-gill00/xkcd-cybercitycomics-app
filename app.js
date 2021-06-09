const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
//Routes
const apiRoutes = require('./routes/api')
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express()

//Middleware


app.use(cors());
app.use(express.json())

app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production'){
    console.log(process.env.PORT)
    console.log("IN THE PRODUCTION")
    app.use('/', express.static(path.join(__dirname, '/client/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
    })
} else{
    app.get('/', (req, res) => {
        res.send("In the api")
    })
} 


app.listen(PORT, () => {
    console.log(`Running on ${PORT}...`)
})