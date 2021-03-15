
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { Accordion, AccordionDetails, AccordionSummary, Container, Fade, Link, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './styles';
import { FONT_F_PLAYFAIR } from '../../../utils/theme';
import EIFFEL_IMAGE from '../../../images/duc_eiffel_tower.jpg';
import COLMA_IMAGE from '../../../images/duc_colma_village.jpg';
import HALLSTATT_IMAGE from '../../../images/duc_hallstatt_mountain.jpg';
import ICON_GMAIL from '../../../images/icon_gmail.png';
import ICON_LINKEDIN from '../../../images/icon_linkedin.png';
import ICON_GITHUB from '../../../images/icon_github.png';
import ICON_FACEBOOK from '../../../images/icon_fb.png';

const TOTAL_IMAGES = 3;
const DELAY_SECONDS = 5000;

const AboutUS = () => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const resetTimeout = () => {
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
                                setIndex((prevIndex) => {
                                        console.log(prevIndex)
                                        return prevIndex === TOTAL_IMAGES - 1 ? 0 : prevIndex + 1;
                                })
                            }, DELAY_SECONDS);
        return () => resetTimeout();
    }, [index])
    return(
        <div className={classes.root}>
            <Container className={classes.container} maxWidth='lg'>
                <div className={classes.slidesSection}>
                    <Paper className={classes.paper}>                
                        <Fade in={index === 0} timeout={200} className={classes.fade}>
                            <img src={EIFFEL_IMAGE} alt='Duc at Eiffel Tower' className={classes.image} />
                        </Fade>
                        <Fade in={index === 1} timeout={200} className={classes.fade}>
                            <img src={COLMA_IMAGE} alt='Duc at Colma Village' className={classes.image} />
                        </Fade>
                        <Fade in={index === 2} timeout={200} className={classes.fade}>
                            <img src={HALLSTATT_IMAGE} alt='Duc at Hallstatt Moutain' className={classes.image} />
                        </Fade>
                        <div className={classes.creators}>              
                            <Typography variant='body1' component='p'>
                                <FormattedMessage id='page_creators' defaultMessage="Website's creator(s)" />
                            </Typography>
                        </div>
                    </Paper>
                </div>
                <div className={classes.titleSection}>
                        <Typography variant='h2' component='h1' style={{fontFamily: FONT_F_PLAYFAIR}}>
                            <FormattedMessage id='about_us' defaultMessage='About us' />
                        </Typography>
                    </div>
                <div className={classes.contentSection}>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography variant='h5' component='h2'>
                                <FormattedMessage id='idea' defaultMessage='The Idea' />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body1' component='p'>
                                <FormattedMessage id='idea_detail' 
                                    defaultMessage="Atticus Literature is not just a bookstore, but we want to make it a platform for booklovers.
                                    Here, we can exchange books, share thoughts, reviews, evaluations about literary works. All of that will be developed in several versions.
                                    Also, we look forward to having you in our community of book lovers. Together we can make our ecosystems grow faster, stronger and more diverse.
                                    So, why not sign up and give us a try, my friend!"
                                />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography variant='h5' component='h2'>
                                <FormattedMessage id='contact' defaultMessage='Contact' />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.contactDetails}>
                            <div className={clsx(classes.gridContact, classes.gridGmail)}>
                                <img src={ICON_GMAIL} alt='gmail icon' className={classes.socialIcon} />
                                <Link variant='body1'>
                                    tranvan.duc.012@gmail.com
                                </Link>
                            </div>
                            <div className={clsx(classes.gridContact, classes.gridLinkedin)}>
                                <img src={ICON_LINKEDIN} alt='linkedin icon' className={classes.socialIcon} />
                                <Link href='https://www.linkedin.com/in/van-duc-tran-393125167/' 
                                    variant='body1'
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </Link>
                            </div>
                            <div className={clsx(classes.gridContact, classes.gridGithub)}>
                                <img src={ICON_GITHUB} alt='github icon' className={classes.socialIcon} />
                                <Link href='https://www.github.com/AtticusFinchIPH'
                                    variant='body1'
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Github
                                </Link>
                            </div>
                            <div className={clsx(classes.gridContact, classes.gridFacebook)}>
                                <img src={ICON_FACEBOOK} alt='facebook icon' className={classes.socialIcon} />
                                <Link href='https://www.facebook.com/profile.php?id=100006746011991'
                                    variant='body1'
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Facebook
                                </Link>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={false} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography variant='h5' component='h2'>
                                <FormattedMessage id='contribution' defaultMessage='Contribution' />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body1' component='p'>
                                <FormattedMessage id='contribution_detail_1' 
                                    defaultMessage="Any contribution is appreciated.
                                    Simply enough, you can visit my github and give "
                                />
                                <Link className={classes.attribute} 
                                    href="https://github.com/AtticusFinchIPH/atticus-literature" 
                                    variant='body1'
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    <FormattedMessage id='this_project' 
                                        defaultMessage="this project"
                                    />
                                </Link>
                                <FormattedMessage id='contribution_detail_2' 
                                    defaultMessage=" a shiny little star.
                                    Thank you so much!"
                                />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={false} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography variant='h5' component='h2'>
                                <FormattedMessage id='images_license' defaultMessage='Images Licence' />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body1' component='p'>
                                <FormattedMessage id='images_license_detail'
                                    defaultMessage="Project uses free license images from: "
                                />
                                <Link className={classes.attribute} href="http://www.freepik.com"
                                    variant='body1'
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    freepik.com
                                </Link>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Container>
        </div>
    )
}

export default AboutUS;