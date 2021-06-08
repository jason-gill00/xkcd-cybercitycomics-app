const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch')
const ComicCount = require('../models/comic-count')
const router = express.Router();


const dbURI = 'mongodb+srv://jason-gill00:test1234@comicapi.byjox.mongodb.net/Comics?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI || dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to db'))
    .catch(err => console.log(err))


router.get('/', async(req, res) => {
    console.log("IN THE ROUDTAKSDJLAKJ")
    const url = 'https://xkcd.com/1/info.0.json'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    const count = new ComicCount({
        comic_num: data.num,
        comic_count: 1
    })
    count.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
    })

    // res.send(data)
})

router.get('/:id', async(req, res) => {   
    console.log("IN THE /:id ROUTE")   
    try{
        const id = req.params.id
        const url = `https://xkcd.com/${id}/info.0.json`
        const response = await fetch(url)
        const data = await response.json()
    
        const result = await ComicCount.findOne({'comic_num': data.num})
        if(result){
            result.comic_count = result.comic_count+1;
            result.save()
            console.log(result)
            res.send({...data, view_count:result.comic_count})
        }
        else{
            const count = new ComicCount({
                comic_num: data.num,
                comic_count: 1
            })
            count.save()
            console.log(count)
            res.send({...data, view_count:1})
        }
    } catch(err){
        console.log(err)
    }

})




module.exports = router;