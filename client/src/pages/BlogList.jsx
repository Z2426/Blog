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
import CategoryMenu from '../components/MenuCatotegory'
import SearchBar from '../components/SearchBar';
import Showcard from '../components/Showcard'
export default function BlogList() {
    const { getBlogs, toasts, clearErrors, blogs, clearCurrentBlog, getTopBlogs, topblogs ,getBlogsByCategory} = useBlog();
    const navigate = useNavigate();
    const [myBlogs, setMyBlogs] = useState([]);
    const [topBlogs, setTopBlogs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!topblogs) {
                    getTopBlogs();
                }
                if (topblogs) {
                    setTopBlogs(topblogs);
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
                if (!blogs) {
                    await getBlogs();
                }
                if (blogs) {
                    setMyBlogs(blogs);
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


    return (
    
        <MainContainer>
            <Grid container spacing={2} direction="row" alignItems="flex-start">
    <Grid item xs={3}>
        <Paper elevation={3} sx={{ borderRadius: 5, p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Top Blog New
            </Typography>
            <List>
                {topBlogs?.map((blog) => (
                    <Link
                        key={blog._id}
                        style={{ textDecoration: 'none', color: '#333' }}
                        to={`/blogs/guest/show/${blog._id}`}
                    >
                        <ListItem button>
                            <ListItemText primary={truncateString(blog.title, 30)} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Paper>
    </Grid>
    <Grid item xs={3}>
        <SearchBar />
    </Grid>
</Grid>
            {/* Category Menu */}
            <Grid container spacing={2} direction="row">
                <Grid item xs={3}>
                    <CategoryMenu handleCategoryClick={getBlogsByCategory}/>
                </Grid>
                <Grid item xs={9}>
                    {/* Blog Cards */}
                    <Grid container spacing={2} direction="row">
                        {myBlogs?.map(blog => (
                            <Grid key={blog._id} item xs={12} sm={6}>
                                <Showcard blog={blog} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainContainer>
    
    
    )
    
}