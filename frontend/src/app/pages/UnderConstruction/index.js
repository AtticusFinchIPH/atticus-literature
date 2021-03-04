
import { makeStyles } from '@material-ui/styles';
import under_construction from '../../../images/under_construction.jpg';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: theme.spacing(7),
        paddingBottom: theme.spacing(1.5),
        backgroundColor: theme.palette.background.main,
        height: '90vh',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(8),
        },
    },
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#e5953e',
    },
    img: {
        position: 'relative',
        height: '88vh',
        zIndex: 1,
    },
    blueBackground: {
        position: "absolute",
        width: "100%",
        height: "62vh",
        backgroundColor: '#94dae6',
        zIndex: 0,
    },
}));

const UnderConstruction = () => {
    const classes = useStyle();
    return(
        <div className={classes.root}>
            <div className={classes.container}>
                <img src={under_construction} alt="Broken smartphone" className={classes.img}/>
                <div className={classes.blueBackground}>
                </div>
            </div>
        </div>
    )
}

export default UnderConstruction;