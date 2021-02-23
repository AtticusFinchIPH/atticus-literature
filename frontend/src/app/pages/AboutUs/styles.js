import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
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
        display: 'grid',
        gridGap: theme.spacing(5),
        gridTemplateColumns: '1fr',
        gridTemplateRows: `${theme.spacing(9)}px ${theme.spacing(60)}px auto`,
        gridTemplateAreas: '"gridTitle" "gridSlides" "gridContent"',
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: `${theme.spacing(9)}px ${theme.spacing(84)}px auto`,
            gridTemplateAreas: '"gridTitle" "gridSlides" "gridContent"',
            paddingTop: theme.spacing(10),
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: `${theme.spacing(60)}px auto`,
            gridTemplateRows: `${theme.spacing(9)}px auto`,
            gridTemplateAreas: '"gridSlides gridTitle" "gridSlides gridContent"',
            paddingTop: theme.spacing(10),
        },
    },
    slidesSection: {
        gridArea: 'gridSlides',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'end',
        borderTopLeftRadius: theme.spacing(1.5),
        borderTopRightRadius: theme.spacing(1.5),
        width: '100%',
        height:  theme.spacing(60),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(60),
            height: theme.spacing(84),
        }
    },
    fade: {
        position: 'absolute',
        borderTopLeftRadius: theme.spacing(1.5),
        borderTopRightRadius: theme.spacing(1.5),
        width: '100%',
        height:  '95%',
        bottom: '5%',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height:  theme.spacing(60),
        [theme.breakpoints.up('sm')]: {
            height:  '100%',
        }
    },
    creators: {
        position: 'relative',
        textAlign: 'center',
        marginBottom:  '1px',
        [theme.breakpoints.up('sm')]: {
            marginBottom:  '3px',
        }      
    },
    titleSection: {
        gridArea: 'gridTitle',
        textAlign: 'center',
    },
    contentSection: {
        gridArea: 'gridContent',
    },
    contactDetails: {
        display: 'grid',
        gridGap: theme.spacing(1),
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
        gridTemplateAreas: '"gridGmail" "gridLinkedin" "gridGithub" "gridFacebook"',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gridTemplateAreas: '"gridGmail gridLinkedin" "gridGithub gridFacebook"',
        },
    },
    gridContact: {
        display: 'flex',
        alignItems: 'center',
    },
    gridGmail: {
        gridArea: 'gridGmail',
    },
    gridLinkedin: {
        gridArea: 'gridLinkedin',
    },
    gridGithub: {
        gridArea: 'gridGithub',
    },
    gridFacebook: {
        gridArea: 'gridFacebook',
    },
    socialIcon: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        marginRight: theme.spacing(3),
    }
}));

export default useStyles;