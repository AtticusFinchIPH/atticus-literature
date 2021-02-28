
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import clsx from 'clsx';
import useStyles from './styles';
import { Button, Container, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';

function getSteps() {
    return ['Shipping information', 'Payment'];
}

const OrderProcess = () => {
    const classes = useStyles();
    const history = useHistory();
    const intl = useIntl();
    const firstnameTransl = intl.formatMessage({id: 'firstname', defaultMessage: "First Name"});
    const lastnameTransl = intl.formatMessage({id: 'lastname', defaultMessage: "Last Name"});
    const emailTransl = intl.formatMessage({id: 'email', defaultMessage: "Email"});
    const phoneTransl = intl.formatMessage({id: 'phone', defaultMessage: "Phone Number"});
    const shippingDetailTransl = intl.formatMessage({id: 'shipping_detail', defaultMessage: "Shipping detail"});
    const cityTransl = intl.formatMessage({id: 'city', defaultMessage: "City"});
    const stateTransl = intl.formatMessage({id: 'state', defaultMessage: "State"});
    const countryTransl = intl.formatMessage({id: 'country', defaultMessage: "Country"});
    const { country, state, city } = useSelector(state => state.shippingAddress);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    useEffect(() => {
        if (!city?.name || !state?.name || !country?.name) history.replace("/checkout/");
    }, [city, state, country]);
    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth='md'>
                <Stepper  className={classes.gridStepper} activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {
                    activeStep === 0
                    ? 
                    <>
                        <div className={classes.gridInput}>
                            <Typography variant='body1' component='p'>
                                <FormattedMessage id='recipient' defaultMessage="Recipient" />
                            </Typography>
                            <div className={classes.pairField}>
                                <TextField
                                    className={clsx(classes.firstname, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={firstnameTransl}
                                />
                                <TextField
                                    className={clsx(classes.lastname, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={lastnameTransl}
                                />
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    className={clsx(classes.email, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={emailTransl}
                                />
                                <TextField
                                    className={clsx(classes.phone, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={phoneTransl}
                                />
                            </div>
                            <div className={classes.singleField}>
                                <TextField
                                    className={clsx(classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={shippingDetailTransl}
                                />
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    className={clsx(classes.city, classes.textfield)}
                                    required variant="outlined" fullWidth 
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    label={cityTransl} defaultValue={city?.name || ""}
                                />
                                <TextField
                                    className={clsx(classes.state, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    label={stateTransl} defaultValue={state?.name || ""}
                                />
                            </div>
                            <div className={classes.singleField}>
                                <TextField
                                    className={clsx(classes.textfield)}
                                    required variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    label={countryTransl} defaultValue={country?.name || ""}
                                />
                                <Link to="/checkout/" style={{ textDecoration: "none", marginLeft: "24px", }}>
                                    <Typography variant="body2" component='p'>
                                        {"("}
                                        <FormattedMessage id='edit_shipping_region' defaultMessage="Edit shipping region" />
                                        {")"}
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.gridSummary}>
                            summary
                        </div>
                    </>
                    :
                    activeStep === 1
                    ?
                    <div>
                        Payment
                    </div>
                    :
                    <div>
                        Finish
                    </div>
                }
            </Container>
        </div>
    )
}

export default OrderProcess;