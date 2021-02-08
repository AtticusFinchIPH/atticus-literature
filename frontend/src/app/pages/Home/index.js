import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Swiper from 'react-id-swiper';
import clsx from 'clsx';
import useStyle from './styles';
import { 
    Box, Container, Hidden, Paper, Typography, IconButton, Avatar,
    Card, CardMedia, CardContent, CardActions, Fade, Grid, 
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { FONT_F_PLAYFAIR } from '../../../utils/theme';
import authorAvatar from '../../../images/author-avatar.jpg';
import data from '../../../data_sample';

const CARD_ITEM_HEIGHT = '450px';
const CARD_ITEM_WIDTH = '200px';

const CardItem = (props) => {
    const classes = useStyle();
    const [isShown, setIsShown] = useState(false);
    const redirect = () => {
        console.log(props.item);
    }
    return(
        <>
        <Card className={classes.cardItem} >
            <CardMedia className={classes.cardMedia} image={props.item.image} title={props.item.title} 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={redirect}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant='body1' component='p'>{props.item.title}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton className={classes.iconButton} aria-label="Add to favorites">
                    <FavoriteBorderOutlinedIcon className={classes.icon}/>
                </IconButton>
                <IconButton className={classes.iconButton} aria-label="Add to cart">
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
                <Typography>
                    <FormattedMessage id='quick_view' defaultMessage='Quick view' />
                </Typography>
            </Box>       
        </Fade>
        </>
    )
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

const Home = () => {
    const classes = useStyle();
    const isDarkMode = useSelector(state => state.isDarkMode);
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
                    <MutipleSlidesPerView 
                        render={(item, i) => <CardItem key={`bestsellers_xs_${i}`} item={item} />}
                        listItems={data.bestsellers}
                    />
                </Container>
                <Container className={classes.section} maxWidth='xl'>
                    <Typography className={clsx(classes.sectionTitle, classes.recommendeds)} variant="h3" component="h3">
                        <FormattedMessage id='recommended_books' defaultMessage="Recommended Books" />
                    </Typography>
                    <hr className={classes.divider}/>
                    <MutipleSlidesPerView 
                        render={(item, i) => <CardItem key={`recommendeds_xs_${i}`} item={item} />}
                        listItems={data.recommendeds}    
                    />
                </Container>
            </Hidden>
            <Hidden smUp>
                <Container className={clsx(classes.section, classes.bestsellers)} maxWidth='xl'>
                    <Typography className={classes.sectionTitle} variant="h3" component="h3">
                        <FormattedMessage id='bestsellers' defaultMessage="Bestsellers" />
                    </Typography>
                    <hr className={classes.divider}/>
                    <CoverflowEffect 
                        render={(item, i) => <CardItem key={`bestsellers_sm_${i}`} item={item} />}
                        listItems={data.bestsellers}
                    />
                </Container>
                <Container className={classes.section} maxWidth='xl'>
                    <Typography className={clsx(classes.sectionTitle, classes.recommendeds)} variant="h3" component="h3">
                        <FormattedMessage id='recommended_books' defaultMessage="Recommended Books" />
                    </Typography>
                    <hr className={classes.divider}/>
                    <CoverflowEffect 
                        render={(item, i) => <CardItem key={`recommendeds_sm_${i}`} item={item} />}
                        listItems={data.recommendeds}
                    />
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