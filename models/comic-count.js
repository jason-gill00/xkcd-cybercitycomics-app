const mongoose = require('mongoose');


const ComicSchema = mongoose.Schema({
    comic_num: {
        type : Number,
        required: true
    },
    comic_count: {
        type : Number,
        requited: true
    }
})

module.exports = mongoose.model('ComicCount', ComicSchema);