import {toast} from 'react-toastify';
import { useBlog } from '../middleware/contextHooks';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Stack } from '@mui/material'; // Giữ lại một lần import này
import React, { useState, useEffect } from 'react';
export default function BlogDetail() {
    const { id } = useParams();

    const {
        blogs, currentBlog, getBlogById, toasts, clearToasts, getBlogs
    } = useBlog();
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        if (!blogs) {
            getBlogs();
        } else if (!currentBlog || currentBlog?._id !== id) {
            getBlogById(id);
        }

        if (currentBlog?._id === id) {
            setBlog(currentBlog);
        }

        if (toasts) {
            toasts.forEach(ele => {
                toast(ele.message, { type: ele.type });
            });
        }
    }, [currentBlog, id, toasts, clearToasts, getBlogById, blogs, getBlogs]);

    const displayContent = () => {
        return (
            <Stack spacing={2}>
                <Typography variant='h1'>{blog?.title}</Typography>
                <Typography variant='body1'>{blog?.content}</Typography>
            </Stack>
        );
    }

    return (
        <Container maxWidth='md' sx={{ mt: 3, mb: 5 }}>
            <Paper>
                {displayContent()}
            </Paper>
        </Container>
    );
}
