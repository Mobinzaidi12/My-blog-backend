const { Router } = require("express");
const { createPost } = require("../controllers/postController");
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })

const postRouter = Router()

postRouter.post('/create', uploads.single("file"), createPost);



module.exports = postRouter;