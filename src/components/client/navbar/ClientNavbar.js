import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useStyle from './ClientStyle';
import { styled, alpha } from '@mui/material/styles';
import {
  AccountCircle,
  Cake,
  Celebration,
  Delete,
  EmojiEvents,
  Event,
  PowerSettingsNewRounded, Search, SearchOff, StopCircle, TvOff
} from '@mui/icons-material';
import SearchStyle from './SearchStyle';
import { Grid, Icon, InputAdornment, Paper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import animWomen from '../../../assets/client/images/animWomenf.gif';
import bgAnim from '../../../assets/client/images/bgAnim.gif';
import { InputUnstyled } from '@mui/base';
import CustomHomeInput from './CustomHomeInput';
import Logo from '../../../assets/client/images/logo-ivinx.png'
import { useState } from 'react';

const pages = ['ACCUEIL', 'EVENEMENT', 'CATEGORIE'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ClientNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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


  const classes = useStyle();

  return (
    <>
      <AppBar className={classes.appBar} elevation={0} position="static" >
        {/* <div className={classes.header}> */}
          <Toolbar className={classes.toolBar}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2, display: {
                  xs: 'none',
                  color: 'white',
                  md: 'flex'
                }
              }}
            >
            {/* <img src={Logo} height={40}></img> */}
            <Link to='/event' className={classes.navText}>
              INVINX
            </Link>
            </Typography>
            <Box className={classes.menusBox} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{
                  color: 'white',
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Mobile menu */}
              <Menu id="menu-appbar" 
                anchorEl={anchorElNav} 
                anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' }, }}
              >
                <MenuItem
                  className={classes.mobileMenus} key='Categorie' onClick={handleCloseNavMenu}>
                  <Typography>Categorie</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                color: 'white',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              LOGO
            </Typography>
            {/* Large menus */}
            <Box
              component="div"
              className={classes.menusBox}
              // m={1} //margin
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: "center",
                justifyContent: "center"
              }}>

                {/* <Button size='large' key='ACCUEIL' onClick={handleCloseNavMenu}
                  sx={{":hover": {backgroundColor: "white",color: 'primary.main'},
                    fontWeight: 600, alignContent: "space-between", my: 2,marginLeft: 4, 
                    color: 'white', display: 'block'}}>
                      ACCUEIL
                </Button>

                <Button size='large' key='EVENEMENTS' onClick={handleCloseNavMenu}
                  sx={{":hover": {backgroundColor: "white",color: 'primary.main'},
                    fontWeight: 600, alignContent: "space-between", my: 2,marginLeft: 4, 
                    color: 'white', display: 'block'}}>
                      EVENEMENTS
                </Button>

                <Button size='large' key='CATEGORIE' onClick={handleCloseNavMenu}
                  sx={{":hover": {backgroundColor: "white",color: 'primary.main'},
                    fontWeight: 600, alignContent: "space-between", my: 2,marginLeft: 4, 
                    color: 'white', display: 'block'}}>
                      CATEGORIE
                </Button> */}

            </Box>

              {/* Recherche */}
            {/* <SearchStyle /> */}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Menu du site">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ background: 'white' }} alt="Déconnexion">
                    <PowerSettingsNewRounded sx={{ color: 'primary.main' }} />
                  </Avatar>

                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}

                  <MenuItem key='promotion' onClose={handleCloseUserMenu}>
                    <Link to='/event/action' className={classes.navText}>Promouvoir un évènement</Link>
                  </MenuItem>
                  <MenuItem key='Contact' onClose={handleCloseUserMenu}>
                    <Link to='/event/action' className={classes.navText}>Nous contacter</Link>
                  </MenuItem>
                  <MenuItem key='partenariat' onClose={handleCloseUserMenu}>
                    <Link to='/event/action' className={classes.navText}>Devenir partenaire</Link>
                  </MenuItem>
                  <MenuItem key='Inscription' onClose={handleCloseUserMenu}>
                    <Link to='inscription' className={classes.navText}>Inscription</Link>
                  </MenuItem>
                  <MenuItem key='Profile' onClose={handleCloseUserMenu}>
                    <Link to='/profile' className={classes.navText}>Profile</Link>
                  </MenuItem>
                  <MenuItem key='Deconnexion' onClose={handleCloseUserMenu}>
                    <Typography textAlign="center">Déconnexion</Typography>
                  </MenuItem>
                </Menu>

            </Box>
          </Toolbar>
        
        {/* </div> */}
      </AppBar>
    
    </>
  );
};
export default ClientNavBar;
