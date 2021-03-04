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
        borderRadius: theme.spacing(1.25),
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
        width: theme.spacing(10),
    },
    paymentButton: {
        width: '100%',
        backgroundColor: theme.palette.sidebarHeader.main,
        color: LIGHT_WHITE,
        '&:hover': {
            color: theme.palette.text.main,
            backgroundColor: theme.palette.background.main,
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
        position: "relative",
        width: "100%",
        border: "solid 1px",
        padding: theme.spacing(1, 2, 1, 2),
    },
    creditImages: {
        position: "absolute",
        top: theme.spacing(7),
        right: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        }
    },
    creditImage: {
        width: '50px',
        marginLeft: theme.spacing(1),
    },
    paypalImage: {
        position: "absolute",
        width: "50px",
        bottom: theme.spacing(1),
        right: theme.spacing(2),
    },
    circularProgress: {
        color: theme.palette.orangeBlue.main,
    },
    paymentError: {
        textAlign: "center",
        paddingTop: theme.spacing(1),
    },
    orderCompleted: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    formComplete: {
        borderRadius: theme.spacing(1.25),
        margin: theme.spacing(15, 0, 15, 0),
        height: "330px",
        [theme.breakpoints.up("sm")]: {
            height: "65vh",
        },
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(5, 0, 5, 0),
        },
    },
    goHomeLink: {
        position: "absolute",
        width: "88px", height: "27px",
        left: "50%", top: "67%",
        transform: "translateX(-44%)",
        [theme.breakpoints.up("sm")]: {
            width: "160px", height: "40px",
            left: "50%", top: "71%",
            transform: "translateX(-43%)",
        },
        [theme.breakpoints.up("md")]: {
            width: "160px", height: "40px",
            left: "50%", top: "76%",
            transform: "translateX(-44%)",
        },
    },
    goHomeButton: {
        width: "100%",
        height: "100%",
        borderRadius: "15px",
    },
    attribute: {
        color: theme.palette.text.main,
        textDecoration: 'none',
    },
}))

export default useStyles;