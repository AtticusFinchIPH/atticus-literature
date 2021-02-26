import { makeStyles } from '@material-ui/styles';

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
        [theme.breakpoints.up('md')]: {
            margin: 0,
        },
    },
    gridSummary: {
        gridArea: "gridSummary",
        maxWidth: theme.spacing(75),
        margin: 'auto',
        [theme.breakpoints.up('md')]: {
            margin: 0,
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
}));

export default useStyles;