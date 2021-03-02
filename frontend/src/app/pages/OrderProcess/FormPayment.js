
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import clsx from 'clsx';
import axios from 'axios';
import useStyles from './styles';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import StripeInput from './StripeInput';
import { Button, CircularProgress, Collapse, Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { shippingFeeCalc, totalSumCalc, totalSumNumber, wholeSaleCalc } from '../../../utils/priceCalculator';
import paypalImage from '../../../images/payment/paypal.png';
import maestroImage from '../../../images/payment/maestro.png';
import mastercardImage from '../../../images/payment/mastercard.png';
import visaImage from '../../../images/payment/visa.png';

const MODE_PAYMENT_CASH = "MODE_PAYMENT_CASH";
const MODE_PAYMENT_CREDIT = "MODE_PAYMENT_CREDIT";
const MODE_PAYMENT_PAYPAL = "MODE_PAYMENT_PAYPAL";

const FormPayment = ({handleBack, handleNext}) => {
    const classes = useStyles();
    const intl = useIntl();
    const cardNumberTransl = intl.formatMessage({id: 'card_number', defaultMessage: "Card number"});
    const expireDateTransl = intl.formatMessage({id: 'expire_date', defaultMessage: "Expiration date"});
    const { country, state, city, loading: shippingFeeLoading, info: shippingFeeInfo } = useSelector(state => state.shippingAddress);
    const { cartList } = useSelector(state => state.cart);
    const { firstName, lastName, email, phone, addressDetail } = useSelector(state => state.orderFormShipping);
    const [ modePayment, setModePayment ] = useState(MODE_PAYMENT_CASH);
    const [ paymentProcessing, setPaymentProcessing] = useState(false);
    const [ paymentError, setPaymentError ] = useState();

    const changeModePayment = (e) => {
        setPaymentError();
        setModePayment(e.target.value);
    }
    const submitPayment = async (e) => {
        setPaymentError();
        setPaymentProcessing(true);
        switch (modePayment) {
            case MODE_PAYMENT_CASH:
                // send info to server
                break;   
            case MODE_PAYMENT_CREDIT:
            case MODE_PAYMENT_PAYPAL:
                setTimeout(() => {
                    setPaymentProcessing(false);
                    setPaymentError(true);
                }, 5000)
                break;
            default:
                return;
        }
    }
    return (
        <form className={classes.gridForm} noValidate={false} onSubmit={e => { e.preventDefault(); submitPayment(); }}>
            <div className={classes.gridInput}>
                <div className={clsx(classes.yourOrder, classes.singleField)}>
                    <Typography variant='h6' component='p'>
                        <FormattedMessage id='mode_payment' defaultMessage="Mode of payment" />
                    </Typography>
                </div>
                <Divider />
                <FormControl className={classes.paymentBox}>
                    <RadioGroup value={modePayment} onChange={changeModePayment}>
                        <FormControlLabel
                            label={intl.formatMessage({id: "cash_on_delivery", defaultMessage: "Cash on delivery" })}
                            value={MODE_PAYMENT_CASH}
                            control={<Radio color="primary"  />}
                        />
                        <FormControlLabel
                            label={intl.formatMessage({id: "credit_card", defaultMessage: "Credit card" })}
                            value={MODE_PAYMENT_CREDIT}
                            control={<Radio color="primary"  />}
                        />
                        <Collapse in={modePayment === MODE_PAYMENT_CREDIT}>
                            <div className={classes.singleField}>
                                <TextField
                                    InputLabelProps={{ 
                                        className: classes.textfieldLabel,
                                        shrink: true,
                                    }}
                                    InputProps={{ 
                                        className: classes.textfieldInput,
                                        inputComponent: StripeInput,
                                        inputProps: {
                                            component: CardNumberElement
                                        },
                                    }}
                                    className={clsx(classes.cardNumber, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    label={cardNumberTransl}
                                />
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    InputLabelProps={{ 
                                        className: classes.textfieldLabel,
                                        shrink: true,
                                    }}
                                    InputProps={{ 
                                        className: classes.textfieldInput,
                                        inputComponent: StripeInput,
                                        inputProps: {
                                            component: CardExpiryElement
                                        },
                                    }}
                                    className={clsx(classes.cardExpire, classes.textfield)}
                                    required variant="outlined"
                                    label={expireDateTransl}
                                />
                                <TextField
                                    InputLabelProps={{ 
                                        className: classes.textfieldLabel,
                                        shrink: true,
                                    }}
                                    InputProps={{ 
                                        className: classes.textfieldInput, 
                                        inputComponent: StripeInput,
                                        inputProps: {
                                            component: CardCvcElement
                                        },
                                    }}
                                    className={clsx(classes.cardCVC, classes.textfield)}
                                    required variant="outlined"
                                    label="CVC"
                                />
                            </div>
                        </Collapse>
                        <FormControlLabel
                            label={intl.formatMessage({id: "paypal", defaultMessage: "Paypal" })}
                            value={MODE_PAYMENT_PAYPAL}
                            control={<Radio color="primary"  />}
                        />
                        <div className={classes.creditImages}>
                            <img src={visaImage} alt="paypal card" className={classes.creditImage} />
                            <img src={mastercardImage} alt="paypal card" className={classes.creditImage} />
                            <img src={maestroImage} alt="paypal card" className={classes.creditImage} />
                        </div>
                        <img src={paypalImage} alt="paypal card" className={classes.paypalImage} />
                    </RadioGroup>
                </FormControl>
                <div className={clsx(classes.yourOrder, classes.singleField)}>
                    <Typography variant='h6' component='p'>
                        <FormattedMessage id='recipient' defaultMessage="Recipient" />
                    </Typography>
                    <div onClick={handleBack} className={classes.link} >
                        <Typography variant="body2" component='p'>
                            {"("}
                            <FormattedMessage id='edit_recipient_info' defaultMessage="Edit recipient information" />
                            {")"}
                        </Typography>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className={classes.singleField}>
                        <Typography variant='body1' component='p'>
                            <FormattedMessage id='fullname' defaultMessage="Name" />
                            {`: ${lastName} ${firstName}`}
                        </Typography>
                    </div>
                    <div className={classes.singleField}>
                        <Typography variant='body1' component='p'>
                            <FormattedMessage id='phone' defaultMessage="Phone" />
                            {`: (+${country.phonecode}) ${phone}`}
                        </Typography>
                    </div>
                    <div className={classes.singleField}>
                        <Typography variant='body1' component='p'>
                            <FormattedMessage id='email' defaultMessage="Email" />
                            {`: ${email}`}
                        </Typography>
                    </div>
                    <div className={classes.singleField}>
                        <Typography variant='body1' component='p'>
                            <FormattedMessage id='address' defaultMessage="Address" />
                            {`: ${addressDetail}, ${city.name}, ${state.name}, ${country.name}.`}
                        </Typography>
                    </div>
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
                    <Button className={classes.paymentButton} type="submit" disabled={paymentProcessing}>
                        {
                            paymentProcessing
                            ?
                            <CircularProgress size={30} classes={{ colorPrimary: classes.circularProgress }} />
                            :
                            <Typography variant='h6' component='p'>
                                <FormattedMessage id='pay' defaultMessage="Pay" />
                                {` ${totalSumCalc({ 
                                    number: totalSumNumber({
                                        items: cartList,
                                        shippingFeeInfo,
                                    }),
                                })}`}
                            </Typography>
                        }
                    </Button>
                    <Collapse in={paymentError} className={classes.paymentError}>
                        <Typography variant='body1' component='p' color="secondary" >
                            <FormattedMessage id='payment_error' defaultMessage="Payment error. Please try other payment method." />    
                        </Typography>
                    </Collapse>
                    </>
                }
            </div>
        </form> 
    )
}

export default FormPayment;