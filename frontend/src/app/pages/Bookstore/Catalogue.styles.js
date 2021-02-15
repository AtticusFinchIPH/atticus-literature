import { makeStyles } from '@material-ui/styles';

const useStyle_Catalogue = makeStyles((theme) => ({
    container: {
        width: '100%',
    },
    section: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderBottom: 'hsl(220, 16%, 50%) solid 1px',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 0,
        width: '100%',
    },
}));

export default useStyle_Catalogue;