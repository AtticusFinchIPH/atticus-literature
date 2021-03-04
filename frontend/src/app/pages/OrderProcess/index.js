
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import useStyles from './styles';
import { CircularProgress, Container, Slide, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import CartOpenContext from '../../../contexts/CartOpenContext';
import { Elements as StripeElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getPublishKey } from '../../../utils/stripeAPI';
import FormShipping from './FormShipping';
import FormPayment from './FormPayment';
import FormComplete from './FormComplete';

const OrderProcess = () => {
    const classes = useStyles();
    const history = useHistory();
    const intl = useIntl();
    const shippingInfoTransl = intl.formatMessage({id: 'shipping_info', defaultMessage: "Shipping information"});
    const paymentTransl = intl.formatMessage({id: 'payment', defaultMessage: "Payment"});
    function getSteps() {
        return [shippingInfoTransl, paymentTransl];
    }
    const { country, state, city, loading: shippingFeeLoading, info: shippingFeeInfo } = useSelector(state => state.shippingAddress);
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
    const [activeStep, setActiveStep] = useState(0);
    const [stripePromise, setStripePromise] = useState(null)
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
        if (shippingFeeLoading || !city?.name || !state?.name || !country?.name ) history.replace("/checkout/");
    }, [city, state, country, shippingFeeLoading]);
    useEffect(() => {
        setCartOpen(false); // Always close cart bar in this screen
    }, [isCartOpen]);
    useEffect(() => {
        (async() => {
            const { publishKey } = await getPublishKey();
            const stripe = loadStripe(publishKey);
            setStripePromise(stripe);
        })();
    }, []);
    return (
        <div>
        {
            stripePromise
            ?
            <StripeElements stripe={stripePromise}>
                <div className={classes.root}>
                    <Container className={classes.container} maxWidth='md'>
                        {
                            activeStep !== 2
                            &&
                            <Stepper className={classes.gridStepper} activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        }
                        <Slide in={activeStep === 0} direction="right" mountOnEnter unmountOnExit>
                            <div>
                                <FormShipping handleNext={handleNext} activeStep={activeStep} />
                            </div>
                        </Slide>
                        <Slide in={activeStep === 1} direction="right" mountOnEnter unmountOnExit >
                            <div>
                                <FormPayment handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} />
                            </div>
                        </Slide>
                        <Slide in={activeStep === 2} direction="right" mountOnEnter unmountOnExit >
                            <div className={classes.orderCompleted}>
                                <FormComplete />
                            </div>
                        </Slide>   
                    </Container>
                </div>       
            </StripeElements>
            :
            <CircularProgress size={40} classes={{ colorPrimary: classes.circularProgress }} />
        }
        </div>
    )
}

export default OrderProcess;