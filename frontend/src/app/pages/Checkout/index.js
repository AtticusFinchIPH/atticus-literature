
import {  useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, useIntl } from 'react-intl';
import cscAPI from 'country-state-city'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useStyles from './styles';
import { Button, Card, Collapse, Container, Divider, Hidden, IconButton, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import CartOpenContext from '../../../contexts/CartOpenContext';
import RemoveIcon from '@material-ui/icons/HighlightOff';
import MinusIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { Alert as MuiAlert, Autocomplete } from '@material-ui/lab';

import { updateLocalCart, removeFromLocalCart } from '../../../actions/productActions';
import { changeShippingFee, getShippingFee, saveShippingAddress } from '../../../actions/orderActions';
import { retailPriceCalc, wholeSaleCalc, subtotalCalc, shippingFeeCalc, totalSumCalc, totalSumNumber } from '../../../utils/priceCalculator';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CardItem = ({item}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const retailPrice = retailPriceCalc(item);
    const wholeSale = wholeSaleCalc(item);
    const minusQuantity = () => {
        if(item.quantity === 1) return;
        else {
            const product = {...item, quantity: item.quantity-1};
            dispatch(updateLocalCart(product));
        }
    }
    const addQuantity = () => {
        const product = {...item, quantity: item.quantity+1};
        dispatch(updateLocalCart(product));
    }
    const removeItem = () => {
        dispatch(removeFromLocalCart(item._id));
    }
    return (
        <Card className={classes.cartItem}>
            <div className={classes.cartItemMedia} 
                style={{backgroundImage: `url(${item.image}`}}
                onClick={e => history.push(`/product/${item._id}`)}
            />
            <div className={classes.cardItemContent}>
                <div className={classes.cartItemInfo}>
                    <div className={classes.cartItemTitle}>
                        <Typography variant='body1' component='p'>
                            {item.title}
                        </Typography>
                    </div>
                    <div className={classes.cartItemAuthor}>
                        <Typography variant='body2' component='p'>
                            <FormattedMessage id='author_by' defaultMessage='by' />{' '}
                            {item.authorIds.reduce((string, author, index) => {
                                if(index === item.authorIds.length -1 ) return string += author.name;
                                else return string += `${author.name}, `;                                                  
                            }, '')}
                        </Typography>
                    </div>
                    <Typography variant='body2' component='p'>{retailPrice}</Typography>
                </div>
                <div className={classes.cartItemQuantity}>
                    <IconButton onClick={minusQuantity} className={clsx(classes.actionIcon, item.quantity === 1 && classes.disable)} >
                        <MinusIcon fontSize='small' />
                    </IconButton>
                    <Typography variant='body1' component='p'>{item.quantity}</Typography>
                    <IconButton onClick={addQuantity} className={classes.actionIcon} >
                        <AddIcon fontSize='small' />
                    </IconButton>
                </div>
            </div>
            <div className={classes.cartItemWholesale}>
                <div className={classes.saleNumber}>
                    <Typography variant='h6' component='p'>{wholeSale}</Typography>                 
                </div>
                <div className={classes.saleCancel}>                 
                    <IconButton onClick={removeItem} className={clsx(classes.actionIcon, classes.removeIcon)}>
                        <RemoveIcon fontSize='small' />
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}

CardItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        authorIds: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        })),
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    })
}

const PromoCode = ({ intl }) => {
    const classes = useStyles();
    const placeholder = intl.formatMessage({ id: 'enter_promo', defaultMessage: 'Enter a promo code' });
    const [code, setCode] = useState('');
    const [promoError, setPromoError] = useState(false);
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }  
        setPromoError(false);
    };
    const changeCode = (e) => {
        setCode(e.target.value);
    }
    const keyDown = (e) => {
        if(e.key === "Enter") submitCode();
    }
    const submitCode = () => {
        setCode('');
        setPromoError(true);
    }     
    return(
        <>
        <TextField
            inputRef={input => input && input.focus()}
            InputProps={{
                className: classes.themeTextColor
            }}
            placeholder={`${placeholder}...`}
            variant='outlined' size='small'
            value={code}
            onChange={e => changeCode(e)}
            onKeyDown={e => keyDown(e)}
        />
        <Button 
            className={clsx(classes.themeTextColor, classes.themeNavbarBackground)} 
            variant='outlined' style={{height: '40px'}}
            onClick={submitCode}
        >
            <FormattedMessage id='apply' defaultMessage='Apply' />
        </Button>
        <Snackbar open={promoError} autoHideDuration={6000} onClose={closeAlert}>
            <Alert onClose={closeAlert} severity="info">
                <FormattedMessage id='invalid_promo' defaultMessage='Invalid promo code' />
            </Alert>
        </Snackbar>
        </>
    )
}

const AddNote = ({intl}) => {
    const classes = useStyles();
    const placeholder = intl.formatMessage({ id: 'note_description', defaultMessage: 'Instructions? Special requests? Add them here.' });
    const [note, setNote] = useState("");
    return(
        <TextField
            InputProps={{
                className: classes.themeTextColor
            }}
            inputRef={input => input && input.focus()}
            placeholder={placeholder}
            variant='outlined' fullWidth
            multiline rows={4} value={note}
            onChange={e => {
                setNote(e.target.value)
            }}
        />
    )
}

const Checkout = () => {
    const classes = useStyles();
    const intl = useIntl();
    const history = useHistory();
    const dispatch = useDispatch();
    const { isCartOpen, setCartOpen } = useContext(CartOpenContext);
    const { cartList } = useSelector(state => state.cart);
    const subtotalDeclare = subtotalCalc(cartList);
    const { country, state, city, loading: shippingFeeLoading, info: shippingFeeInfo } = useSelector(state => state.shippingAddress);
    const [ totalSum, setTotalSum ] = useState();
    const [ openPromo, setOpenPromo ] = useState(false);
    const [ openNote, setOpenNote ] = useState(false);
    const PromoCodeComponent = injectIntl(({intl}) => 
        <PromoCode intl={intl} />
    );
    const AddNoteComponent = injectIntl(({intl}) => 
        <AddNote intl={intl} />
    );
    const countries = cscAPI.getAllCountries();
    const [ states, setStates ] = useState([]);
    const [ cities, setCities ] = useState([]);
    const [ selectedCountry, setSelectedCountry ] = useState(country || {});
    const [ selectedState, setSelectedState ] = useState(state || {});
    const [ selectedCity, setSelectedCity ] = useState(city || {});
    const [ inputCountry, setInputCountry ] = useState("");
    const [ inputState, setInputState ] = useState("");
    const [ inputCity, setInputCity ] = useState("");
    const selectCountryTransl = intl.formatMessage({id: 'select_country', defaultMessage: "Select Country"});
    const selectStateTranls = intl.formatMessage({id: 'select_state', defaultMessage: "Select State"});
    const selectCityTranls = intl.formatMessage({id: 'select_city', defaultMessage: "Select City"});
    const handleCountry = (event, newValue) => {
        setSelectedCountry(newValue);
        console.log(newValue);
        if (!newValue || newValue !== selectedCountry) {
            setSelectedState({}); setInputState("");
            setSelectedCity({}); setInputCity("");
        }
    };
    const handleState = (event, newValue) => {
        setSelectedState(newValue);
        console.log(newValue);
        if (!newValue || newValue !== selectedState) {
            setSelectedCity({}); setInputCity("");
        }
    };
    const handleCity = (event, newValue) => {
        setSelectedCity(newValue);
        console.log(newValue);
    };
    useEffect(() => {
        if (selectedCountry?.name?.length > 0) {
            const stateList = cscAPI.getStatesOfCountry(selectedCountry.isoCode);
            setStates(stateList);
            if(stateList.length === 0) {
                dispatch(getShippingFee({
                    countryId: selectedCountry.isoCode,
                }))
            }
        }
    }, [selectedCountry]);
    useEffect(() => {
        if (selectedCountry?.name?.length > 0 && selectedState?.name?.length > 0) {
            const cityList = cscAPI.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
            setCities(cityList);
            if(cityList.length === 0) {
                dispatch(getShippingFee({
                    countryId: selectedCountry.isoCode,
                    stateId: selectedState.isoCode,
                }))
            }
        }
    }, [selectedState]);
    useEffect(() => {
        if (!selectedCity || !selectedCity.name) {
            dispatch(changeShippingFee());
        } else {
            dispatch(getShippingFee({
                countryId: selectedCountry.isoCode,
                stateId: selectedState.isoCode,
                cityId: selectedCity.isoCode,
            }))
        }
    }, [selectedCity]);
    useEffect(() => {
        if(cartList.length > 0 && !shippingFeeLoading && !isNaN(shippingFeeInfo?.fee)) {
            setTotalSum(totalSumNumber({
                items: cartList,
                shippingFeeInfo,
            }))
        } else setTotalSum();
    }, [cartList, shippingFeeInfo]);

    useEffect(() => {
        setCartOpen(false); // Always close cart bar in this screen
    }, [isCartOpen]);
    const handleOpenPromo = () => {
        setOpenPromo(!openPromo);
    }
    const handleOpenNote = () => {
        setOpenNote(!openNote);
    }
    const handleCheckout = () => {
        dispatch(saveShippingAddress({
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
        }));
        history.push("/order_process/");
    }
    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth='md'>
                <div className={classes.gridList}>
                    <div className={classes.title}>
                        <Typography variant='h5' component='h2'>
                            <FormattedMessage id='my_cart' defaultMessage="My Cart" />
                        </Typography>
                    </div>
                    <div className={classes.itemList}>
                        {
                            cartList?.length > 0
                            ?
                            cartList.map((item, index) => (
                                <CardItem key={index} item={item} />
                            ))
                            :
                            <>
                            <Typography variant='body1' component='h2'>
                                <FormattedMessage id='cart_empty' defaultMessage="Your cart is empty" />{'. '}
                                <Link to="/bookstore/">
                                    <FormattedMessage id='continue_shopping' defaultMessage="Continue shopping" />
                                </Link>
                                {'.'}
                            </Typography>
                            </>
                        }
                    </div>
                    <div className={classes.additional}>
                        <div className={classes.additionalTitle}>
                            <Button 
                                className={classes.themeTextColor} 
                                onClick={handleOpenPromo}
                            >
                                <TagIcon fontSize='small' style={{marginRight: "8px"}} />
                                <FormattedMessage id='enter_promo' defaultMessage="Enter a promo code" />
                            </Button>
                        </div>
                        <Collapse in={openPromo} className={classes.additionalContent}>
                            <PromoCodeComponent />
                        </Collapse>
                        <div className={classes.additionalTitle} >                      
                            <Button 
                                className={classes.themeTextColor}
                                onClick={handleOpenNote}    
                            >
                                <DescriptionOutlinedIcon fontSize='small' style={{marginRight: "8px"}} />
                                <FormattedMessage id='add_note' defaultMessage="Add a note" />
                            </Button>
                        </div>
                        <Collapse in={openNote} className={classes.additionalContent}>
                            <AddNoteComponent />
                        </Collapse>
                    </div>
                </div>
                <div className={classes.gridSummary}>
                    {
                        cartList?.length > 0
                        &&
                        <>
                        <Hidden smDown>
                        <div className={classes.title}>
                            <Typography variant='h5' component='h2'>
                                <FormattedMessage id='order_summary' defaultMessage="Order Summmary" />
                            </Typography>
                        </div>
                        </Hidden>
                        <Paper className={classes.summaryPaper}>
                            <div className={classes.subtotal}>
                                <Typography variant='body1' component='h2'>
                                    <FormattedMessage id='subtotal' defaultMessage="Subtotal" />
                                </Typography>
                                <Typography variant='body1' component='h2'>
                                    {subtotalDeclare}
                                </Typography>
                            </div>
                            <div  className={classes.shippingSection}>
                                <Typography variant='body1' component='h2'>
                                    <FormattedMessage id='shipping_region' defaultMessage="Shipping region" />
                                </Typography>
                                {
                                    countries?.length > 0
                                    &&
                                    <Autocomplete 
                                        value={selectedCountry} 
                                        onChange={(event, newValue) => handleCountry(event, newValue)}
                                        inputValue={inputCountry}
                                        onInputChange={(event, newInputValue) => {
                                            setInputCountry(newInputValue);
                                        }}
                                        options={countries}
                                        getOptionLabel={(option) => option?.name || ""}
                                        className={classes.autocomplete}
                                        renderOption={(option) => (
                                            <div>
                                                {`${option.flag}  ${option.name}`}
                                            </div>
                                        )}
                                        renderInput={(params) => (
                                            <TextField {...params} 
                                                label={selectCountryTransl} 
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                }
                                <Collapse in={selectedCountry?.name?.length > 0}>
                                    {
                                        states?.length > 0
                                        &&
                                        <Autocomplete 
                                            value={selectedState} 
                                            onChange={(event, newValue) => handleState(event, newValue)}
                                            inputValue={inputState}
                                            onInputChange={(event, newInputValue) => {
                                                setInputState(newInputValue);
                                            }}
                                            options={states}
                                            getOptionLabel={(option) => option?.name || ""}
                                            className={classes.autocomplete}
                                            renderInput={(params) => (
                                                <TextField {...params} 
                                                    label={selectStateTranls} 
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    }
                                </Collapse>
                                <Collapse in={selectedState?.name?.length > 0}>
                                    {
                                        cities?.length > 0
                                        &&
                                        <Autocomplete 
                                            value={selectedCity} 
                                            onChange={(event, newValue) => handleCity(event, newValue)}
                                            inputValue={inputCity}
                                            onInputChange={(event, newInputValue) => {
                                                setInputCity(newInputValue);
                                            }}
                                            options={cities}
                                            getOptionLabel={(option) => option?.name || ""}
                                            className={classes.autocomplete}
                                            renderInput={(params) => (
                                                <TextField {...params} 
                                                    label={selectCityTranls} 
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    }
                                </Collapse>
                                <Collapse in={!shippingFeeLoading && shippingFeeInfo && Object.keys(shippingFeeInfo).length > 0}>
                                    {
                                        shippingFeeInfo?.isAllow
                                        ?
                                        <>
                                        <div className={classes.subtotal}>
                                            <Typography variant='body1' component='h2'>
                                                <FormattedMessage id='shipping_fee' defaultMessage="Shipping fee" />
                                            </Typography>
                                            <Typography variant='body1' component='h2'>
                                                {shippingFeeCalc({fee: shippingFeeInfo.fee})}
                                            </Typography>
                                        </div>
                                        <Divider/>
                                        <div className={classes.total}>
                                            <Typography variant='h5' component='h2'>
                                                <FormattedMessage id='total' defaultMessage="Total" />
                                            </Typography>
                                            <Typography variant='h5' component='h2'>
                                                {totalSumCalc({number: totalSum})}
                                            </Typography>
                                        </div>
                                        </>
                                        :
                                        <Typography variant="body1" component='p'>
                                            <FormattedMessage id='shipping_not_allowed' defaultMessage="Sorry, we haven't supported shipping to that region yet." />
                                        </Typography>
                                    }
                                </Collapse>
                            </div>
                        </Paper>
                        <Paper className={classes.checkoutPaper}>
                            <Button 
                                className={classes.checkoutButton} 
                                disabled={!totalSum || !(totalSum > 0)}
                                onClick={handleCheckout}
                            >
                                <Typography variant='h6' component='p'>
                                    <FormattedMessage id='checkout' defaultMessage="Checkout" />
                                </Typography>
                            </Button>
                        </Paper>
                        </> 
                    }
                </div>
            </Container>
        </div>
    )
}

export default Checkout;