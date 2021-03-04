import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import useStyles from './RedirectBar.styles';
import RedirectOpenContext from '../../contexts/RedirectOpenContext';
import { Accordion, AccordionDetails, AccordionSummary, Drawer, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Catalogue from '../pages/Bookstore/Catalogue';

const STORIES_LOCATION = "/under_construction/";
const ABOUT_US_LOCATION = "/about_us/";

const RedirectBar = () => {
    const classes = useStyles();
    const history = useHistory()
    const { isRedirectOpen, setRedirectOpen } = useContext(RedirectOpenContext);
    const redirect = (location) => {
        history.push(location);
        setRedirectOpen(false);
    }
    return(
        <Drawer className={classes.redirectBar} classes={{paper: classes.drawerPaper}}
            anchor='left' variant='temporary'
            open={isRedirectOpen} onClose={e => setRedirectOpen(false)}
        >
            <div className={classes.redirectBarHeader}>
                <div className={classes.redirectBarTitle} >
                    <Typography variant='h5' component='p'>
                        <FormattedMessage id='pages' defaultMessage='Pages' />
                    </Typography>
                </div>
                <IconButton className={classes.redirectBarIconClose} onClick={e => setRedirectOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.iconButton} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant='h6' component='h2'>
                        <FormattedMessage id='bookstore' defaultMessage='Bookstore' />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Catalogue noLastBorderBottom={true}/>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
                <AccordionSummary onClick={e => redirect(STORIES_LOCATION)}>
                    <Typography variant='h6' component='h2'>
                        <FormattedMessage id='stories' defaultMessage='Stories' />
                    </Typography>
                </AccordionSummary>
            </Accordion>
            <Accordion className={classes.accordion}>
                <AccordionSummary onClick={e => redirect(ABOUT_US_LOCATION)}>
                    <Typography variant='h6' component='h2'>
                        <FormattedMessage id='about_us' defaultMessage='About us' />
                    </Typography>
                </AccordionSummary>
            </Accordion>
        </Drawer>
    )
}

export default RedirectBar;