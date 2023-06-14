const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { info } = require('console');

const createPost = async (req, res) => {
    try {
        const file = req.file;
        const { originalname, path: tempPath } = req.file;
        const parts = originalname.split('.');
        const ext = path.extname(originalname);
        const newPath = path.join(__dirname, '..', 'uploads', parts.join('.'));

        const { title, summary, content, author } = req.body;



        fs.rename(tempPath, newPath, (err) => {
            if (err) {
                // Handle the error
                return res.status(500).json({ error: 'Failed to move file' });
            }
            // res.status(200).json({ ext });
        });

        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author
        });
        res.status(200).json({ status: true, postDoc });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await Post.find();

        if (posts.length < 1) {
            return res.status(404).json({ status: false, message: 'Data not found' });
        }

        res.status(200).json({ status: true, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};



module.exports = { createPost, getPost };
