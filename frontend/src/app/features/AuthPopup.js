
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './AuthPopup.styles';
import { Avatar, Button, Checkbox, Dialog, FormControlLabel, Grid, Paper, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import AuthOpenContext from '../../contexts/AuthOpenContext';
import booksIcon from '../../images/homework.png';

const SignIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const intl = useIntl();
    const emailAddressTransl = intl.formatMessage({id: 'email_address', defaultMessage: "Email Address"});
    const passwordTransl = intl.formatMessage({id: 'password', defaultMessage: "Password"});
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState(); 
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const submitHandler = (e) => {
        e.preventDefault();
    }
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined" margin="normal"
                    required fullWidth
                    name="password" type="password" autoComplete="current-password"
                    label={passwordTransl}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth variant="contained" color="primary"
                    className={classes.submit}
                >
                    <FormattedMessage id='sign_in' defaultMessage="Sign In" />
                </Button>
            </form> 
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
}

const SignUp = () => {
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
    const [rePassword, setRePassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const submitHandler = (e) => {
        e.preventDefault();
    }
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
                            onChange={(e) => setFirstName(e.target.value)}
                            inputProps={{
                                maxLength: 15,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="lastName" autoComplete="lname"
                            label={lastnameTransl}
                            onChange={(e) => setLastName(e.target.value)}
                            inputProps={{
                                maxLength: 15,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="email" autoComplete="email"
                            label={emailAddressTransl}
                            type="email"  
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="password" autoComplete="current-password"
                            label={passwordTransl}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined" required fullWidth
                            name="rePassword" autoComplete="re-password"
                            label={rePasswordTransl}
                            type="password"
                            onChange={(e) => setRePassword(e.target.value)}
                            error={password !== rePassword}
                            helperText={password === rePassword ? "" : "Password not match!"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={receivePromoTransl}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth variant="contained" color="primary"
                    className={classes.submit}
                >
                    <FormattedMessage id='sign_up' defaultMessage="Sign Up" />
                </Button>
            </form> 
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
}

const AuthPopup = () => {
    const intl = useIntl();
    const signInTransl = intl.formatMessage({id: 'sign_in', defaultMessage: "Sign In"});
    const signUpTransl = intl.formatMessage({id: 'sign_up', defaultMessage: "Sign Up"});
    const { isAuthOpen, setAuthOpen } = useContext(AuthOpenContext);
    const [ tab, setTab ] = useState(0);

    const handleClose = () => {
        setAuthOpen(false);
    }
    const handleSwitchTab = (event, newValue) => {
        setTab(newValue);
    }
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
                    <SignIn />
                    :
                    <SignUp />
                }
            </Paper>
        </Dialog>
    )
}

export default AuthPopup;