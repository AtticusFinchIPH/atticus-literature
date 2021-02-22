import { makeStyles } from '@material-ui/styles';

const useStyle_Catalogue = makeStyles((theme) => ({
    buttonHover: {
        '&:hover': {
            backgroundColor: theme.palette.buttonHover.main,
        },
    },
    onSellected: {
        backgroundColor: theme.palette.buttonHover.main,
    },
    container: {
        width: '100%',
    },
    section: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderBottom: 'hsl(220, 16%, 50%) solid 1px',
    },
    search: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.palette.text.main,
        border: 'hsl(220, 16%, 50%) solid 1px',
        borderRadius: theme.spacing(3),
        padding: theme.spacing(0, 0, 0, 1.5),
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    searchIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.main,
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 0,
        color: theme.palette.text.main,
        width: '100%',
    },
    subsection: {
        display: 'flex',
        flexDirection: 'column',
    },
    subtitle: {
        borderRadius: 0,
        color: theme.palette.text.main,
        width: '100%',
    }
}));

export default useStyle_Catalogue;