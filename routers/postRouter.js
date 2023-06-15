const { Router } = require("express");
const { createPost, getPost } = require("../controllers/postController");
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' });
const authMiddlewre = require('../middleware/auth')

const postRouter = Router()


postRouter.post('/create', uploads.single("file"), authMiddlewre, createPost);
postRouter.get('/posts', getPost);


module.exports = postRouter;