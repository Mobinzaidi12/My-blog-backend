const { Router } = require("express");
const { createPost, getPost, getPostById } = require("../controllers/postController");
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' });
const authMiddlewre = require('../middleware/auth')

const postRouter = Router()


postRouter.post('/create', uploads.single("file"), authMiddlewre, createPost);
postRouter.get('/posts', getPost);
postRouter.route('/:id').get(getPostById)


module.exports = postRouter;