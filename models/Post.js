const mongoose = require('mongoose');


const postSchemma = mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true
});


module.exports = mongoose.model('Post', postSchemma);
