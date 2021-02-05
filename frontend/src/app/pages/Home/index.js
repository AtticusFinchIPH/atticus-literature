import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Swiper from 'react-id-swiper';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";
import { 
    Box, Container, Hidden, Paper, Typography, IconButton,
    Card, CardMedia, CardContent, CardActions,
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { FONT_F_DANCING_SCRIPT, FONT_F_PLAYFAIR, } from '../../../utils/theme';
import coverDesktop from '../../../images/cover-desktop.jpg';
import coverMobile from '../../../images/cover-mobile.jpg';
import data from '../../../data_sample';

const CARD_ITEM_HEIGHT = '450px';
const CARD_ITEM_WIDTH = '200px';

const useStyle = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.main,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },
        [theme.breakpoints.down('md')]: {
            padding: 0,
        },
    },
    cover: {
        height: theme.spacing(50),
        position: 'relative',
        backgroundImage: `url(${coverDesktop})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        [theme.breakpoints.down('xs')]: {          
            backgroundImage: `url(${coverMobile})`,
        },
    },
    coverBox: {
        height: '100%',
        [theme.breakpoints.up('lg')]: {
            maxWidth: theme.spacing(46.25),
            padding: theme.spacing(5),
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: theme.spacing(46.25),
            padding: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: theme.spacing(38.25),
            padding: theme.spacing(3),
        },
    },
    coverQuote: {
        fontFamily: FONT_F_DANCING_SCRIPT,
        [theme.breakpoints.up('xs')]: {
            color: '#fff',
        },
        [theme.breakpoints.down('xs')]: {
            color: '#000',
        },
    },
    section: {
        paddingLeft: '0',
        paddingBottom: theme.spacing(3),
        paddingRight: '0',
        paddingTop: theme.spacing(6),
        textAlign: 'center',
    },
    sectionTitle: {
        paddingBottom: theme.spacing(6),
        fontFamily: FONT_F_PLAYFAIR,
    },
    cardItem: {
        height: CARD_ITEM_HEIGHT,
        width: CARD_ITEM_WIDTH,
        fontFamily: FONT_F_PLAYFAIR,
        color: theme.palette.text.main,
        background: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
    },
    cardMedia: {
        height: theme.spacing(37.5),
        width: theme.spacing(25), 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
    },
    cardContent: {
        height: theme.spacing(6),
        paddingBottom: '0',
    },
    cardActions: {
        display: 'block',
    },
    quickView: {
        position: 'absolute',
        bottom: theme.spacing(18.75),
        height: theme.spacing(3.5),
        padding: theme.spacing(1),
        background: 'rgba(255, 255, 255, 0.75)',
        width: '184px', // CARD_ITEM_WIDTH - padding*2
        cursor: 'pointer',
    }
}))

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
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Add to cart">
                    <ShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
        {
            isShown && (
                <Box className={classes.quickView} 
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                    onClick={redirect}
                >
                    <Typography>
                        <FormattedMessage id='quick_view' defaultMessage='Quick view' />
                    </Typography>
                </Box>
            )
        }
        </>
    )
}

const CoverflowEffect = (props) => {
    const params = {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
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
        loop: true,
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
            <Hidden xsDown>
                <Container className={clsx(classes.section, classes.bestsellers)} maxWidth='xl'>
                    <Typography className={classes.sectionTitle} variant="h3" component="h3">
                        <FormattedMessage id='bestsellers' defaultMessage="Bestsellers" />
                    </Typography>
                    <MutipleSlidesPerView 
                        render={(item, i) => <CardItem key={`bestsellers_xs_${i}`} item={item} />}
                        listItems={data.bestsellers}
                    />
                </Container>
                <Container className={classes.section} maxWidth='xl'>
                    <Typography className={clsx(classes.sectionTitle, classes.recommendeds)} variant="h3" component="h3">
                        <FormattedMessage id='recommended_books' defaultMessage="Recommended Books" />
                    </Typography>
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
                    <CoverflowEffect 
                        render={(item, i) => <CardItem key={`bestsellers_sm_${i}`} item={item} />}
                        listItems={data.bestsellers}
                    />
                </Container>
                <Container className={classes.section} maxWidth='xl'>
                    <Typography className={clsx(classes.sectionTitle, classes.recommendeds)} variant="h3" component="h3">
                        <FormattedMessage id='recommended_books' defaultMessage="Recommended Books" />
                    </Typography>
                    <CoverflowEffect 
                        render={(item, i) => <CardItem key={`recommendeds_sm_${i}`} item={item} />}
                        listItems={data.recommendeds}
                    />
                </Container>
            </Hidden>
        </Container>
    )
}

export default Home;