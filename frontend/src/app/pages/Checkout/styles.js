import { makeStyles } from '@material-ui/styles';
import { LIGHT_WHITE, DARK_BLACK } from '../../../utils/theme';

const useStyles = makeStyles(theme => ({
    themeTextColor: {
        color: theme.palette.text.main,
    },
    themeNavbarBackground: {
        backgroundColor: theme.palette.navBar.main,
    },
    actionIcon: {
        padding: '3px',
        color: theme.palette.text.main,
    },
    root: {
        position: 'relative',
        top: theme.spacing(7),
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.main,
        whiteSpace: 'pre-line',
        minHeight: '90vh',
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(8),
        },
    },
    container: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: '"gridList" "gridSummary"',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: '1fr',
            gridTemplateAreas: '"gridList gridSummary"',
            gridGap: theme.spacing(5),
            paddingTop: theme.spacing(10),
        },
    },
    gridList: {
        gridArea: "gridList",
        maxWidth: theme.spacing(75),
        margin: 'auto',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            minWidth: theme.spacing(70),
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            width: 'auto',
            minWidth: 'auto',
        },
    },
    gridSummary: {
        gridArea: "gridSummary",
        maxWidth: theme.spacing(75),
        margin: 'auto',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            minWidth: theme.spacing(70),
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            width: 'auto',
            minWidth: 'auto',
        },
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    itemList: {

    },
    cartItem: {
        display: 'grid',
        width: '100%',
        height: theme.spacing(20),
        padding: theme.spacing(2, 1, 2, 1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.navBar.main,
        color: theme.palette.text.main,
        gridTemplateColumns: '80px auto 80px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '80px auto 120px',
        },
    },
    cartItemMedia: {
        width: theme.spacing(10),
        height: theme.spacing(16),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    cardItemContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 2, 0, 2),
    },
    cartItemTitle: {
        maxHeight: theme.spacing(6),
        overflow: 'hidden',
    },
    cartItemAuthor: {
        height: theme.spacing(2.5),
        maxWidth: theme.spacing(16),
        overflow: 'hidden',
        marginBottom: theme.spacing(1),
    },
    cartItemQuantity: {
        display: 'flex', 
        justifyContent: 'start',
        alignItems: 'center',
    },
    cartItemWholesale: {
        display: 'grid',
        gridTemplateRows: '40px autp',
        gridTemplateAreas: '"saleCancel" "saleNumber"',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'auto 40px',
            gridTemplateAreas: '"saleNumber saleCancel"',
        },
    },
    saleNumber: {
        gridArea: 'saleNumber',
        display: 'flex',
        flexDirection: 'column-reverse',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    saleCancel: {
        gridArea: 'saleCancel',
        position: 'relative',
    },
    removeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    additional: {
        margin: theme.spacing(3, 0, 3, 0)
    },
    additionalTitle: {

    },
    additionalContent: {
        margin: theme.spacing(0, 0, 1, 0)
    },
    summaryPaper: {
        padding: theme.spacing(2, 1, 2, 1),
        margin: theme.spacing(0, 0, 1, 0),
        backgroundColor: theme.palette.navBar.main,
        color: theme.palette.text.main,
    },
    subtotal: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
    autocomplete: {
        width: '100%',
        padding: theme.spacing(1, 0, 1, 0),
    },
    shippingInput: {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.navBar.main,
    },
    checkoutButton: {
        width: '100%',
        backgroundColor: theme.palette.sidebarHeader.main,
        color: LIGHT_WHITE,
        '&:hover': {
            color: DARK_BLACK,
        },
        '&:disabled': {
            backgroundColor: LIGHT_WHITE,
        },
    }
}));

export default useStyles;