import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import error_desktop from '../../../images/404_desktop.jpg';
import error_mobile from '../../../images/404_mobile.jpg';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: theme.spacing(7),
        backgroundColor: theme.palette.background.main,
        height: '90vh',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(8),
        },
    },
    errorImage: {
        backgroundImage: `url(${error_desktop})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '85vh',
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            backgroundImage: `url(${error_mobile})`,
        },
    },
    attribute: {
        color: theme.palette.text.main,
    }
}));

const PageNotFound = () => {
    const classes = useStyle();
    return(
        <div className={classes.root}>
            <div className={classes.errorImage}/>
            <Hidden mdUp>
            <a className={classes.attribute} href="http://www.freepik.com" target='_blank'>
                Image above is designed by Bamdewanto / Freepik
            </a>
            </Hidden>
            <Hidden smDown>
            <a className={classes.attribute} href="http://www.freepik.com" target='_blank'>
                Image above is designed by roserodionova / Freepik
            </a>
            </Hidden>
        </div>
    )
}

export default PageNotFound;