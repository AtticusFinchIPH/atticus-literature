const OrderEnumStatus = Object.freeze({
    PAID: 'paid', 
    PROCESSING: 'processing', 
    SHIPPING: 'shipping', 
    SHIPPED: 'shipped', 
    DELIVERED: 'delivered'
})

const OrderEnumPaymentMethod = Object.freeze({
    CASH: 'cash', 
    VISA: 'visa',
})

export { OrderEnumStatus, OrderEnumPaymentMethod };