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

/* The following code is to fix a Heroku bug perventing API Requests when deployed */
const whitelist = ['http://localhost:5000', 'http://localhost:8080', 'https://xkcdstratus360cybercitycomics.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
/* */

app.use(express.json())

app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production'){
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