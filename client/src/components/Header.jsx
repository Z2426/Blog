import * as React from 'react';
import {Button
} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {useAuth, useBlog} from '../middleware/contextHooks'
import { Link } from 'react-router-dom';
// #region --------------( ICONS )--------------
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
// #endregion

const authenticated = ['Blogs', 'Profile']
const menuItems = [
    { text: 'Tạo bài viết', link: '/create-post', icon: <BookIcon /> },
    { text: 'Quản lí bài viết', link: '/manage-posts', icon: <PersonIcon /> }
];
export default function PrimarySearchAppBar() {
    const {logoutUser} = useAuth()
    const {clearBlogs} = useBlog()

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleMenuClose();
        logoutUser();
        navigate('/login');
        clearBlogs()
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => navigate('/blogs')}>
                <IconButton size="large" color="inherit">
                    <BookIcon />
                </IconButton>
                <p>Blogs</p>
            </MenuItem>
            <MenuItem onClick={() => navigate('/profile')}>
                <IconButton
                size="large"
                color="inherit"
                >
                    <PersonIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={() => navigate('/profile')}>
                <IconButton
                size="large"
                color="inherit"
                >
                    <PersonIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton
                size="large"
                color="inherit"
                >
                <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    My Blog
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {authenticated.map(page => (
                        <Button
                            key={page}
                            variant='text'
                            onClick={() => navigate(`/${page.toLowerCase()}`)}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        aria-label="show more"
                        aria-controls="mobile-menu"
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Box>

                <Menu
                    id="mobile-menu"
                    anchorEl={mobileMoreAnchorEl}
                    open={isMobileMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    {menuItems.map(item => (
                        <MenuItem key={item.text} onClick={() => navigate(item.link)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>

                <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem component={Link} to="/newblog">
                            <ListItemIcon><BookIcon /></ListItemIcon>
                            <ListItemText>Tạo bài đăng</ListItemText>
                        </MenuItem>
                        <MenuItem component={Link} to="/manage-posts">
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            <ListItemText>Quản lí bài đăng</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
            </Toolbar>
        </AppBar>
    </Box>
    )
       
}
