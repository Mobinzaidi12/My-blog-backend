const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

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

module.exports = { createPost };
