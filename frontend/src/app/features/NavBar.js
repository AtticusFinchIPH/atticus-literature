import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { 
    Typography, CssBaseline,
    AppBar, Toolbar, Menu, MenuItem,
    IconButton, Badge, Hidden, 
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SunIcon from '@material-ui/icons/WbSunny';
import MoonIcon from '@material-ui/icons/Brightness2';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/More';
import { APPLY_VI, APPLY_EN, SWITCH_THEME } from '../../constants/globalConstants';
import useStyle from './NavBar.styles'; // Must be imported after all @material-ui
import CartOpenContext from '../../contexts/CartOpenContext';

const NavBar = withRouter(({history}) => {
    const classes = useStyle();
    const [anchorAcc, setAnchorAcc] = useState(null);
    const isAccOpen = Boolean(anchorAcc);
    const [anchorLang, setAnchorLang] = useState(null);
    const isLangOpen = Boolean(anchorLang);
    const isDarkMode = useSelector(state => state.isDarkMode);
    const {isCartOpen, setCartOpen} = useContext(CartOpenContext);
    const dispatch = useDispatch();

    const handleLangOpen = (e) => {
        setAnchorLang(e.currentTarget);
    }

    const handleAccOpen = (e) => {
        setAnchorAcc(e.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorLang(null);
        setAnchorAcc(null);
    }

    const chooseVietnamese = () => {
        dispatch({type: APPLY_VI});
        handleMenuClose();
    }

    const chooseEnglish = () => {
        dispatch({type: APPLY_EN});
        handleMenuClose();
    }

    const switchTheme = () => {
        dispatch({type: SWITCH_THEME});
        handleMenuClose();
    }

    const languageMenuId = 'language-menu';
    const renderLanguageMenu = (
        <Menu
            id={languageMenuId}
            open={isLangOpen}
            anchorEl={anchorLang}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={chooseVietnamese}>
                Tiếng Việt
            </MenuItem>
            <MenuItem onClick={chooseEnglish}>
                English
            </MenuItem>
        </Menu>
    );

    const accountMenuId = 'account-menu';
    const renderAccountMenu = (
        <Menu
            id={accountMenuId}
            open={isAccOpen}
            anchorEl={anchorAcc}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <FormattedMessage id='my_account' defaultMessage="My Account" />
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <FormattedMessage id='setting' defaultMessage="Setting" />
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <FormattedMessage id='sign_out' defaultMessage="Sign Out" />
            </MenuItem>
        </Menu>
    );
   
    return(
        <>
        <CssBaseline />
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" >
                        <MenuIcon />
                    </IconButton>
                    <Hidden xsDown>    
                        <Typography className={classes.title} variant="h6" noWrap>
                            Atticus Literature
                        </Typography>
                    </Hidden>
                    <Hidden smUp>    
                        <Typography className={classes.title} variant="h6" noWrap>
                           AL
                        </Typography>
                    </Hidden>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search…" 
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div> */}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={e => setCartOpen(true)}>
                            <Badge badgeContent={4} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {
                            isDarkMode
                            ?
                            <IconButton onClick={switchTheme} aria-label="light theme" color="inherit" >
                                <SunIcon />
                            </IconButton>
                            :
                        
                            <IconButton onClick={switchTheme} aria-label="dark theme" color="inherit" >
                                <MoonIcon />
                            </IconButton>
                        }
                        <IconButton aria-label="switch language" aria-controls={languageMenuId} aria-haspopup="true" color="inherit" 
                            onClick={handleLangOpen}
                        >
                            <LanguageIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="account of current user" aria-controls={accountMenuId} aria-haspopup="true" color="inherit" 
                            onClick={handleAccOpen}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                    {/* <div className={classes.sectionMobile}>
                        <IconButton aria-label="show more" aria-haspopup="true" color="inherit"
                            //  onClick={handleMobileMenuOpen} aria-controls={mobileMenuId}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div> */}
                </Toolbar>
            </AppBar>
            {renderLanguageMenu}
            {renderAccountMenu}
        </div>
        </>
    )
})

export default NavBar;