import {useState, useEffect} from 'react'
import MainContainer from '../components/MainContainer';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Button, TextField,
  Stack, IconButton, Typography
} from '@mui/material';
import {toast} from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit'
import { useBlog } from '../middleware/contextHooks';
export default function ShowBlog() {
    const { id } = useParams();

    const { currentBlog, getBlogById_Guest, toasts, blogs ,getBlogs_Guest} = useBlog();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (!blogs) {
            getBlogs_Guest();
        } else if (!currentBlog || currentBlog?._id !== id) {
            getBlogById_Guest(id);
        }

        if (currentBlog?._id === id) {
            setBlog(currentBlog);
        }

        if (toasts) {
            toasts.forEach(ele => {
                toast(ele.message, { type: ele.type });
            });
        }
    }, [blogs, currentBlog, getBlogById_Guest, id, toasts]);

    return (
        <Container maxWidth='md' sx={{ mt: 3, mb: 5 }}>
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant='h1' gutterBottom>
                    {blog?.title}
                </Typography>
                <Typography variant='body1'>
                    {blog?.content}
                </Typography>
            </Paper>
        </Container>
    )
}
