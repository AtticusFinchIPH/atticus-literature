
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import clsx from 'clsx';
import axios from 'axios';
import { Button, Divider, InputAdornment, TextField, Typography } from '@material-ui/core';

import useStyles from './styles';
import { shippingFeeCalc, totalSumCalc, totalSumNumber, wholeSaleCalc } from '../../../utils/priceCalculator';
import { saveOrderFormShipping } from '../../../actions/orderActions';

const TYPE_FIRSTNAME = "TYPE_FIRSTNAME";
const TYPE_LASTNAME = "TYPE_LASTNAME";
const TYPE_EMAIL = "TYPE_EMAIL";
const TYPE_PHONE = "TYPE_PHONE";
const TYPE_ADDRESS = "TYPE_ADDRESS";

const FormShipping = ({handleNext, activeStep}) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const intl = useIntl();
    const firstnameTransl = intl.formatMessage({id: 'firstname', defaultMessage: "First Name"});
    const lastnameTransl = intl.formatMessage({id: 'lastname', defaultMessage: "Last Name"});
    const emailTransl = intl.formatMessage({id: 'email', defaultMessage: "Email"});
    const phoneTransl = intl.formatMessage({id: 'phone', defaultMessage: "Phone Number"});
    const shippingDetailTransl = intl.formatMessage({id: 'shipping_addr_detail', defaultMessage: "Shipping address detail"});
    const cityTransl = intl.formatMessage({id: 'city', defaultMessage: "City"});
    const stateTransl = intl.formatMessage({id: 'state', defaultMessage: "State"});
    const countryTransl = intl.formatMessage({id: 'country', defaultMessage: "Country"});
    const { country, state, city, loading: shippingFeeLoading, info: shippingFeeInfo } = useSelector(state => state.shippingAddress);
    const { cartList } = useSelector(state => state.cart);
    const { firstName, lastName, email, phone, addressDetail } = useSelector(state => state.orderFormShipping);
    const [ firstNameError, setFirstNameError ] = useState();
    const [ lastNameError, setLastNameError ] = useState();
    const [ emailError, setEmailError ] = useState();
    const [ phoneError, setPhoneError ] = useState();
    const [ addressDetailError, setAddressDetailError ] = useState();

    useEffect(() => {
        if (cartList.length === 0 && activeStep === 0) history.replace("/checkout/");
    }, [cartList]);

    const handleTextField = (value, type) => {
        const data = {};
        switch (type) {
            case TYPE_FIRSTNAME:
                data.firstName = value;
                break;
            case TYPE_LASTNAME:
                data.lastName = value;
                break;
            case TYPE_EMAIL:
                data.email = value;
                break;
            case TYPE_PHONE:
                data.phone = value;
                break;
            case TYPE_ADDRESS:
                data.addressDetail = value;
                break;
            default:
                return;
        }
        dispatch(saveOrderFormShipping(data));
    }
    const resetError = () => {
        setFirstNameError(); setLastNameError(); setEmailError(); setPhoneError(); setAddressDetailError();
    };
    const submitShipping = async (e) => {
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
            error?.response?.data?.errors?.map(err => {
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
    return (
        <form className={classes.gridForm} noValidate={false} onSubmit={submitShipping}>
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
                        onChange={(e) => handleTextField(e.target.value, TYPE_FIRSTNAME)}
                        // value={firstName}
                        error={firstNameError}
                        helperText={firstNameError}
                    />
                    <TextField
                        InputLabelProps= {{ className: classes.textfieldLabel }}
                        InputProps={{ className: classes.textfieldInput }}
                        className={clsx(classes.lastname, classes.textfield)}
                        required variant="outlined" fullWidth
                        label={lastnameTransl}
                        onChange={(e) => handleTextField(e.target.value, TYPE_LASTNAME)}
                        // value={lastName}
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
                        onChange={(e) => handleTextField(e.target.value, TYPE_EMAIL)}
                        // value={email}
                        error={emailError}
                        helperText={emailError}
                    />
                    <TextField
                        InputLabelProps= {{ className: classes.textfieldLabel }}
                        InputProps={{ 
                            className: classes.textfieldInput,
                            startAdornment: <InputAdornment 
                                                classes={{ positionStart: classes.inputAdornment }} 
                                                position="start"
                                            >
                                                {`(+${country?.phonecode})`}
                                            </InputAdornment>,
                        }}
                        className={clsx(classes.phone, classes.textfield)}
                        required variant="outlined" fullWidth
                        label={phoneTransl} type="tel"
                        onChange={(e) => handleTextField(e.target.value, TYPE_PHONE)}
                        // value={phone}
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
                        onChange={(e) => handleTextField(e.target.value, TYPE_ADDRESS)}
                        // value={addressDetail}
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
        </form>
    )
}

export default FormShipping;