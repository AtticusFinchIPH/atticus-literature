
import { makeStyles } from '@material-ui/core/styles';
import { LIGHT_WHITE } from '../../utils/theme';

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        whiteSpace: 'pre-line',
        maxWidth: theme.spacing(50),
        padding: theme.spacing(5, 2, 7, 2),
    },
    iconBox: {
        margin: theme.spacing(1, 0, 1, 0),
    },
    icon: {
        height: theme.spacing(5),
    },
    welcome: {
        marginBottom: theme.spacing(2),
    },
    form: {

    },
    submit: {
        margin: theme.spacing(3, 0, 3),
    },
}));

export default useStyles;