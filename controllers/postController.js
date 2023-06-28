const Post = require('../models/Post');
const fs = require('fs');

const createPost = async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath);

        const { title, summary, content } = req.body;

        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: req.user.userName
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
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Post.findById(id).lean()

        if (req.user.userName == data.author) {
            data = { ...data, editable: true }
        }
        res.status(200).json({ status: true, data })
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal server error' });
    }

}


const updatePost = async (req, res) => {
    try {
        let newPath = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext
            fs.renameSync(path, newPath);
        }

        const { id } = req.params;
        const { title, summary, content } = req.body;
        let cover = newPath;
        const existingPost = await Post.findById(id);
        if (existingPost) {
            cover = newPath ? newPath : existingPost.cover;
        }
        const postDoc = await Post.updateOne(
            { _id: id },
            {
                $set: {
                    title,
                    summary,
                    content,
                    cover,
                    author: req.user.userName
                }
            });
        res.status(200).json({ status: true, postDoc });
        console.log(postDoc.title)

    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal server error' });
    }

}



module.exports = { createPost, getPost, getPostById, updatePost };
