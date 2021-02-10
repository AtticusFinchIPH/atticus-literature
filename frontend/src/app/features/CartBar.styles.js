import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import { LIGHT_WHITE, DARK_BLUE } from '../../utils/theme';

const useStyles = makeStyles(theme => ({
    disable: {
        '&:hover': {
            cursor: 'auto',
            backgroundColor: 'transparent',
        }
    },
    borderBottom: {
        borderBottom: 'hsl(220, 16%, 50%) solid 1px',
    },
    cartbar: {
        display: 'flex',
    },
    cartbarHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: theme.spacing(7),
        width: '100%',
        color: LIGHT_WHITE,
        backgroundColor: DARK_BLUE,
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing(8),
        },
    },
    cartbarIconClose: {
        position: 'absolute',
        color: LIGHT_WHITE,
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    cartbarTitle: {
        flexGrow: 1,
        textAlign: 'center',
    },
    cartbarContent: {
        position: 'relative',
        height: 'calc(100% - 114px - 56px)',
        width: theme.spacing(45),
        padding: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 114px - 64px)',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cartbarScroll: {
        display: 'block'
    },
    cartbarItem: {
        display: 'grid',
        gridTemplateColumns: '80px auto',
        height: '100%',
        paddingBottom: theme.spacing(1),
    },
    cartItemMedia: {
        height: '100%',
        width: theme.spacing(10),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    cardItemContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 0,
        paddingRight: theme.spacing(2),
        paddingBottom: 0,
        paddingLeft: theme.spacing(2),
    },
    cartItemActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    quantityActions: {
        display: 'flex',
        alignItems: 'center',
    },
    actionIcon: {
        padding: '3px'
    },
    cartbarSubtotal: {
        height: theme.spacing(14.25),
        width: theme.spacing(32),
        paddingTop: theme.spacing(1.5),
    },
    cartbarCheck: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.spacing(14.25),
        width: '100%',
        padding: theme.spacing(4),
        borderTop: '1px solid #000',
    },
    cartbarCheckButton: {
        color: LIGHT_WHITE,
        backgroundColor: DARK_BLUE,
        height: theme.spacing(6.25),
        width: theme.spacing(32),
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: fade(DARK_BLUE, 0.75),
            border: '1px solid #fff',
        },
    }
}));

export default useStyles;