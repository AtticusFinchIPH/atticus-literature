
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './AuthPopup.styles';
import { Button, Checkbox, CircularProgress, Dialog, FormControlLabel, Grid, Paper, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import AuthOpenContext from '../../contexts/AuthOpenContext';
import booksIcon from '../../images/homework.png';
import { register, clearUserSigninErros, signin } from '../../actions/userActions';

const PARAM_FIRSTNAME = "firstName";
const PARAM_LASTNAME = "lastName";
const PARAM_EMAIL = "email";
const PARAM_PASSWORD = "password";
const PARAM_RE_PASSWORD = "rePassword";

const SignIn = forwardRef((props, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const intl = useIntl();
    const emailAddressTransl = intl.formatMessage({id: 'email_address', defaultMessage: "Email Address"});
    const passwordTransl = intl.formatMessage({id: 'password', defaultMessage: "Password"});
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState(); 
    const [ emailErr, setEmailErr ] = useState();
    const [ passwordErr, setPasswordErr ] = useState(); 
    const [error, setError] = useState();
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, errors } = userSignin;
    useEffect(() => {
        if(errors?.length > 0) {
            errors.forEach(err => {
                switch (err?.param) {
                    case PARAM_EMAIL:
                        setEmailErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case PARAM_PASSWORD:
                        setPasswordErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    default:
                        setError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}))
                        break;
                }
            });
        }
        return (() => clearErrors());
    }, [errors]);
    const clearErrors = () => {
        dispatch(clearUserSigninErros());
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({ email, password }));
    }
    useImperativeHandle(ref, () => ({
        close(){
            clearErrors()
        }
    }));
    return(
        <div className={classes.tabContent}>
            <div className={classes.iconBox}>
                <img src={booksIcon} alt="Books" className={classes.icon}/>
            </div>
            <Typography component="h1" variant="h5" className={classes.welcome}>
                <FormattedMessage id='welcome' defaultMessage="Welcome to Atticus Literature" />
            </Typography>
            {loading && <Typography component="p" variant="body1">Loading...</Typography>}
            {error && <Typography component="p" variant="body1" color="error">{error}</Typography>}
            <form className={classes.form} noValidate={false} onSubmit={submitHandler}>
                <TextField
                    variant="outlined" margin="normal"
                    required fullWidth autoFocus
                    name="email" type="email" autoComplete="email"      
                    label={emailAddressTransl}             
                    onChange={(e) => { clearErrors(); setEmail(e.target.value)}}
                    error={Boolean(emailErr)}
                    helperText={emailErr}
                />
                <TextField
                    variant="outlined" margin="normal"
                    required fullWidth
                    name="password" type="password" autoComplete="current-password"
                    label={passwordTransl}
                    onChange={(e) => { clearErrors(); setPassword(e.target.value)}}
                    error={Boolean(passwordErr)}
                    helperText={passwordErr}
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                {
                    loading
                    ?
                    <CircularProgress size={30} />
                    :
                    <Button
                        type="submit"
                        fullWidth variant="contained" color="primary"
                        className={classes.submit}
                    >
                        <FormattedMessage id='sign_in' defaultMessage="Sign In" />
                    </Button>
                }
            </form> 
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
})

const SignUp = forwardRef((props, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const intl = useIntl();
    const firstnameTransl = intl.formatMessage({id: 'firstname', defaultMessage: "First Name"});
    const lastnameTransl = intl.formatMessage({id: 'lastname', defaultMessage: "Last Name"});
    const emailAddressTransl = intl.formatMessage({id: 'email_address', defaultMessage: "Email Address"});
    const passwordTransl = intl.formatMessage({id: 'password', defaultMessage: "Password"});
    const rePasswordTransl = intl.formatMessage({id: 're_password', defaultMessage: "Re-Enter Password"});
    const receivePromoTransl = intl.formatMessage({id: 'receive_promo', defaultMessage: "I want to receive inspiration, marketing promotions and updates via email."});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState();
    const [firstNameErr, setFirstNameErr] = useState();
    const [lastNameErr, setLastNameErr] = useState();
    const [emailErr, setEmailErr] = useState();
    const [passwordErr, setPasswordErr] = useState();
    const [rePasswordErr, setRePasswordErr] = useState();
    const [error, setError] = useState();
    const userSignin = useSelector(state => state.userSignin);
    const { loading, errors } = userSignin;
    useEffect(() => {
        if(errors?.length > 0) {
            errors.forEach(err => {
                switch (err?.param) {
                    case PARAM_FIRSTNAME:
                        setFirstNameErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case PARAM_LASTNAME:
                        setLastNameErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case PARAM_EMAIL:
                        setEmailErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case PARAM_PASSWORD:
                        setPasswordErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    case PARAM_RE_PASSWORD:
                        setRePasswordErr(intl.formatMessage({id: err.msg, defaultMessage: err.msg}));
                        break;
                    default:
                        setError(intl.formatMessage({id: err.msg, defaultMessage: err.msg}))
                        break;
                }
            });
        }
        return (() => clearErrors());
    }, [errors]);
    const clearErrors = () => {
        dispatch(clearUserSigninErros());
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register({ firstName, lastName, email, password, rePassword }));
    }
    useImperativeHandle(ref, () => ({
        close(){
            clearErrors()
        }
    }));
    return(
        <div className={classes.tabContent}>
            <div className={classes.iconBox}>
                <img src={booksIcon} alt="Books" className={classes.icon}/>
            </div>
            <Typography component="h1" variant="h5" className={classes.welcome}>
                <FormattedMessage id='welcome' defaultMessage="Welcome to Atticus Literature" />
            </Typography>
            {loading && <Typography component="p" variant="body1">Loading...</Typography>}
            {error && <Typography component="p" variant="body1" color="error">{error}</Typography>}
            <form className={classes.form} noValidate={false} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField                          
                            variant="outlined" required fullWidth autoFocus
                            name="firstName" autoComplete="fname"
                            label={firstnameTransl}                       
                            onChange={(e) => { clearErrors(); setFirstName(e.target.value)}}
                            inputProps={{
                                maxLength: 15,
                            }}
                            error={Boolean(firstNameErr)}
                            helperText={firstNameErr}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="lastName" autoComplete="lname"
                            label={lastnameTransl}
                            onChange={(e) => { clearErrors(); setLastName(e.target.value)}}
                            inputProps={{
                                maxLength: 15,
                            }}
                            error={Boolean(lastNameErr)}
                            helperText={lastNameErr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="email" autoComplete="email"
                            label={emailAddressTransl}
                            type="email"  
                            onChange={(e) => { clearErrors(); setEmail(e.target.value)}}
                            error={Boolean(emailErr)}
                            helperText={emailErr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="password" autoComplete="current-password"
                            label={passwordTransl}
                            type="password"
                            onChange={(e) => { clearErrors(); setPassword(e.target.value)}}
                            error={Boolean(passwordErr)}
                            helperText={passwordErr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="rePassword" autoComplete="re-password"
                            label={rePasswordTransl}
                            type="password"
                            onChange={(e) => { clearErrors(); setRePassword(e.target.value)}}
                            error={Boolean(rePasswordErr)}
                            helperText={rePasswordErr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={receivePromoTransl}
                        />
                    </Grid>
                </Grid>
                {
                    loading
                    ?
                    <CircularProgress size={30} />
                    :
                    <Button
                        type="submit"
                        fullWidth variant="contained" color="primary"
                        className={classes.submit}
                    >
                        <FormattedMessage id='sign_up' defaultMessage="Sign Up" />
                    </Button>
                }
            </form> 
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
})

const AuthPopup = () => {
    const intl = useIntl();
    const signInTransl = intl.formatMessage({id: 'sign_in', defaultMessage: "Sign In"});
    const signUpTransl = intl.formatMessage({id: 'sign_up', defaultMessage: "Sign Up"});
    const { isAuthOpen, setAuthOpen } = useContext(AuthOpenContext);
    const { userInfo } = useSelector(state => state.userSignin);
    const signInRef = useRef();
    const signUpRef = useRef();
    const [ tab, setTab ] = useState(0);

    const handleClose = () => {
        signInRef.current?.close();
        signUpRef.current?.close();
        setTab(0);
        setAuthOpen(false);
    }
    const handleSwitchTab = (event, newValue) => {
        setTab(newValue);
    }
    useEffect(() => {
        if(userInfo) handleClose();
    }, [userInfo])
    return(
        <Dialog open={isAuthOpen} onClose={handleClose} >
            <Paper square>
                <Tabs
                    indicatorColor="primary" textColor="primary" 
                    centered variant="fullWidth"
                    value={tab} onChange={handleSwitchTab}
                    aria-label="sign in - sign up"
                >
                    <Tab label={signInTransl} />
                    <Tab label={signUpTransl} />
                </Tabs>
                {
                    tab === 0
                    ?
                    <SignIn ref={signInRef} />
                    :
                    <SignUp ref={signUpRef} />
                }
            </Paper>
        </Dialog>
    )
}

export default AuthPopup;