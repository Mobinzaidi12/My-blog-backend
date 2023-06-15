const Post = require('../models/Post');
const fs = require('fs');

const createPost = async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath);

        const { title, summary, content, author } = req.body;

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
