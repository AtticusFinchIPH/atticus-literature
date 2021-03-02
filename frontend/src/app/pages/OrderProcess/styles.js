import { makeStyles } from '@material-ui/styles';
import { LIGHT_WHITE, DARK_BLACK } from '../../../utils/theme';

const useStyles = makeStyles((theme) => ({
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
        position: 'absolute',
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: theme.palette.navBar.main,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: '"gridStepper" "gridForm"',
        margin: theme.spacing(0, 0, 1, 0),
        paddingBottom: theme.spacing(8),
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(10, 0, 3, 0),
            paddingBottom: theme.spacing(3),
        }
    },
    gridStepper: {
        gridArea: "gridStepper",
        marginTop: theme.spacing(5),
    },
    gridForm: {
        gridArea: "gridForm",
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: '"gridInput" "gridSummary"',
        margin: theme.spacing(0, 0, 3, 0),
        paddingBottom: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '3fr 2fr',
            gridTemplateRows: '1fr',
            gridTemplateAreas: '"gridInput gridSummary"',
            gridGap: theme.spacing(5),
        },
    },
    gridInput: {
        gridArea: "gridInput",
    },
    gridSummary: {
        gridArea: "gridSummary",
    },
    pairField: {
        display: 'grid',
        padding: theme.spacing(2, 0, 0, 0),
        gridTemplateColumns: '1fr',
        gridTemplateRows: '2fr',
        gridTemplateAreas: '"gridLeft" "gridRight"',
        gridGap: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '3fr 2fr',
            gridTemplateRows: '1fr',
            gridTemplateAreas: '"gridLeft gridRight"',
        },
    },
    singleField: {
        padding: theme.spacing(2, 0, 0, 0),
        display: 'flex',
        alignItems: 'center',
    },
    firstname: { gridArea: 'gridLeft' },
    lastname: { gridArea: 'gridRight' },
    email: { gridArea: 'gridLeft' },
    phone: { gridArea: 'gridRight' },
    city: { gridArea: 'gridLeft' },
    state: { gridArea: 'gridRight' },
    yourOrder: {
        paddingBottom: theme.spacing(2),
    },
    listItems: {
        paddingBottom: theme.spacing(2),
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0, 0, 0),
    },
    itemTitle: {
        maxWidth: '230px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    price: {
        width: theme.spacing(8),
        color: theme.palette.text.blur,
    },
    totalPrice: {
        width: theme.spacing(9),
    },
    paymentButton: {
        width: '100%',
        backgroundColor: theme.palette.sidebarHeader.main,
        color: LIGHT_WHITE,
        '&:hover': {
            color: theme.palette.text.main,
        },
    },
    textfield: {
        
    },
    textfieldInput: {
        color: theme.palette.text.main,
    },
    textfieldLabel: {
        color: theme.palette.text.blur,
    },
    inputAdornment: {
        color: theme.palette.text.main,
    },
    link: {
        textDecoration: "none",
        color: theme.palette.text.main,
        marginLeft: theme.spacing(3),
        '&:hover': { cursor: 'pointer' }, 
    },
    paymentBox: {
        width: "100%",
        border: "solid 1px",
        padding: theme.spacing(1, 2, 1, 2),
    },
}))

export default useStyles;