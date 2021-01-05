const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const mongodb = require('mongodb');


const appBar = express();

appBar.use(bodyParser.json());
 
appBar.get('/', async function(req, res){
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

appBar.post('/', async function(req, res){
    const posts = await loadPostsCollection();
    await posts.insertOne({
        skillBarName: req.body.text3,
        skillBarRate: req.body.text4,
        createdAt: new Date()
    });
    res.status(201).send();
});
appBar.delete('/:id' , async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
})


async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://Steve:12345@cluster0.qitz6.mongodb.net/Noots>?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    return client.db('portfolio').collection('posts');
}

module.exports = {
    path: "/api/",
    handler: appBar
}