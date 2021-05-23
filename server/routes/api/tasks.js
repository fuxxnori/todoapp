const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get propsData
router.get("/", async (req, res) => {
    const tasks = await loadTasksCollection();
    res.send(await tasks.find({}).toArray());
});

//Add Post
router.post("/", async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.insertOne({
        "name": req.body.name,
        "pic": req.body.pic,
        "due": req.body.due,
        "description": req.body.description
    });
    res.status(201).send();
})

//Delete Post
router.delete('/:id', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
})

const loadTasksCollection = async () => {
    const client = await mongodb.MongoClient.connect("mongodb+srv://fuminori:NfRyMk5qeg4JsTwe@cluster0.uxjyp.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db("app").collection("tasks")
}

module.exports = router;