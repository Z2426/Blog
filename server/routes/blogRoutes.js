
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  topNewBlogs,getBlogsByCategory,getBlogById_Guest ,
  getBlogs_Guest,
  searchBlogsByTitle
} = require('../controllers/blogController');
// Guest routes
router.get(`/guest/search`,searchBlogsByTitle)
router.get('/guest/category/:category',getBlogsByCategory)
router.get('/guest/topblogs',topNewBlogs)
router.get('/guest/show/:id',getBlogById_Guest);
router.get('/guest/show',getBlogs_Guest)
// Admin routes
router.post('/', [auth], createBlog);
router.put('/:id', [auth], updateBlog);
router.delete('/:id', [auth], deleteBlog);
router.get('/:id', [auth], getBlogById);
router.get('/', [auth],getBlogs);
module.exports = router;