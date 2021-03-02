
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import clsx from 'clsx';
import axios from 'axios';
import useStyles from './styles';
import { Button, Collapse, Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { shippingFeeCalc, totalSumCalc, totalSumNumber, wholeSaleCalc } from '../../../utils/priceCalculator';

const MODE_PAYMENT_CASH = "MODE_PAYMENT_CASH";
const MODE_PAYMENT_CREDIT = "MODE_PAYMENT_CREDIT";
const MODE_PAYMENT_PAYPAL = "MODE_PAYMENT_PAYPAL";

const FormPayment = ({handleBack, handleNext}) => {
    const classes = useStyles();
    const intl = useIntl();
    const cardNumberTransl = intl.formatMessage({id: 'card_number', defaultMessage: "Card number"});
    const { country, state, city, loading: shippingFeeLoading, info: shippingFeeInfo } = useSelector(state => state.shippingAddress);
    const { cartList } = useSelector(state => state.cart);
    const { firstName, lastName, email, phone, addressDetail } = useSelector(state => state.orderFormShipping);
    const [ modePayment, setModePayment ] = useState(MODE_PAYMENT_CASH);
    
    const changeModePayment = (e) => {
        setModePayment(e.target.value);
    }
    return (
        <form className={classes.gridForm} noValidate={false}>
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
                                    InputLabelProps={{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.cardNumber, classes.textfield)}
                                    required variant="outlined" fullWidth
                                    placeholder={cardNumberTransl}
                                />
                            </div>
                            <div className={classes.pairField}>
                                <TextField
                                    InputLabelProps={{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.cardExpire, classes.textfield)}
                                    required variant="outlined"
                                    placeholder="MM/YY"
                                />
                                <TextField
                                    InputLabelProps={{ className: classes.textfieldLabel }}
                                    InputProps={{ className: classes.textfieldInput }}
                                    className={clsx(classes.cardCVC, classes.textfield)}
                                    required variant="outlined"
                                    placeholder="CVC"
                                />
                            </div>
                        </Collapse>
                        <FormControlLabel
                            label={intl.formatMessage({id: "paypal", defaultMessage: "Paypal" })}
                            value={MODE_PAYMENT_PAYPAL}
                            control={<Radio color="primary"  />}
                        />
                    </RadioGroup>
                </FormControl>
                <div className={clsx(classes.yourOrder, classes.singleField)}>
                    <Typography variant='h6' component='p'>
                        <FormattedMessage id='recipient' defaultMessage="Recipient" />
                    </Typography>
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

export default FormPayment;