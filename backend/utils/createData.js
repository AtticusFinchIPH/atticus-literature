
import { initial_data } from "./initial_data";

import Author from "../models/authorModel";
import Product from "../models/productModel";
import { UserEnumRole } from "../enums/userEnums";
import { 
    ProductEnumOrigin,
    ProductEnumLanguage,
    ProductEnumGenre,
    ProductEnumCurrency,
} from "../enums/productEnums";
import { 
    OrderEnumStatus,
    OrderEnumPaymentMethod,
} from "../enums/orderEnums";

const insertEnum = async (list, schema) => {
    list.map(async (item) => {
        const existedItem = await schema.findById(item._id);
        if(existedItem) {
            console.log(`Enum: "${item._id}" exists, no need to import.`)
        } else {
            await schema.create(item).then((err, newItem) => {
                if(err) {
                    throw err;
                } else {
                    console.log(`Enum: "${newItem._id}" is inserted.`);
                }
            });
        }
    })
}

const createInitialEnums = async () => {
    const { 
        UserEnumRole: userRoles,
        ProductEnumOrigin: productOrigins,
        ProductEnumGenre: productGenres,
        ProductEnumLanguage: productLanguages,
        ProductEnumCurrency: productCurrencies,
        OrderEnumStatus: orderStatus,
        OrderEnumPaymentMethod: orderPaymentMethodes,
    } = initial_data;
    try {
        const promiseUserRoles = await insertEnum(userRoles, UserEnumRole);
        const promiseProductOrigins = await insertEnum(productOrigins, ProductEnumOrigin);
        const promiseProductGenres = await insertEnum(productGenres, ProductEnumGenre);
        const promiseProductLanguages = await insertEnum(productLanguages, ProductEnumLanguage);
        const promiseProductCurrencies = await insertEnum(productCurrencies, ProductEnumCurrency);
        const promiseOrderStatus = await insertEnum(orderStatus, OrderEnumStatus);
        const promiseOrderPaymentMethodes = await insertEnum(orderPaymentMethodes, OrderEnumPaymentMethod);
        await Promise.all([
            promiseUserRoles,
            promiseProductOrigins,
            promiseProductGenres,
            promiseProductLanguages,
            promiseProductCurrencies,
            promiseOrderStatus,
            promiseOrderPaymentMethodes,
        ]).then(values => {
            console.log('All initial enumerations are inserted in DB!');
        }, error => {
            console.error(error);
        });
    } catch (error) {
        console.error(error);  
    }
}

const createInitialAuthors = async () => {
    const authorList = initial_data.authors;
    try {      
        await Promise.all(authorList.map(async (author) => {
            const existedAuthor = await Author.findById(author._id);
            if(existedAuthor) {
                console.log(`Author: "${author._id}" exists, no need to import.`)
            } else {
                await Author.create(author).then((err, newAuthor) => {
                    if(err) {
                        throw err;
                    } else {
                        console.log(`Author: "${newAuthor._id}" is inserted in Author Schema.`);
                    }
                });
            }
        }))
        console.log('All initial authors are inserted in DB!');
    } catch (error) {
        console.error(error);
    }
}

const createInitialProducts = async () => {
    const productList = initial_data.productsInStore;
    try {       
        await Promise.all(productList.map(async (item) => {
            const existedItem = await Product.findOne({title: item.title});
            if(existedItem){
                console.log(`Product: "${item.title}" exists, no need to import.`)
            } else {          
                await Product.create(item).then((err, newItem) => {
                    if(err) {
                        throw err
                    } else {
                        console.log(`Product: "${newItem.title}" is inserted in Product Schema.`);
                    }
                });
            }
        }))
        console.log('All initial products are inserted in DB!');
    } catch (error) {
        console.error(error);
    }
}

export { 
    createInitialEnums,
    createInitialAuthors,
    createInitialProducts
}