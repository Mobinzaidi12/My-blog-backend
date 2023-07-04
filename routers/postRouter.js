const { Router } = require("express");
const { createPost, getPost, getPostById, updatePost } = require("../controllers/postController");
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' });
const authMiddlewre = require('../middleware/auth')

const postRouter = Router()


postRouter.post('/create', uploads.single("file"), authMiddlewre, createPost);
postRouter.get('/all', getPost);
postRouter.route('/:id').get(authMiddlewre, getPostById)
postRouter.put('/:id', uploads.single("file"), authMiddlewre, updatePost)


module.exports = postRouter;