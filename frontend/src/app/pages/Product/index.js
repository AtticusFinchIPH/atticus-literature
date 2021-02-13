import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Container, Typography, TextField, useTheme } from '@material-ui/core';
import useStyle from './styles';

const Product = () => {
    const classes = useStyle();
    const theme = useTheme();
    const [quantity, setQuantity] = useState(1);
    const viewingProduct = useSelector(state => state.viewingProduct);
    const { product, loading } = viewingProduct;
    let priceDeclare;
    switch (product.currency) {
        case 'usd':
            priceDeclare = `$ ${product.price}`;
            break;
        case 'vnd':
            priceDeclare = `${product.price} vnđ`;
            break;
        default:
            priceDeclare = `$ ${product.price}`;
            break;
    }
    const addQuantity = (e) => {
        const newQuantity = e.target.value;
        if(!newQuantity) {
            return
        }
        else if(newQuantity < 1) {
            setQuantity(1);
            e.target.value = 1;
        } else setQuantity(newQuantity);
    }
    useEffect(() => {console.log(quantity)}, [quantity])
    return(
        <div className={classes.root}>
            <Container className={classes.container} maxWidth='md'>
                <div className={classes.gridImage}>
                    <img src={product.image} alt={product.title} className={classes.productImage}/>
                </div>
                <div className={classes.mainInfo}>
                    <div className={classes.mainInfoTitle}>
                        <Typography variant='h5' component='h1'>
                            {product.title}
                        </Typography>
                        <Typography variant='h6' component='p'>
                            <FormattedMessage id='author_by' defaultMessage='by' /> {product.author}
                        </Typography>
                    </div>
                    <div className={classes.mainInfoActions}>
                        <div className={classes.infoPrice}>
                            <Typography variant='h5' component='p'>
                                {priceDeclare}
                            </Typography>
                        </div>
                        <div className={classes.infoQuantity}>
                            <Typography variant='body1' component='p'>
                                <FormattedMessage id='quantity' defaultMessage='Quantity' /> :
                            </Typography> 
                            <TextField id='product-quantity' className={classes.infoTextfield} 
                                type='number' variant='outlined' size='small'
                                defaultValue={quantity}
                                onChange={(e) => addQuantity(e)} />
                        </div>
                        <div className={classes.infoAdd}>
                            <Button className={classes.infoAddButton}>
                                <FormattedMessage id='add_to_cart' defaultMessage='Add to Cart' />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.additionalInfo}>
                {product.title}
                    adzgreherhrtjretjretjertjertjretjrtjrtjrtjrtjrtjrtj
                    trjrtjretjertj
                    ertjrtjretjertj
                    rtjrtjertj
                    ertjertjretjretjret
                </div>
            </Container>
        </div>
    )
}

export default Product;