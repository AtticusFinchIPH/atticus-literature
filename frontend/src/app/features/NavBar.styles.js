import { makeStyles } from "@material-ui/styles";
import { fade } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: theme.palette.text.main,
    },
    noBorderRadius: {
        borderRadius: 0,
    },
    appBar: {
        position: 'fixed',
        backgroundColor: theme.palette.navBar.main,
        color: theme.palette.text.main,
    },
    pagesSections: {
        position: 'absolute',
        display: 'flex',
        right: '50%',
        transform: 'translateX(50%)',
        textDecoration: 'none',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',
        fontFamily: 'Playfair Display',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default useStyle;