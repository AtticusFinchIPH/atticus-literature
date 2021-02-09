import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import { LIGHT_WHITE, DARK_BLUE } from '../../utils/theme';

const useStyles = makeStyles(theme => ({
    cartbar: {
        display: 'flex',
    },
    cartbarHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: theme.spacing(40),
        height: theme.spacing(7),
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
        flexGrow: 1,
        padding: theme.spacing(4),
        textAlign: 'center',
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