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
        let postData = await Post.find();
        if (postData.length < 1) {
            res.status(400).json({ status: false, message: "Data Not found" })
        }
        res.status(200).json({ status: true, postData });
        console.log(postData)

    } catch (error) {
        throw error;
    }

}


module.exports = { createPost, getPost };
