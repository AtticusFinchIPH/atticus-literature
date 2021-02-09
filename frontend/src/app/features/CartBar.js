import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Drawer, IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CartOpenContext from '../../contexts/CartOpenContext';

import useStyles from './CartBar.styles';

const CartBar = () => {
    const classes = useStyles();
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
    const cart = useSelector(state => state.cart);
    const { cartList } = cart;
    const checkCart = () => {

        setCartOpen(false);
    }
    return(
        <Drawer className={classes.cartbar} anchor='right' variant='temporary' open={isCartOpen} onClose={e => setCartOpen(false)}>
            <div className={classes.cartbarHeader}>
                <IconButton className={classes.cartbarIconClose} onClick={e => setCartOpen(false)}>
                    <ChevronRightIcon />
                </IconButton>
                <div className={classes.cartbarTitle} >
                    <Typography variant='h5' component='p'>
                        <FormattedMessage id='cart' defaultMessage='Cart' />
                    </Typography>
                </div>
            </div>
            <div className={classes.cartbarContent}>
                {
                    cartList?.length > 0
                    ?
                    <Typography variant='body1' component='p'>
                        <FormattedMessage id='cart_empty' defaultMessage='Your cart is empty' />
                    </Typography>
                    :
                    <></>
                }
            </div>
            <div className={classes.cartbarCheck}>
                <button className={classes.cartbarCheckButton} onClick={checkCart}>
                    <Typography variant='button' component='p'>
                        <FormattedMessage id='cart_detail' defaultMessage='Cart detail' />
                    </Typography>
                </button>
            </div>
        </Drawer>
    )
}

export default CartBar;