import { useContext, forwardRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import BigNumber from 'bignumber.js';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, GridList, GridListTile, IconButton, Slide, Typography } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CartOpenContext from '../../contexts/CartOpenContext';
import RemoveIcon from '@material-ui/icons/HighlightOff';
import MinusIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './CartBar.styles';
import { updateLocalCart, removeFromLocalCart } from '../../actions/productActions';

const CARD_ITEM_HEIGHT = '120px';
const CARD_ITEM_WIDTH = '100%'

const Scrollbar = (props) => {
    const classes = useStyles();
    return (
      <GridList className={classes.cartbarScroll} >
        {
            props.listItems.map((item, i) => {
                const addClasses = {};
                addClasses.borderBottom = i === props.listItems.length-1 ? false : true;
                return props.render(item, i, addClasses);
            })
        }
      </GridList>
    )
};

Scrollbar.propTypes = {
    listItems: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    )
}

const CardItem = (props) => {
    const classes = useStyles();
    const item = props.item;
    const addClasses = props.addClasses;
    const {borderBottom} = addClasses;
    let priceDeclare;
    switch (item.currency) {
        case 'usd':
            priceDeclare = `$ ${item.price}`;
            break;
        case 'vnd':
            priceDeclare = `${item.price} vnđ`;
            break;
        default:
            priceDeclare = `$ ${item.price}`;
            break;
    }
    const dispatch = useDispatch();
    const minusQuantity = () => {
        if(item.quantity === 1) return;
        else {
            const product = {...item, quantity: item.quantity-1};
            dispatch(updateLocalCart(product));
        }
    }
    const addQuantity = () => {
        const product = {...item, quantity: item.quantity+1};
        dispatch(updateLocalCart(product));
    }
    const removeItem = () => {
        dispatch(removeFromLocalCart(item._id));
    }
    return (
        <GridListTile style={{
            height: CARD_ITEM_HEIGHT,
            width: CARD_ITEM_WIDTH,
        }}>
            <Card className={classes.cartbarItem}>
                <div className={classes.cartItemMedia} style={{backgroundImage: `url(${item.image}`}}></div>
                <div className={clsx(classes.cardItemContent, borderBottom && classes.borderBottom)}>
                    <div className={classes.cartItemInfo}>
                        <Typography variant='body2' component='p'>{item.title}</Typography>
                        <Typography variant='h6' component='p'>{priceDeclare}</Typography>
                    </div>
                    <div className={classes.cartItemActions}>
                        <div className={classes.quantityActions}>
                            <IconButton onClick={minusQuantity} className={clsx(classes.actionIcon, item.quantity === 1 && classes.disable)} >
                                <MinusIcon fontSize='small' />
                            </IconButton>
                            <Typography variant='body1' component='p'>{item.quantity}</Typography>
                            <IconButton  onClick={addQuantity} className={classes.actionIcon} >
                                <AddIcon fontSize='small' />
                            </IconButton>
                        </div>
                        <IconButton  onClick={removeItem} className={classes.actionIcon}>
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
            </Card>
        </GridListTile>
    )
}

CardItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    })
}

// Must keep this Transition component outside of whatever component using it (Dialog component in this case).
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CartBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const [ isDialogOpen, setDialogOpen ] = useState(false);
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
    const { userInfo } = useSelector(state => state.userSignin);
    const cart = useSelector(state => state.cart);
    const { cartList } = cart;
    // Assume the currency of all items is USD
    let subtotal = new BigNumber(cartList.reduce((total, item) => total + item.quantity*item.price , 0));
    const subtotalDeclare = `$ ${subtotal.decimalPlaces(2)}`;
    const checkCart = () => {
        if(userInfo){

        } else setDialogOpen(true);
        setCartOpen(false);
    }
    const handleNo = () => {
        setDialogOpen(false);
        history.replace("/checkout");
    }
    const handleYes = () => {
        setDialogOpen(false);
    }
    return(
        <>
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
            {
                cartList?.length > 0
                ?
                <>
                <div className={classes.cartbarContent}>
                    <Scrollbar
                        render={(item, i, addClasses) => <CardItem key={i} item={item} addClasses={addClasses} />}
                        listItems={cartList}
                    />
                    <div className={classes.cartbarSubtotal}>
                        <Typography variant='h5' component='p'>
                            <FormattedMessage id='subtotal' defaultMessage='Subtotal' /><span> :</span>
                        </Typography>
                        <Typography variant='h4' component='p'>{subtotalDeclare}</Typography>
                    </div>
                </div>
                <div className={classes.cartbarCheck}>
                    <button className={classes.cartbarCheckButton} onClick={checkCart}>
                        <Typography variant='button' component='p'>
                            <FormattedMessage id='cart_save_proceed' defaultMessage='Save & Proceed' />
                        </Typography>
                    </button>
                </div>
                </>
                :
                <div className={classes.cartbarContent}>
                    <Typography variant='body1' component='p'>
                        <FormattedMessage id='cart_empty' defaultMessage='Your cart is empty' />
                    </Typography>
                </div>      
            }
        </Drawer>
            <Dialog
                open={isDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={e => setDialogOpen(false)}
                aria-labelledby="cart-ask-dialog-title"
                aria-describedby="cart-ask-dialog-description"
            >
                <DialogTitle id="cart-ask-dialog-title">
                    <FormattedMessage id='cart_ask_signin_title' defaultMessage='Do you want to sign in/sign up first?' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="cart-ask-dialog-description">
                        <FormattedMessage id='cart_ask_signin_text' 
                        defaultMessage='Sign in to make your purchase process faster, making it easier to track and manage orders more proficiently.' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleNo} color="primary">
                        <FormattedMessage id='no_continue' defaultMessage="No, continue" />
                    </Button>
                    <Button onClick={handleYes} color="primary">
                        <FormattedMessage id='yes_register' defaultMessage="Sign up" />
                    </Button>
                    <Button onClick={handleYes} color="secondary">
                        <FormattedMessage id='yes_signin' defaultMessage="Sign in" />
                    </Button>
                </DialogActions>
            </Dialog>
        
        </>
    )
}

export default CartBar;