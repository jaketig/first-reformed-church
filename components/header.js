import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link'
import { useUser } from '../lib/auth'
import StringAvatar from "./StringAvatar";
import fetchJson from "../lib/fetchJson";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, mutateUser } = useUser({allowAnonymous: true})

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    handleCloseUserMenu();
    await mutateUser(
      await fetchJson("/api/auth/logout", { method: "POST" }),
      false,
    );
  }

  return (
    <AppBar position="static" sx={{mb:2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
          <NextLink href={"/"} passHref>
            <Link variant="h6" component="a" underline="none" noWrap color="inherit" sx={{mr: 2, display: { xs: 'none', md: 'flex'}}}>
              FRC
            </Link>
          </NextLink>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <NextLink href={"/members"} passHref>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Members</Typography>
                </MenuItem>
              </NextLink>

              {/*{pages.map((page) => (*/}
              {/*  <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
              {/*    <Typography textAlign="center">{page}</Typography>*/}
              {/*  </MenuItem>*/}
              {/*))}*/}
            </Menu>
          </Box>
          <NextLink href={"/"} passHref>
            <Link variant="h6" component="a" underline="none" noWrap color="inherit" sx={{ display: { xs: 'flex', md: 'none' }}}>
              FRC
            </Link>
          </NextLink>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NextLink href={"/"} passHref>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            </NextLink>
            <NextLink href={"/members"} passHref>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Members
              </Button>
            </NextLink>

            {/*{pages.map((page) => (*/}
            {/*  <Button*/}
            {/*    key={page}*/}
            {/*    onClick={handleCloseNavMenu}*/}
            {/*    sx={{ my: 2, color: 'white', display: 'block' }}*/}
            {/*  >*/}
            {/*    {page}*/}
            {/*  </Button>*/}
            {/*))}*/}
          </Box>


          {user && user.isLoggedIn &&
            <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <StringAvatar name={user.name}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          }

          {(!user || !user.isLoggedIn) &&
          <NextLink href={"/login"} passHref>
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Login
            </Button>
          </NextLink>
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;