import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from "@material-ui/styles";
import { Box, Container, Hidden, Paper, Typography } from "@material-ui/core";
import coverDesktop from '../../../images/cover-desktop.jpg';
import coverMobile from '../../../images/cover-mobile.jpg';

const useStyle = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },
        [theme.breakpoints.down('md')]: {
            padding: 0,
        },
    },
    cover: {
        height: theme.spacing(50),
        position: 'relative',
        backgroundImage: `url(${coverDesktop})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        [theme.breakpoints.down('xs')]: {          
            backgroundImage: `url(${coverMobile})`,
        },
    },
    coverBox: {
        height: '100%',
        [theme.breakpoints.up('lg')]: {
            maxWidth: theme.spacing(46.25),
            padding: theme.spacing(5),
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: theme.spacing(46.25),
            padding: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: theme.spacing(38.25),
            padding: theme.spacing(3),
        },
    },
    coverQuote: {
        fontFamily: 'Dancing Script',
        [theme.breakpoints.up('xs')]: {
            color: '#fff',
        },
        [theme.breakpoints.down('xs')]: {
            color: '#000',
        },
    }
}))

const Home = () => {
    const classes = useStyle();
    return(
        <Container className={classes.container} maxWidth='xl'>
            <Paper className={classes.cover}>
                <Box className={classes.coverBox}>
                    <Hidden xsDown>
                        <Typography className={classes.coverQuote} variant="h3" component="h2">
                            A little reading is all the therapy a person needs sometimes.
                        </Typography>
                        <br />
                        <Typography className={classes.coverQuote} variant="h5" component="p">
                            - anonymous -
                        </Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography className={classes.coverQuote} variant="h3" component="h2">
                            Reading is dreaming with open eyes.
                        </Typography>
                        <br />
                        <Typography className={classes.coverQuote} variant="subtitle1" component="p">
                            - Anissa Trisdianty -
                        </Typography>
                    </Hidden>
                </Box>
            </Paper>
            <FormattedMessage id='home' defaultMessage="" />
        </Container>
    )
}

export default Home;