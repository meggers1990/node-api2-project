// implement your posts router here
const express = require('express');
const Posts = require('./posts-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "The posts information could not be retrieved" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" });
    }
});

router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    try {
        const newPost = await Posts.insert({ title, contents });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
    }
});

router.put('/:id', async (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    try {
        const updated = await Posts.update(req.params.id, { title, contents });
        if (updated) {
            const updatedPost = await Posts.findById(req.params.id);
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "The post information could not be modified" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            await Posts.remove(req.params.id);
            res.json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "The post could not be removed" });
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            const comments = await Posts.findPostComments(req.params.id);
            res.json(comments);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "The comments information could not be retrieved" });
    }
});

module.exports = router;