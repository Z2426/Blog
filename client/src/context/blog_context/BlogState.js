import {createContext, useReducer} from 'react';
import axios from 'axios';
import blogReducer from './blogReducer';
import * as ActionTypes from '../ContextActions';

export const BlogContext = createContext();

export default function BlogState(props){
    const initialstate = {
        blogs: null,
        currentBlog: null,
        toasts: null,
        blogCreated: false,
        topblogs:null,
        blogbycattegory:null,
    }

    const [state, dispatch] = useReducer(blogReducer, initialstate);
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }
    //Guest
    const searchByTitle = async (keyword) => {
        try {
            const res = await axios.get(`/api/blogs/guest/search?query=${keyword}`, config);
            console.log("search")
            console.log(res)
            dispatch({
                type: ActionTypes.GET_BLOG_BY_TITLE, 
                payload: res.data
            });
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data
            });
        }
    };
    //Guest
    const getBlogsByCategory= async (categoryName)=>{
        try {
            const res = await axios.get(`/api/blogs/guest/category/${categoryName}`, config);
            
            dispatch({
                type: ActionTypes.GET_BLOG_BY_CATOGEGY,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }
    //Guest
    const getTopBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs/guest/topblogs', config);
            dispatch({
                type: ActionTypes.GET_TOP_BLOG,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }
    
    const getBlogsByCategoryandID= async (categoryName)=>{
        try {
            const res = await axios.get(`/api/blogs/category/${categoryName}`, config);
            console.log('ci')
            console.log(res)
            dispatch({
                type: ActionTypes.GET_BLOG_BY_CATOGEGY,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }
    const getBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs', config);
            dispatch({
                type: ActionTypes.GET_BLOGS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }
    const getBlogs_Guest = async () => {
        try {
            const res = await axios.get('/api/blogs/guest/show', config);
            dispatch({
                type: ActionTypes.GET_BLOGS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getBlogById = async (blogId) => {
    
        try {
            const res = await axios.get(`/api/blogs/${blogId}`, config);
            console.log(res)
            dispatch({
                type: ActionTypes.GET_BLOG_BY_ID,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }
    const getBlogById_Guest = async (blogId) => {
    
        try {
            const res = await axios.get(`/api/blogs/guest/show/${blogId}`, config);
            console.log(res)
            dispatch({
                type: ActionTypes.GET_BLOG_BY_ID,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createBlog = async (blogData) => {
        try {
            const res = await axios.post('/api/blogs', blogData, config);
            dispatch({
                type: ActionTypes.NEW_BLOG_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateBlog = async (blogData) => {
        try {
            const res = await axios.put(`/api/blogs/${blogData._id}`, blogData, config);
            dispatch({
                type: ActionTypes.UPDATE_BLOG,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteBlog = async (blogId) => {
        try {
            const res = await axios.delete(`/api/blogs/${blogId}`, config);
            dispatch({
                type: ActionTypes.BLOG_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearBlogs = async () => {
        dispatch({
            type: ActionTypes.CLEAR_BLOGS
        })
    }

    const clearCurrentBlog = () =>{
        dispatch({type: ActionTypes.CLEAR_CURRENT_BLOG})
    }


    return (
        <BlogContext.Provider value={{
            blogs: state.blogs,
            currentBlog: state.currentBlog,
            toasts: state.toasts,
            blogCreated: state.blogCreated,
            topblogs: state.topblogs,
            blogbycattegory:state.blogbycattegory,
            clearCurrentBlog,
            getBlogs,
            getBlogById,
            createBlog,
            updateBlog,
            deleteBlog,
            clearErrors,
            clearBlogs,
            getTopBlogs,
            getBlogsByCategory,
            searchByTitle,
            getBlogById_Guest,
            getBlogs_Guest,
            getBlogsByCategoryandID,

        }}>
            {props.children}
        </BlogContext.Provider>
    )
}