
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from '@material-ui/core';

import useStyles from './styles';
import orderCompletedImage from '../../../images/payment/order_completed.jpg';
import { removeAllLocalCart } from '../../../actions/productActions';

const FormComplete = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(removeAllLocalCart());
    }, []);
    return (
        <>
        <img src={orderCompletedImage} alt="Order Completed" className={classes.formComplete} />
        <Link to="/" className={classes.goHomeLink} >
            <Button className={classes.goHomeButton}/>
        </Link>
        <a className={classes.attribute} href="http://www.freepik.com" target='_blank' rel="noreferrer">
            Image designed by stories / Freepik
        </a>
        </>
    )
}

export default FormComplete;