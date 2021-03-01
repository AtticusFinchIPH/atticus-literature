
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import clsx from 'clsx';
import axios from 'axios';
import useStyles from './styles';
import { Button, Container, Divider, InputAdornment, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';
import CartOpenContext from '../../../contexts/CartOpenContext';
import { shippingFeeCalc, totalSumCalc, totalSumNumber, wholeSaleCalc } from '../../../utils/priceCalculator';

const OrderProcess = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const intl = useIntl();
    const shippingInfoTransl = intl.formatMessage({id: 'shipping_info', defaultMessage: "Shipping information"});
    const paymentTransl = intl.formatMessage({id: 'payment', defaultMessage: "Payment"});
    function getSteps() {
        return [shippingInfoTransl, paymentTransl];
    }
    const firstnameTransl = intl.formatMessage({id: 'firstname', defaultMessage: "First Name"});
    const lastnameTransl = intl.formatMessage({id: 'lastname', defaultMessage: "Last Name"});
    const emailTransl = intl.formatMessage({id: 'email', defaultMessage: "Email"});
    const phoneTransl = intl.formatMessage({id: 'phone', defaultMessage: "Phone Number"});
    const shippingDetailTransl = intl.formatMessage({id: 'shipping_addr_detail', defaultMessage: "Shipping address detail"});
    const cityTransl = intl.formatMessage({id: 'city', defaultMessage: "City"});
    const stateTransl = intl.formatMessage({id: 'state', defaultMessage: "State"});
    const countryTransl = intl.formatMessage({id: 'country', defaultMessage: "Country"});
    const { country, state, city, loading: shippingFeeLoading, info: shippingFeeInfo } = useSelector(state => state.shippingAddress);
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
    const { cartList } = useSelector(state => state.cart);
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ email, setEmail ] = useState();
    const [ phone, setPhone ] = useState();
    const [ addressDetail, setAddressDetail ] = useState();
    const [ firstNameError, setFirstNameError ] = useState();
    const [ lastNameError, setLastNameError ] = useState();
    const [ emailError, setEmailError ] = useState();
    const [ phoneError, setPhoneError ] = useState();
    const [ addressDetailError, setAddressDetailError ] = useState();
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
    const resetError = () => {
        setFirstNameError(); setLastNameError(); setEmailError(); setPhoneError(); setAddressDetailError();
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/orders/validate_shipping",
                            {
                                first_name: firstName,
                                last_name: lastName,
                                email, phone,
                                address_detail: addressDetail,
                            });
            if(response.data.isValidate) {
                resetError();
                handleNext(); 
            }
        } catch (error) {
            error.response.data.erros.errors.map(err => {
                switch(err.param) {
                    case "first_name":
                        setFirstNameError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case "last_name":
                        setLastNameError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case "email":
                        setEmailError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case "phone":
                        setPhoneError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;  
                    case "address_detail":
                        setAddressDetailError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    default:
                        break;
                }
            })
        }
    };
    
    useEffect(() => {
        if (shippingFeeLoading || !city?.name || !state?.name || !country?.name || cartList.length === 0) history.replace("/checkout/");
    }, [city, state, country, shippingFeeLoading, cartList]);
    useEffect(() => {
        setCartOpen(false); // Always close cart bar in this screen
    }, [isCartOpen]);
    return (
        <form className={classes.root} noValidate={false} onSubmit={submitHandler}>
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
                            <div className={classes.singleField}>
                                <Typography variant='h6' component='p'>
                                    <FormattedMessage id='recipient' defaultMessage="Recipient" />
                                </Typography>
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.firstname, classes.textfield)}
                                    required variant="outlined" fullWidth autoFocus
                                    label={firstnameTransl}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    error={firstNameError}
                                    helperText={firstNameError}
                                />
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.lastname, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={lastnameTransl}
                                    onChange={(e) => setLastName(e.target.value)}
                                    error={lastNameError}
                                    helperText={lastNameError}
                                />
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.email, classes.textfield)}
                                    type="email" autoComplete="email"
                                    required variant="outlined" fullWidth
                                    label={emailTransl}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError}
                                    helperText={emailError}
                                />
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ 
                                        className: classes.textfieldInput,
                                        startAdornment: <InputAdornment position="start">{`(+${country?.phonecode})`}</InputAdornment>,
                                    }}
                                    className={clsx(classes.phone, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={phoneTransl}
                                    onChange={(e) => setPhone(e.target.value)}
                                    error={phoneError}
                                    helperText={phoneError}
                                />
                            </div>
                            <div className={classes.singleField}>
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={shippingDetailTransl}
                                    onChange={(e) => setAddressDetail(e.target.value)}
                                    error={addressDetailError}
                                    helperText={addressDetailError}
                                />
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ 
                                        className: classes.textfieldInput, 
                                        readOnly: true, 
                                    }}
                                    className={clsx(classes.city, classes.textfield)}
                                    required variant="outlined" fullWidth 
                                    label={cityTransl} defaultValue={city?.name || ""}
                                />
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ 
                                        className: classes.textfieldInput, 
                                        readOnly: true, 
                                    }}
                                    className={clsx(classes.state, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={stateTransl} defaultValue={state?.name || ""}
                                />
                            </div>
                            <div className={classes.singleField}>
                                <TextField
                                    InputLabelProps= {{ className: classes.textfieldLabel }}
                                    InputProps={{ 
                                        className: classes.textfieldInput, 
                                        readOnly: true, 
                                    }}
                                    className={clsx(classes.textfield)}
                                    required variant="outlined"
                                    label={countryTransl} 
                                    defaultValue={`${country?.flag} ${country?.name}` || ""}
                                />
                                <Link to="/checkout/" className={classes.link}>
                                    <Typography variant="body2" component='p'>
                                        {"("}
                                        <FormattedMessage id='edit_shipping_region' defaultMessage="Edit shipping region" />
                                        {")"}
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.gridSummary}>
                            <div className={clsx(classes.yourOrder, classes.singleField)}>
                                <Typography variant='h6' component='p'>
                                    <FormattedMessage id='your_order' defaultMessage="Your order" />
                                </Typography>
                                <Link to="/checkout/" className={classes.link}>
                                    <Typography variant="body2" component='p'>
                                        {"("}
                                        <FormattedMessage id='edit_cart' defaultMessage="Edit cart" />
                                        {")"}
                                    </Typography>
                                </Link>
                            </div>
                            <Divider />
                            <div className={classes.listItems}>
                                {
                                    cartList.map((item, i) => (
                                        <div key={i} className={classes.item}>
                                            <div style={{ display: 'flex' }}>
                                                <Typography variant='body1' component='p' className={classes.itemTitle} >
                                                    {item.title}
                                                </Typography>
                                                { 
                                                item.quantity > 1 
                                                && 
                                                <Typography variant='body1' component='p'>
                                                    x{item.quantity}
                                                </Typography> }
                                            </div>
                                            <Typography 
                                                className={classes.price}
                                                variant='body1' component='p'
                                            >
                                                {wholeSaleCalc(item)}
                                            </Typography>
                                        </div>
                                    ))
                                }
                            </div>
                            <Divider />
                            {
                                !shippingFeeLoading && !isNaN(shippingFeeInfo?.fee)
                                &&
                                <>
                                <div className={classes.item} style={{paddingBottom: "8px"}}>
                                    <Typography variant='body1' component='p' >
                                        <FormattedMessage id='shipping_fee' defaultMessage="Shippng fee" />    
                                    </Typography>
                                    <Typography variant='body1' component='p' className={classes.price} >
                                        {shippingFeeCalc({ fee: shippingFeeInfo.fee })}
                                    </Typography>
                                </div>
                                <Divider />
                                <div className={classes.item} style={{paddingBottom: "24px"}}>
                                    <Typography variant='h6' component='p' >
                                        <FormattedMessage id='total' defaultMessage="Total" />    
                                    </Typography>
                                    <Typography variant='h6' component='p' className={classes.totalPrice} >
                                        {totalSumCalc({ 
                                            number: totalSumNumber({
                                                items: cartList,
                                                shippingFeeInfo,
                                            }),
                                        })}
                                    </Typography>
                                </div>
                                <Button className={classes.paymentButton} type="submit">
                                    <Typography variant='h6' component='p'>
                                        <FormattedMessage id='continue_payment' defaultMessage="Continue to payment" />
                                    </Typography>
                                </Button>
                                </>
                            }
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
        </form>
    )
}

export default OrderProcess;