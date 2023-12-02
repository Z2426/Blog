// const express = require('express')
// const router = express.Router()
// const auth = require('../middleware/authMiddleware');

// const {
//     getBlogs,
//     createBlog,
//     updateBlog,
//     deleteBlog,
//     getBlogById,
//     topNewBlogs
// } = require('../controllers/blogController')
// //guest
// router.get('/topblogs',(req,res)=>{
//     res.send("Oke")
// })
// //admin
// router.post('/', [auth], createBlog)
// router.put('/:id', [auth], updateBlog);
// router.delete('/:id', [auth], deleteBlog)
// router.get('/:id', [auth], getBlogById)
// router.get('/', [auth], getBlogs)

// module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  topNewBlogs,getBlogsByCategory
} = require('../controllers/blogController');
// Guest routes
router.get('/category/:category',getBlogsByCategory)
router.get('/topblogs',topNewBlogs)
// Admin routes
router.post('/', [auth], createBlog);
router.put('/:id', [auth], updateBlog);
router.delete('/:id', [auth], deleteBlog);
router.get('/:id', [auth], getBlogById);
router.get('/', [auth],getBlogs);


module.exports = router;