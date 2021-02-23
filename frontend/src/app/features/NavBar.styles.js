import { makeStyles } from "@material-ui/styles";

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
        color: theme.palette.text.main,
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
}));

export default useStyle;