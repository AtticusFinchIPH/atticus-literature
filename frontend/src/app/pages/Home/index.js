import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Swiper from 'react-id-swiper';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";
import { 
    Box, Container, Hidden, Paper, Typography, IconButton, Avatar,
    Card, CardMedia, CardContent, CardActions, Fade, Grid,
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { FONT_F_DANCING_SCRIPT, FONT_F_PLAYFAIR, LIGHT_WHITE, LIGHT_WHITE_BLUE } from '../../../utils/theme';
import coverDesktop from '../../../images/cover-desktop.jpg';
import coverMobile from '../../../images/cover-mobile.jpg';
import authorAvatar from '../../../images/author-avatar.jpg';
import data from '../../../data_sample';

const CARD_ITEM_HEIGHT = '450px';
const CARD_ITEM_WIDTH = '200px';

const useStyle = makeStyles((theme) => ({
    container: {
        position: 'relative',
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.main,
        whiteSpace: 'pre-line',
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
            color: LIGHT_WHITE,
        },
        [theme.breakpoints.down('xs')]: {
            color: '#000',
        },
    },
    section: {
        position: 'relative',
        paddingLeft: '0',
        paddingBottom: theme.spacing(3),
        paddingRight: '0',
        paddingTop: theme.spacing(6),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '90%',
        },
    },
    sectionTitle: {
        paddingBottom: theme.spacing(6),
        fontFamily: FONT_F_PLAYFAIR,
    },
    sectionBack: {
        position: 'absolute',
        backgroundColor: theme.palette.sectionBack.main,
        height: theme.spacing(118.75),
        width: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: theme.spacing(70.25),
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - 80px)',
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(140.5),
            bottom: theme.spacing(140.5),
        },
        [theme.breakpoints.between('sm', 'md')]: {
            height: theme.spacing(141),
        },
        borderRadius: theme.spacing(1),
    },
    recommendeds: {
        color: LIGHT_WHITE,
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
        color: LIGHT_WHITE,
    },
    cardActions: {
        display: 'block',
    },
    iconButton: {
        '&:hover': {
            backgroundColor: theme.palette.icon.hover,
        },
    },
    icon: {
        color: LIGHT_WHITE,
    },
    quickView: {
        position: 'absolute',
        bottom: theme.spacing(18.75),
        height: theme.spacing(3.5),
        padding: theme.spacing(1),
        background: 'rgba(255, 255, 255, 0.75)',
        width: '184px', // CARD_ITEM_WIDTH - padding*2
        cursor: 'pointer',
        color: '#000',
    },
    author: {
        [theme.breakpoints.up('md')]: {
            height: theme.spacing(70.25),
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(140.5),
        },
    },
    authorAvatar: {
        display: 'inline-block',
        width: theme.spacing(30),
        height: theme.spacing(30),
        boxShadow: `0 10px 10px 0 ${LIGHT_WHITE_BLUE}`,
    },
    authorName: {
        paddingTop: theme.spacing(3.78),
        paddingBottom: theme.spacing(3.78),
        fontFamily: FONT_F_PLAYFAIR,
    },
    authorQuote: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'justify',
        },
        paddingBottom: '15px',
    },
    authorPresent: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'justify',
        },
    },
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
            <Container className={clsx(classes.section, classes.author)} maxWidth='xl'>
                <Box className={classes.sectionTitle}>
                    <Typography variant="body1" component="h3" style={{fontFamily: FONT_F_PLAYFAIR}}>
                        <FormattedMessage id='this_month' defaultMessage="This month's" />
                    </Typography>
                    <Typography variant="h3" component="h3" style={{fontFamily: FONT_F_PLAYFAIR}}>
                        <FormattedMessage id='favorite_author' defaultMessage="Favorite Author" />
                    </Typography>
                </Box>
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