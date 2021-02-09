import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Drawer, IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CartOpenContext from '../../contexts/CartOpenContext';

import useStyles from './CartBar.styles';

const CartBar = () => {
    const classes = useStyles();
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
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

            </div>
            <div className={classes.cartbarCheck}>

            </div>
        </Drawer>
    )
}

export default CartBar;