import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Fade, IconButton, Typography } from '@material-ui/core';
import useStyle from './styles';
import boxEmptyImage from '../../../images/box_empty.png';
import CartOpenContext from '../../../contexts/CartOpenContext';
import Pagination from '@material-ui/lab/Pagination';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import Catalogue from './Catalogue';
import { addToCart, getStore } from '../../../actions/productActions';

const CardItem = (props) => {
    const classes = useStyle();
    const history = useHistory();
    const [isShown, setIsShown] = useState(false);
    const { setCartOpen } = useContext(CartOpenContext);
    const dispatch = useDispatch();
    const item = props.item;
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
    const redirect = () => {
        history.push(`/product/${item._id}`)
    }
    const addItemToCart = () => {
        dispatch(addToCart(item));
        setCartOpen(true);
    } 
    return(
        <>
        <Card className={classes.cardItem} >
            <CardMedia className={classes.cardMedia} image={item.image} title={item.title} 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={redirect}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant='body1' component='p'>{item.title}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton className={classes.iconButton} aria-label="Add to favorites">
                    <FavoriteBorderOutlinedIcon className={classes.icon}/>
                </IconButton>
                <IconButton className={classes.iconButton} aria-label="Add to cart" onClick={addItemToCart}>
                    <AddShoppingCartIcon className={classes.icon} />
                </IconButton>
            </CardActions>
        </Card>
        <Fade in={isShown} timeout={{appear: 100, enter: 300, exit: 100}} unmountOnExit>
            <Box className={classes.quickView} 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={redirect}
            >
                <Typography variant='body1'>
                    {priceDeclare}
                </Typography>
            </Box>       
        </Fade>
        </>
    )
}

CardItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    })
}

const Bookstore = () => {
    const PRODUCTS_PER_PAGE = 15;
    let searchArray = [];
    let searchObj = {};
    const classes = useStyle();
    const { search } = useLocation();
    const dispatch = useDispatch();
    const catalogueComponent = useMemo(() => <Catalogue />, []);
    const language = useSelector(state => state.language);
    const { products } = useSelector(state => state.store);
    let countPages = Math.ceil(products.length/PRODUCTS_PER_PAGE) > 0 ? Math.ceil(products.length/PRODUCTS_PER_PAGE) : 1;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState(products.slice(0, PRODUCTS_PER_PAGE));
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setCurrentProducts(products.slice((value-1)*PRODUCTS_PER_PAGE, value*PRODUCTS_PER_PAGE));
    }
    useEffect(() => {
        searchArray = search.slice(1).split('&');
        searchArray.forEach(equation => {
            const key = equation.split('=')[0];
            const value = equation.split('=')[1];
            searchObj[key] = value;
        })
        dispatch(getStore(searchObj));
    }, [search]);
    useEffect(() => {
        setCurrentProducts(products.slice(0, PRODUCTS_PER_PAGE));
    }, [products])
    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth='xl'>
                <div className={classes.title}>
                {
                    language === 'vi'
                    ?
                    <>
                    <Typography variant='h3' component='h1'>Hiệu sách</Typography>
                    <Typography variant='h5' component='h1'>của Atticus</Typography>
                    </>
                    :
                    <>
                    <Typography variant='h5' component='h1'>Atticus's</Typography>
                    <Typography variant='h3' component='h1'>Bookstore</Typography>
                    </>
                }
                </div>
                <div className={classes.content}>
                    <div className={classes.catalogue}>
                        {catalogueComponent}
                    </div>
                    <div className={classes.products}>
                       {
                           products.length > 0
                           ?
                           <>
                           <div className={classes.table}>
                                {
                                    currentProducts.map((item, i) => (
                                        <div key={i} className={classes.item}>
                                            <CardItem item={item}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.pagination}>
                                <Pagination count={countPages} page={currentPage} onChange={handlePageChange} />
                            </div>
                            </>
                            :
                            <div className={classes.emptySection}>
                                <div className={classes.emptyImage}>
                                    <img src={boxEmptyImage} alt="Box empty" />
                                </div>
                                <div>
                                <Typography>
                                    <FormattedMessage id='no_result' defaultMessage='Currently no result' />
                                </Typography>
                                </div>
                            </div>
                       }
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Bookstore;