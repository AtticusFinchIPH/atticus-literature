import { makeStyles } from "@material-ui/styles";
import { FONT_F_DANCING_SCRIPT, FONT_F_PLAYFAIR, LIGHT_WHITE, LIGHT_WHITE_BLUE } from '../../../utils/theme';

import coverDesktop from '../../../images/cover-desktop.jpg';
import coverMobile from '../../../images/cover-mobile.jpg';

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
        paddingBottom: theme.spacing(2),
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
            height: theme.spacing(121.875),
            bottom: theme.spacing(140.5),
        },
        [theme.breakpoints.between('sm', 'md')]: {
            height: theme.spacing(121.875),
        },
        borderRadius: theme.spacing(1),
    },
    recommendeds: {
        color: LIGHT_WHITE,
    },
    divider: {
        width: theme.spacing(10),
        marginBottom: theme.spacing(6),
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

export default useStyle;