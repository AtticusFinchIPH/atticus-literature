import { makeStyles } from '@material-ui/styles';

const useStyle_Catalogue = makeStyles((theme) => ({
    noBorderRadius: {
        borderRadius: 0,
    },
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
    },
}));

export default useStyle_Catalogue;