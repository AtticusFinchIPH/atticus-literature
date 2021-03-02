
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import useStyles from './styles';
import { Container, Slide, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import CartOpenContext from '../../../contexts/CartOpenContext';
import { Elements as StripeElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getPublishKey } from '../../../utils/stripeAPI';
import FormShipping from './FormShipping';
import FormPayment from './FormPayment';

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
    const { cartList } = useSelector(state => state.cart);
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
        if (shippingFeeLoading || !city?.name || !state?.name || !country?.name || cartList.length === 0) history.replace("/checkout/");
    }, [city, state, country, shippingFeeLoading, cartList]);
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
                        <Stepper className={classes.gridStepper} activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Slide in={activeStep === 0} direction="right" mountOnEnter unmountOnExit>
                            <div>
                                <FormShipping handleNext={handleNext} />
                            </div>
                        </Slide>
                        <Slide in={activeStep === 1} direction="right" mountOnEnter unmountOnExit >
                            <div>
                                <FormPayment handleBack={handleBack} handleNext={handleNext} />
                            </div>
                        </Slide>
                        <Slide in={activeStep === 2} direction="right" mountOnEnter unmountOnExit >
                            <Typography>Finish</Typography>
                        </Slide>   
                    </Container>
                </div>       
            </StripeElements>
            :
            <> </>
        }
        </div>
    )
}

export default OrderProcess;