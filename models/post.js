const mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    imageurl : {
        type: String,
        minlength: 1,
        default: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f29b617b71095b07e2108d0231316e5&auto=format&fit=crop&w=750&q=80'
    },
    comments: [{
        content: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        author: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        reply: [{
            content: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            },
            author: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            }
        }]
    }],
    tags: [{
      type: String,
      minlength: 1
    }]
    // tags: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tag'
    // }]
})

var Post = mongoose.model('Post', postSchema);

module.exports = {
    Post: Post
}
