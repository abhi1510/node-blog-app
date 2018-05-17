const mongoose = require('mongoose');


var tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    }
})

var Tag = mongoose.model('Tag', tagSchema);

module.exports = {
    Tag: Tag
}