const express = require('express');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Post} = require('./models/post');
var {Tag} = require('./models/tag');

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/posts', (req, res) => {
    Post.find().then((posts) => {        
        res.send(posts)
    }, (err) => {
        res.status(400).send(err);
    }); 
});

app.post('/posts', (req, res) => {
    var post = new Post(req.body);
    post.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/posts/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Post.findById(id).then((post) => {
        if(!post) {
            return res.status(404).send();    
        }
        res.send(post);
    }).catch((err) => {
        res.status(400).send();    
    });
});

app.patch('/posts/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'content', 'author', 'tags']);    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Post.findByIdAndUpdate(id, { $set: body }, { new: true }).then((post) => {
        if(!post) {
            return res.status(404).send();    
        }
        res.send(post);
    }).catch((err) => {
        res.status(400).send();
    })
});

app.delete('/posts/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Post.findByIdAndRemove(id).then((post) => {
        if(!post) {
            return res.status(404).send();    
        }
        res.send({post});
    }).catch((err) => {
        res.status(400).send();    
    });
});

app.get('/tags', (req, res) => {
    Tag.find().then((tags) => {        
        res.send(tags)
    }, (err) => {
        res.status(400).send(err);
    }); 
})

app.post('/tags', (req, res) => {
    var tag = new Tag(req.body);
    tag.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/tags/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Tag.findById(id).then((tag) => {
        if(!tag) {
            return res.status(404).send();    
        }
        res.send(tag);
    }).catch((err) => {
        res.status(400).send();    
    });
});

app.patch('/tags/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name']);    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Tag.findByIdAndUpdate(id, { $set: body }, { new: true }).then((tag) => {
        if(!tag) {
            return res.status(404).send();    
        }
        res.send(tag);
    }).catch((err) => {
        res.status(400).send();
    })
});

app.delete('/tags/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Tag.findByIdAndRemove(id).then((tag) => {
        if(!tag) {
            return res.status(404).send();    
        }
        res.send(tag);
    }).catch((err) => {
        res.status(400).send();    
    });
});

app.listen(3000, () => {
    console.log('Server is up on port: '+port);
})