import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Container, Typography, TextField, IconButton, Collapse, Box } from '@material-ui/core';
import useStyle from './styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MinusIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';

import CartOpenContext from '../../../contexts/CartOpenContext';
import { addMultipleToCart, getItemDetail } from '../../../actions/productActions';

const MINUS_INTRO_ICON = 'MINUS_INTRO_ICON';
const MINUS_SHIPPING_ICON = 'MINUS_SHIPPING_ICON';
const MINUS_POLICY_ICON = 'MINUS_POLICY_ICON';
const ADD_INTRO_ICON = 'ADD_INTRO_ICON';
const ADD_SHIPPING_ICON = 'ADD_SHIPPING_ICON';
const ADD_POLICY_ICON = 'ADD_POLICY_ICON';

const Product = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [expandedIntro, setExpandedIntro] = useState(true);
    const [expandedShipping, setExpandedShipping] = useState(false);
    const [expandedPolicy, setExpandedPolicy] = useState(false);
    const { setCartOpen } = useContext(CartOpenContext);
    const viewingProduct = useSelector(state => state.viewingProduct);
    const { product, error } = viewingProduct;
    let priceDeclare;
    if(product) {
        switch (product.currency) {
            case 'usd':
                priceDeclare = `$ ${product.price}`;
                break;
            case 'vnd':
                priceDeclare = `${product.price} vnđ`;
                break;
            default:
                priceDeclare = `$ ${product.price}`;
                break;
        }
    }
    const addQuantity = (e) => {
        const newQuantity = e.target.value;
        if(!newQuantity) {
            return
        } else if(newQuantity < 1) {
            setQuantity(1);
            e.target.value = 1;
        } else setQuantity(newQuantity);
    }
    useEffect(() => {
        dispatch(getItemDetail(productId));
    }, [])
    const handleExpand = (target) => {
        switch (target) {
            case ADD_INTRO_ICON:
                setExpandedIntro(true);
                setExpandedShipping(false);
                setExpandedPolicy(false);
                break;
            case ADD_SHIPPING_ICON:
                setExpandedIntro(false);
                setExpandedShipping(true);
                setExpandedPolicy(false);
                break;
            case ADD_POLICY_ICON:
                setExpandedIntro(false);
                setExpandedShipping(false);
                setExpandedPolicy(true);
                break;
            case MINUS_INTRO_ICON:
                setExpandedIntro(false);
                break;
            case MINUS_SHIPPING_ICON:
                setExpandedShipping(false);
                break;
            case MINUS_POLICY_ICON:
                setExpandedPolicy(false);
                break;
            default:
                break;
        }     
    };
    const handleAddCart = () => {
        const addingProduct = {...product, quantity};
        dispatch(addMultipleToCart(addingProduct));
        setCartOpen(true);
    }
    return(
        <div className={classes.root}>
            {
                product
                ?
                <Container className={classes.container} maxWidth='md'>
                    <div className={classes.gridImage}>
                        <img src={product.image} alt={product.title} className={classes.productImage}/>
                        <IconButton className={classes.favoriteButton} aria-label="Add to favorites">
                            <FavoriteBorderOutlinedIcon className={classes.icon}/>
                        </IconButton>
                    </div>
                    <div className={classes.mainInfo}>
                        <div className={classes.mainInfoTitle}>
                            <Typography variant='h5' component='h1'>
                                {product.title}
                            </Typography>
                            <Typography variant='h6' component='p'>
                                <FormattedMessage id='author_by' defaultMessage='by' /> {product.author}
                            </Typography>
                        </div>
                        <div className={classes.mainInfoActions}>
                            <div className={classes.infoPrice}>
                                <Typography variant='h5' component='p'>
                                    {priceDeclare}
                                </Typography>
                            </div>
                            <div className={classes.infoQuantity}>
                                <Typography variant='body1' component='p'>
                                    <FormattedMessage id='quantity' defaultMessage='Quantity' /> :
                                </Typography> 
                                <TextField id='product-quantity' className={classes.infoTextfield} 
                                    type='number' variant='outlined' size='small'
                                    defaultValue={quantity}
                                    onChange={(e) => addQuantity(e)} />
                            </div>
                            <div className={classes.infoAdd}>
                                <Button className={classes.infoAddButton} onClick={handleAddCart}>
                                    <FormattedMessage id='add_to_cart' defaultMessage='Add to Cart' />
                                </Button>
                            </div>
                        </div>
                        <div className={classes.mainInfoCollapses}>
                            <div className={classes.collapseSection}>
                                <div className={classes.collapseTitle}>
                                    <Typography variant='h6' component='h3'>
                                        <FormattedMessage id='intro' defaultMessage='Introduction' />
                                    </Typography>
                                    {
                                        expandedIntro
                                        ?
                                        <IconButton id={MINUS_INTRO_ICON} onClick={e => handleExpand(MINUS_INTRO_ICON)} >
                                            <MinusIcon fontSize='small' className={classes.collapseIcon}/>
                                        </IconButton>
                                        :
                                        <IconButton id={ADD_INTRO_ICON} onClick={e => handleExpand(ADD_INTRO_ICON)} >
                                            <AddIcon fontSize='small' className={classes.collapseIcon}/>
                                        </IconButton>
                                    }
                                </div>
                                <Collapse in={expandedIntro}>
                                    <Typography variant='body1' component='p'>
                                        {product.description}
                                    </Typography>
                                </Collapse>
                            </div>
                            <div className={classes.collapseSection}>
                                <div className={classes.collapseTitle}>
                                    <Typography variant='h6' component='h3'>
                                        <FormattedMessage id='shipping' defaultMessage='Shipping Info' />
                                    </Typography>
                                    {
                                        expandedShipping
                                        ?
                                        <IconButton id={MINUS_SHIPPING_ICON} onClick={e => handleExpand(MINUS_SHIPPING_ICON)}>
                                            <MinusIcon fontSize='small' className={classes.collapseIcon}/>
                                        </IconButton>
                                        :
                                        <IconButton id={ADD_SHIPPING_ICON} onClick={e => handleExpand(ADD_SHIPPING_ICON)}>
                                            <AddIcon fontSize='small' className={classes.collapseIcon}/>
                                        </IconButton>
                                    }
                                </div>
                                <Collapse in={expandedShipping}>
                                    <Typography variant='body1' component='p'>
                                        <FormattedMessage id='shipping_policy' 
                                            defaultMessage={`Free delivery within Hanoi & Ho Chi Minh City in maximum 2 hours.
                                            Delivery within a maximum of 1 week across the territory of Vietnam.`} />
                                    </Typography>
                                </Collapse>
                            </div>
                            <div className={classes.collapseSection}>
                                <div className={classes.collapseTitle}>
                                    <Typography variant='h6' component='h3'>
                                        <FormattedMessage id='policy' defaultMessage='Return & Refund Policy' />
                                    </Typography>
                                    {
                                        expandedPolicy
                                        ?
                                        <IconButton id={MINUS_POLICY_ICON} onClick={e => handleExpand(MINUS_POLICY_ICON)}>
                                            <MinusIcon fontSize='small' className={classes.collapseIcon}/>
                                        </IconButton>
                                        :
                                        <IconButton id={ADD_POLICY_ICON} onClick={e => handleExpand(ADD_POLICY_ICON)}>
                                            <AddIcon fontSize='small' className={classes.collapseIcon}/>
                                        </IconButton>
                                    }
                                </div>
                                <Collapse in={expandedPolicy}>
                                    <Typography variant='body1' component='p'>
                                        <FormattedMessage id='return_policy' 
                                            defaultMessage={`If you are not satisfied with a product you ordered from our store or if it is defective or damaged, you can return it to us within 3 days of the delivery date, and we will refund you or will replace the entire item.`} />
                                    </Typography>
                            </Collapse>
                            </div>
                        </div>
                    </div>
                    <div className={classes.additionalInfo}>
                        <Box className={classes.ratingBox} component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="disabled" value={product.rating} disabled />
                            {
                                product.rating
                                ?
                                <Typography variant='body1' component='p' style={{paddingLeft: '8px'}}>
                                    {`${product.rating} `}
                                    <FormattedMessage id='stars' defaultMessage='stars' />
                                </Typography>
                                :
                                <></>
                            }
                           
                            <Typography variant='body1' component='p' style={{paddingLeft: '8px'}}>
                                {`(${product.reviewsCount ? 0 : product.reviewsCount} `}
                                <FormattedMessage id='reviews' defaultMessage='reviews' />
                                {')'}
                            </Typography>
                        </Box>
                    </div>
                </Container>
                :
                (
                    error
                    ?
                    <div className={classes.imageSection}>
                        <div className={classes.errorImage}/>
                        <a className={classes.attribute} href="http://www.freepik.com" target='_blank' rel="noreferrer">
                            Image designed by pch.vector / Freepik
                        </a>
                    </div>
                    :
                    <div className={classes.imageSection}>
                        <div className={classes.loadingImage}/>
                        <a className={classes.attribute} href="http://www.freepik.com" target='_blank' rel="noreferrer">
                            Image designed by vectorjuice / Freepik
                        </a>
                    </div>
                )
            }
        </div>
    )
}

export default Product;