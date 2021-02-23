import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import { LIGHT_WHITE, DARK_BLUE } from '../../utils/theme';

const useStyles = makeStyles((theme) => ({
    redirectBar: {
        display: 'flex',
    },
    redirectBarHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: theme.spacing(7),
        width: theme.spacing(45),
        color: LIGHT_WHITE,
        backgroundColor: DARK_BLUE,
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing(8),
        },
    },
    redirectBarIconClose: {
        position: 'absolute',
        color: LIGHT_WHITE,
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    redirectBarTitle: {
        flexGrow: 1,
        textAlign: 'center',
    },
}))

export default useStyles;