import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CartOpenContext from '../../contexts/CartOpenContext';

const useStyles = makeStyles(theme => ({
    cartBbr: {
        width: '100%',
        backgroundColor: 'white'
    }
}));

const CartBar = () => {
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
    console.log(isCartOpen)
    const classes = useStyles();
    const handleDrawerClose = (e) => {
        
    }
    return(
        <Drawer className={classes.cartbar} anchor='right' open={isCartOpen} onClose={e => setCartOpen(false)}>
            <div className={classes.cartbarHeader}>
                <IconButton onClick={handleDrawerClose} onClick={e => setCartOpen(false)}>
                    <ChevronRightIcon />
                </IconButton>
                <FormattedMessage id='cart' defaultMessage='Cart' />
            </div>
        </Drawer>
    )
}

export default CartBar;