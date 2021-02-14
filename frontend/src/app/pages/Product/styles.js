import { makeStyles } from '@material-ui/styles';
import { DARK_GRAY, LIGHT_WHITE } from '../../../utils/theme';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: theme.spacing(7),
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.main,
        whiteSpace: 'pre-line',
        minHeight: '90vh',
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(8),
        },
    },
    container: {
        position: 'relative',
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(10),
            display: 'grid',
            gridTemplateColumns: '1fr minmax(0, 1fr)',
            gridTemplateRows: '480px auto',
            gridTemplateAreas: '"gridImage mainInfo" "addtionalInfo mainInfo"',
            gridGap: theme.spacing(5),
        },
    },
    gridImage: {
        position: 'relative',
        backgroundColor: theme.palette.navBar.main,
        height: theme.spacing(60),
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing(60),
            gridArea: "gridImage",
        }
    },
    favoriteButton: {
        position: 'absolute',
        color: theme.palette.secondary.light,
        right: theme.spacing(2),
        bottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            right: theme.spacing(0),
        }
    },
    mainInfo: {
        paddingTop: theme.spacing(5),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(0),
            gridArea: "mainInfo",
        },
    },
    additionalInfo: {
        paddingTop: theme.spacing(5),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(0),
            gridArea: "addtionalInfo",
        },
    },
    productImage: {
        position: 'absolute',
        height: theme.spacing(45),
        width: theme.spacing(32),
        top: '50%',
        right: '50%',
        transform: `translate(50%, -50%)`, 
        boxShadow: `-8px 10px 4px ${DARK_GRAY}`,
    },
    mainInfoTitle: {

    },
    mainInfoActions: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: '1fr auto',
        gridTemplateAreas: '"infoPrice infoQuantity" "infoAdd infoAdd"',
        gridGap: theme.spacing(4),
        paddingTop: theme.spacing(2),
    },
    infoPrice: {
        gridArea: 'infoPrice',
        paddingTop: theme.spacing(0.75),
    },
    infoQuantity: {
        gridArea: 'infoQuantity',
        display: 'flex',
        alignItems: 'baseline',
    },
    infoAdd: {
        gridArea: 'infoAdd',
        width: '100%',
        color: theme.palette.text.main,
    },
    infoTextfield: {
        width: theme.spacing(10),
        marginLeft: theme.spacing(1),
        backgroundColor: LIGHT_WHITE,
    },
    infoAddButton: {
        width: '100%',
        textAlign: 'center',
        color: theme.palette.sectionBack.text,
        backgroundColor: theme.palette.sectionBack.main,
        '&:hover': {
            color: theme.palette.sectionBack.textHover,
        }
    },
    mainInfoCollapses: {

    },
    collapseSection: {
        marginTop: theme.spacing(2),
    },
    collapseTitle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    collapseIcon: {
        color: theme.palette.text.main,
    },
    ratingBox: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyle;