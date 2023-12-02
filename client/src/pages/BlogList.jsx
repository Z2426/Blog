import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBlog } from '../middleware/contextHooks'
import { toast } from 'react-toastify';
import { truncateString } from '../middleware/utils';
import {
    Grid,
    Button, Container, Tooltip,
    Box, List, ListItem, ListItemText,
    Paper, Typography 
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'
import MainContainer from '../components/MainContainer'
import BlogCard from '../components/BlogCard'


export default function BlogList() {
    const { getBlogs, toasts, clearErrors, blogs, clearCurrentBlog, getTopBlogs, topblogs } = useBlog();
    const navigate = useNavigate();
    const [myBlogs, setMyBlogs] = useState([]);
    const [topBlogs, setTopBlogs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!topblogs){
                    getTopBlogs()    
                }
                if(topblogs){
                    setTopBlogs(topblogs)
                }
                if (toasts) {
                    toasts.forEach(ele => {
                        toast(ele.message, { type: ele.type });
                    });
                    clearErrors();
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [toasts, clearErrors, topblogs, getTopBlogs]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!blogs){
                   await  getBlogs()
                }
                if(blogs){
                    setMyBlogs(blogs)
                }
                if (toasts) {
                    toasts.forEach(ele => {
                        toast(ele.message, { type: ele.type });
                    });
                    clearErrors();
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [toasts, clearErrors, topblogs, getTopBlogs, blogs, getBlogs]);
    

    const onCreateNewBlog = () => {
        clearCurrentBlog();
        navigate('/newblog');
    };

    return (
        <MainContainer>
            <Grid container spacing={2} direction="column" alignItems="flex-start">
                <Paper elevation={3} sx={{ borderRadius: 5, p: 2, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Top Blog New
                    </Typography>
                    <List>
                        {topBlogs?.map(blog => (
                            <Link
                                key={blog._id}
                                style={{ textDecoration: 'none', color: '#333' }}
                                to={`/blogs/${blog._id}`}
                            >
                                <ListItem button>
                                    <ListItemText primary={truncateString(blog.title, 30)} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button onClick={onCreateNewBlog}>Create Blog</Button>
            </Box>
            <Grid container spacing={2} direction="row-reverse">
                {myBlogs?.map(blog => (
                    <Grid key={blog._id} item xs={12} sm={6}>
                        <BlogCard blog={blog} /> {/* Render BlogCard component */}
                    </Grid>
                ))}
            </Grid>
        </MainContainer>
    );
}
