import { makeStyles } from '@material-ui/styles';

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
        gridTemplateRows: 'auto auto auto',
        gridTemplateAreas: '"gridStepper" "gridInput" "gridSummary"',
        margin: theme.spacing(5, 0, 3, 0),
        paddingBottom: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '3fr 2fr',
            gridTemplateRows: '2fr',
            gridTemplateAreas: '"gridStepper gridStepper" "gridInput gridSummary"',
            gridGap: theme.spacing(5),
            margin: theme.spacing(10, 0, 3, 0),
        },
        [theme.breakpoints.up('md')]: {
            paddingBottom: theme.spacing(3),
        }
    },
    gridStepper: {
        gridArea: "gridStepper",
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
}))

export default useStyles;