import { makeStyles } from '@material-ui/styles';
import { FONT_F_PLAYFAIR, LIGHT_WHITE } from '../../../utils/theme';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: theme.spacing(7),
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.main,
        whiteSpace: 'pre-line',
        minHeight: '90vh',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(8),
        },
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        paddingBottom: theme.spacing(4),     
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '280px auto',
        gridGap: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    catalogue: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    products: {
        width: '100%',
    },
    table: {
        
    },
    item: {
        display: 'inline-block',
        position: 'relative',
        height: theme.spacing(50),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '33.33%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '20%',
        },
    },
    cardItem: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        height: theme.spacing(50),
        width: theme.spacing(21),
        fontFamily: FONT_F_PLAYFAIR,
        color: theme.palette.text.main,
        background: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
        transition: 'all 150ms ease-in-out',
        '&:hover': {
            transform: 'translateX(-50%) scale(1.05)',
        },
    },
    cardMedia: {
        height: theme.spacing(31.5),
        width: theme.spacing(21), 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
    },
    cardContent: {
        height: theme.spacing(8),
        paddingBottom: '0',
        overflow: 'hidden',
    },
    cardActions: {
        display: 'block',
    },
    iconButton: {
        
    },
    icon: {
        color: theme.palette.text.main,
    },
    quickView: {
        position: 'absolute',
        left: '50%',
        bottom: theme.spacing(18),
        height: theme.spacing(5),
        padding: theme.spacing(1),
        background: 'rgba(255, 255, 255, 0.75)',
        width: '168px', // CARD_ITEM_WIDTH - padding*2
        cursor: 'pointer',
        color: '#000',
        transform: 'translateX(-50%) scale(1.05)',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyle;