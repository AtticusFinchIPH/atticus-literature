import axios from 'axios';

const localHost = window.location.hostname === "localhost";

const devPublishKeyGet = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ data: { publishKey: 'pk_test_nqH70Fb8FmabuVsU5kp4gpYf00XGNeVxyf' } })
        }, 50);
    })
}

const getPublishKey = async () => {
    try {
        const { data: { publishKey } } = localHost 
                                        ? await devPublishKeyGet() 
                                        : await axios.get("/api/orders/stripe_key");
        return { publishKey };
    } catch (error) {
        return { error };
    }
}

export { getPublishKey };