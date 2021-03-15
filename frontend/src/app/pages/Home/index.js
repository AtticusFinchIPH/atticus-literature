import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import Swiper from 'react-id-swiper';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { 
    Box, Container, Hidden, Paper, Typography, IconButton, Avatar,
    Card, CardMedia, CardContent, CardActions, Fade, Grid, Slide, 
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ThemeContext from '../../../contexts/ThemeContext';

import useStyle from './styles';
import { FONT_F_PLAYFAIR } from '../../../utils/theme';
import spinnerImage from '../../../images/infinitySpinner.gif';
import authorAvatar from '../../../images/author-avatar.jpg';

import CartOpenContext from '../../../contexts/CartOpenContext';
import { addToCart, getBestsellers, getRecommendeds } from '../../../actions/productActions';

const CARD_ITEM_HEIGHT = '450px';
const CARD_ITEM_WIDTH = '200px';

const CardItem = (props) => {
    const classes = useStyle();
    const history = useHistory();
    const intl = useIntl();
    const signinTransl = intl.formatMessage({ id: 'signin_demand', defaultMessage: "Please sign in to use this functionality" });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [isShown, setIsShown] = useState(false);
    const { setCartOpen } = useContext(CartOpenContext);
    const { userInfo } = useSelector(state => state.userSignin);
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
        history.push(`/product/${item._id}`);
    }
    const addToFavorites = () => {
        if (userInfo) {

        } else {
            enqueueSnackbar(signinTransl, {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                TransitionComponent: Slide,
            })
        }
    }
    const addItemToCart = () => {
        dispatch(addToCart(props.item));
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
                <IconButton className={classes.iconButton} aria-label="Add to favorites" onClick={addToFavorites}>
                    <FavoriteBorderOutlinedIcon className={classes.icon}/>
                </IconButton>
                <IconButton className={classes.iconButton} aria-label="Add to cart" onClick={addItemToCart}>
                    <AddShoppingCartIcon className={classes.icon} />
                </IconButton>
            </CardActions>
        </Card>
        <Hidden mdDown>
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
        </Hidden>
        <Hidden lgUp>
            <Box className={classes.quickView} 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={redirect}
            >
                <Typography variant='body1'>
                    {priceDeclare}
                </Typography>
            </Box>  
        </Hidden>
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

const CoverflowEffect = (props) => {
    const params = {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        // loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        pagination: {
            el: '.swiper-pagination'
        },
    }
    const swiperSlide = { height: CARD_ITEM_HEIGHT,  width: CARD_ITEM_WIDTH, }
    return (
      <Swiper {...params}>    
        {
            props.listItems.map((item, i) => {
                return (
                    <div className="swiper-slide" style={swiperSlide} key={i}>
                        {props.render(item, i)}
                    </div>)
                }
            )
        }
      </Swiper>
    )
};

CoverflowEffect.propTypes = {
    listItems: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    )
}

const MutipleSlidesPerView = (props) => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        // loop: true,
        direction: 'horizontal',
        mousewheel: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
             // when window width is >= 600px
            600: {
                slidesPerView: 3,
            },
            960: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 5,
            },
            1450: {
                slidesPerView: 6,
            }
        }
    }
    const swiperSlide = { height: CARD_ITEM_HEIGHT,  width: CARD_ITEM_WIDTH, }
    return (
      <Swiper {...params}>
        {
            props.listItems.map((item, i) => {
                return (
                    <div className="swiper-slide" style={swiperSlide} key={i}>
                        {props.render(item, i)}
                    </div>)
                }
            )
        }
      </Swiper>
    )
};

MutipleSlidesPerView.propTypes = {
    listItems: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    )
}

const Home = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const {isDarkMode} = useContext(ThemeContext);
    const bestsellerProducts = useSelector(state => state.bestsellerProducts);
    const { bestsellers, loading: bestsellersLoading } = useMemo(() => bestsellerProducts, [bestsellerProducts]);
    const recommendedProducts = useSelector(state => state.recommendedProducts);
    const { recommendeds, loading: recommendedsLoading } = useMemo(() => recommendedProducts, [recommendedProducts]);
    useEffect(() => {
        dispatch(getBestsellers());
        dispatch(getRecommendeds());
    }, []);
    return(
        <Container className={classes.container} maxWidth='xl'>
            <Paper className={classes.cover}>
                <Box className={classes.coverBox}>
                    <Hidden xsDown>
                        <Typography className={classes.coverQuote} variant="h3" component="h2">
                            A little reading is all the therapy a person needs sometimes.
                        </Typography>
                        <br />
                        <Typography className={classes.coverQuote} variant="h5" component="p">
                            - anonymous -
                        </Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography className={classes.coverQuote} variant="h3" component="h2">
                            Reading is dreaming with open eyes.
                        </Typography>
                        <br />
                        <Typography className={classes.coverQuote} variant="subtitle1" component="p">
                            - Anissa Trisdianty -
                        </Typography>
                    </Hidden>
                </Box>
            </Paper>
            {
                !isDarkMode && <Card className={classes.sectionBack}/>
            }
            <Hidden xsDown>
                <Container className={clsx(classes.section, classes.bestsellers)} maxWidth='xl'>
                    <Typography className={classes.sectionTitle} variant="h3" component="h3">
                        <FormattedMessage id='bestsellers' defaultMessage="Bestsellers" />
                    </Typography>
                    <hr className={classes.divider}/>
                    {
                        bestsellersLoading
                        ? 
                        <div className={classes.loading}>
                            <p>Loading...</p>
                            <img src={spinnerImage} alt="Loading..."/>
                        </div>
                        :
                        <MutipleSlidesPerView 
                            render={(item, i) => <CardItem key={`bestsellers_xs_${i}`} item={item} />}
                            listItems={bestsellers}
                        />
                    }
                </Container>
                <Container className={clsx(classes.section, classes.recommendeds)} maxWidth='xl'>
                    <Typography className={classes.sectionTitle} variant="h3" component="h3">
                        <FormattedMessage id='recommended_books' defaultMessage="Recommended Books" />
                    </Typography>
                    <hr className={classes.divider}/>
                    {
                        recommendedsLoading
                        ?
                        <div className={classes.loading}>
                            <p>Loading...</p>
                            <img src={spinnerImage} alt="Loading..."/>
                        </div>
                        :
                        <MutipleSlidesPerView 
                            render={(item, i) => <CardItem key={`recommendeds_xs_${i}`} item={item} />}
                            listItems={recommendeds}    
                        />
                    }
                </Container>
            </Hidden>
            <Hidden smUp>
                <Container className={clsx(classes.section, classes.bestsellers)} maxWidth='xl'>
                    <Typography className={classes.sectionTitle} variant="h3" component="h3">
                        <FormattedMessage id='bestsellers' defaultMessage="Bestsellers" />
                    </Typography>
                    <hr className={classes.divider}/>
                    {
                        bestsellersLoading
                        ?
                        <div className={classes.loading}>
                            <p>Loading...</p>
                            <img src={spinnerImage} alt="Loading..."/>
                        </div>
                        :
                        <CoverflowEffect 
                            render={(item, i) => <CardItem key={`bestsellers_sm_${i}`} item={item} />}
                            listItems={bestsellers}
                        />
                    }
                </Container>
                <Container className={clsx(classes.section, classes.recommendeds)} maxWidth='xl'>
                    <Typography className={classes.sectionTitle} variant="h3" component="h3">
                        <FormattedMessage id='recommended_books' defaultMessage="Recommended Books" />
                    </Typography>
                    <hr className={classes.divider}/>
                    {
                        recommendedsLoading
                        ?
                        <div className={classes.loading}>
                            <p>Loading...</p>
                            <img src={spinnerImage} alt="Loading..."/>
                        </div>
                        :
                        <CoverflowEffect 
                            render={(item, i) => <CardItem key={`recommendeds_sm_${i}`} item={item} />}
                            listItems={recommendeds}
                        />
                    }
                </Container>
            </Hidden>
            <Container className={clsx(classes.section, classes.author)} maxWidth='xl'>
                <Box className={classes.sectionTitle}>
                    <Typography variant="body1" component="h3" style={{fontFamily: FONT_F_PLAYFAIR}}>
                        <FormattedMessage id='this_month' defaultMessage="This month's" />
                    </Typography>
                    <Typography variant="h3" component="h3" style={{fontFamily: FONT_F_PLAYFAIR}}>
                        <FormattedMessage id='favorite_author' defaultMessage="Favorite Author" />
                    </Typography>
                </Box>
                <hr className={classes.divider}/>
                <Container maxWidth='md'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} style={{textAlign: 'center'}}>
                            <Avatar className={classes.authorAvatar} alt="Author Avatar" src={authorAvatar} variant="rounded" />
                            <Typography className={classes.authorName} variant="h3" component="h4">Trần Văn Đức</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className={classes.authorQuote}  variant="subtitle1" component="p">
                                <i><FormattedMessage id="const_auth_quote" defaultMessage="Author Quote"></FormattedMessage></i>
                            </Typography>
                            <Typography className={classes.authorPresent}  variant="h5" component="p">
                                <FormattedMessage id="const_auth_present" defaultMessage="Author Presentation"></FormattedMessage>
                            </Typography>
                        </Grid>
                    </Grid>  
                </Container>              
            </Container>
        </Container>
    )
}

export default Home;