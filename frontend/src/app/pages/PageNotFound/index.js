import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import error_image from '../../../images/404.jpg';

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
        backgroundColor: '#4cbdcb',
    },
    img: {
        height: '576px',
        width: '960px',
        [theme.breakpoints.down('sm')]: {
            height: '516px',
            width: '860px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '768px',
            width: '1280px',
        },
    },
    linkHome: {
        position: 'absolute',
        transform: 'translateY(346px)',
        height: '54px',
        width: '240px',
        [theme.breakpoints.down('sm')]: {
            transform: 'translateY(312px)',
            height: '46px',
            width: '220px',
        },
        [theme.breakpoints.up('lg')]: {
            transform: 'translateY(468px)',
            height: '62px',
            width: '312px',
        },
    },
    iconButton: {
        height: '100%', width: '100%', borderRadius: '50px',
    },
    attribute: {
        color: '#fff',
        textDecoration: 'none',
    },
}));

const PageNotFound = () => {
    const classes = useStyle();
    return(
        <div className={classes.root}>
            <div className={classes.container}>
                <img src={error_image} alt="Broken smartphone" className={classes.img}/>
                <a className={classes.attribute} href="http://www.freepik.com" target='_blank' rel="noreferrer">
                    Image designed by roserodionova / Freepik
                </a>
                <Link to='/' className={classes.linkHome}>
                    <IconButton className={classes.iconButton}/>
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound;