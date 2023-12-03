const Blog = require('../models/Blog');
const searchBlogsByTitle = async (req, res) => {
    const query = req.query.query;
    try {
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }
        // Sử dụng $regex để tìm kiếm tiêu đề chứa chuỗi query (không phân biệt chữ hoa/thường)
        const foundBlogs = await Blog.find({ title: { $regex: new RegExp(query, 'i') } });
        res.json(foundBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getBlogsByCategoryAndId = async (req, res) => {
    try {
        const { category } = req.params; 
        let blogsByCategory;
        blogsByCategory = await Blog.find({ category ,user: req.user.id });
        if ( category==='Others') {
                blogsByCategory = await Blog.find();
            }
        res.json(blogsByCategory);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const getBlogsByCategory = async (req, res) => {
    try {
        const { category } = req.params; 
        let blogsByCategory;
        blogsByCategory = await Blog.find({ category });
        
        if ( category==='Others') {
                blogsByCategory = await Blog.find();
            }
        

        res.json(blogsByCategory);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const topNewBlogs  = async (req, res) => {
    try {
        const topViewedBlogs = await Blog.find().sort({ views: -1 }).limit(5);
        res.json(topViewedBlogs);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id });
        res.json(blogs);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const getBlogs_Guest = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const getBlogById_Guest = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id});
        if (!blog) {
            return res.status(404).json([
                {
                    message: 'Blog not found',
                    type: 'error'
                }
            ]);
        }
       
        blog.views =blog.views+ 1;
        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, user: req.user.id });
        if (!blog) {
            return res.status(404).json([
                {
                    message: 'Blog not found',
                    type: 'error'
                }
            ]);
        }
       
        blog.views =blog.views+ 1;
        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const createBlog = async (req, res) => {
    try {
        const { title, content ,category} = req.body;
        const newBlog = new Blog({
            title,
            content,
            category,
            user: req.user.id
        });
        
        await newBlog.save();

        if(!newBlog) return res.status(400).json([{ message: 'Blog not created', type: 'error' }]);

        res.json(newBlog);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title, content }, { new: true });
        res.json(blog);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({
            blogId: req.params.id,
            toasts: [{ message: 'Blog deleted', type: 'success' }]
        });
    } catch (error) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}
module.exports = {
    deleteBlog,
    updateBlog,
    createBlog,
    getBlogs,
    getBlogById,
    topNewBlogs ,
    getBlogsByCategory,
    getBlogById_Guest,
   getBlogs_Guest,
   searchBlogsByTitle,
   getBlogsByCategoryAndId
}