import { makeStyles } from '@material-ui/styles';
import { } from '../../../utils/theme';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: theme.spacing(7),
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.main,
        whiteSpace: 'pre-line',
        minHeight: '90vh',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(8),
        },
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        paddingBottom: theme.spacing(4),     
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '300px auto',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    catalogue: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    products: {
        width: '100%',
    },
}));

export default useStyle;