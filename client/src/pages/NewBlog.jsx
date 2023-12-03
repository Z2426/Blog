import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../middleware/contextHooks';
import { toast } from 'react-toastify';
import {
    Grid,
    TextField,
    Container,
    Button,
    Paper,
    Stack,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';

import MainContainer from '../components/MainContainer';

export default function NewBlog() {
    const navigate = useNavigate();
    const categories = ['All', 'TechnologyNews', 'Phones', 'Computers', 'Others'];
    const [newBlog, setNewBlog] = useState({ title: '', content: '', category: '' });
    const {
        toasts,
        clearErrors,
        createBlog,
        blogs,
        getBlogs,
        blogCreated,
        currentBlog
    } = useBlog();

    useEffect(() => {
        if (!blogs) {
            getBlogs();
        }

        if (toasts) {
            toasts.forEach((ele) => {
                toast(ele.message, { type: ele.type });
            });
            clearErrors();
        }

        if (blogCreated) {
            const id = currentBlog._id;
           
            navigate(`/blogs/${id}`);
        }
    }, [toasts, clearErrors, blogs, getBlogs, navigate, blogCreated, currentBlog]);

    const handleSave = () => {
        if (newBlog.title.length > 0 && newBlog.content.length > 0 && newBlog.category.length > 0) {
            console.log(newBlog);
            createBlog(newBlog);
            navigate(`/blogs`);
        } else {
            toast('Please provide a blog title, content, and select a category', { type: 'error' });
        }
    };

    return (
        <MainContainer>
            <Container maxWidth="md" sx={{ py: 2, my: 1, backgroundColor: 'silver' }} component={Paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="category-select" sx={{ textAlign: 'left' }}>Choose Category</InputLabel>
                        <Select
                            labelId="category-select"
                            value={newBlog.category}
                            onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                            label="Choose Category"
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            value={newBlog.title}
                            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            minRows={8}
                            maxRows={20}
                            label="Content"
                            value={newBlog.content}
                            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant='outlined' onClick={() => setNewBlog({ title: '', content: '', category: '' })}>Clear</Button>
                            <Button onClick={() => navigate('/blogs')}>Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
    );
}
