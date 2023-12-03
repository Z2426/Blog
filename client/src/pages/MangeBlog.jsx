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
export default function MangeBlog() {
    const { getBlogs, toasts, clearErrors, blogs, getBlogsByCategoryandID } = useBlog();
    const navigate = useNavigate();
    const [myBlogs, setMyBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!blogs) {
                    await getBlogs()
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
    }, [toasts, clearErrors, blogs, getBlogs,getBlogsByCategoryandID]);
    const handleCategoryClick = async (category) => {
        try {
            await getBlogsByCategoryandID(category);
            setMyBlogs(blogs);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainContainer>
            {/* Category Menu */}
            <Grid container spacing={2} direction="row">
                <Grid item xs={3}>
                    <CategoryMenu handleCategoryClick={handleCategoryClick}/>
                </Grid>
                <Grid item xs={9}>
                    {/* Blog Cards */}
                    <Grid container spacing={2} direction="row">
                        {myBlogs?.map(blog => (
                            <Grid key={blog._id} item xs={12} sm={6}>
                                <BlogCard blog={blog} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainContainer>
    );

}
