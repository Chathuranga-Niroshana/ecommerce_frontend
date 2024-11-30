import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotalCartItems, } from '../../app/features/cartSlice';
import { logout, getUser, getIsLoggedIn, } from '../../app/features/authSlice';

const pages = [
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '#' },
    { label: 'Contact', path: '#' },
];

function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalCartItems = useSelector(selectTotalCartItems);
    const user = useSelector(getUser);
    const isLoggedIn = useSelector(getIsLoggedIn);

    const handleNavMenu = (event) => setAnchorElNav(event?.currentTarget || null);
    const handleUserMenu = (event) => setAnchorElUser(event?.currentTarget || null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const avatarFallback = user?.name ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <AppBar sx={{ backgroundColor: '#000', position: 'fixed', zIndex: 50 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            CNJ
                        </Typography>
                    </Link>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            onClick={(e) => handleNavMenu(e)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleNavMenu(null)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={() => navigate(page.path)}>
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => navigate(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Cart */}
                    <IconButton size="large" color="inherit" onClick={() => navigate('/cart')}>
                        <Badge badgeContent={totalCartItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* User */}
                    {isLoggedIn ? (
                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={(e) => handleUserMenu(e)} sx={{ p: 0 }}>
                                    <Avatar>{avatarFallback}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={() => handleUserMenu(null)}
                                sx={{ mt: '45px' }}
                            >
                                <MenuItem onClick={() => handleUserMenu(null)}>
                                    <Typography textAlign="center">{user?.name}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Button color="inherit" onClick={() => setIsLoginOpen(true)}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </Container>
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </AppBar>
    );
}
export default Navbar;
