import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import { LIGHT_WHITE, DARK_BLUE } from '../../utils/theme';

const useStyles = makeStyles(theme => ({
    cartbar: {
        
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

    },
    cartbarCheck: {
        
    }
}));

export default useStyles;