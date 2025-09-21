export const EMPTY_PRODUCTS = 'No items to display'

export const EMPTY_PRODUCTS_IN_CATEGORY = 'No items in the given catg and sub catg'

export const EMPTY_FILTERED_PRODUCTS = 'No items based on filters'

export const EMPTY_CART = 'No items in cart'

export const CART_CLEAR_CONFIRMATION = 'Are you sure you want to clear cart?'

export const ERROR_SERVER = 'Server error!'

export const ORDER_TABLE_HEADER = [
    { title: '#', sortable: false},
    { title: 'Date', sortable: true, sortingName: 'createdAt', sortOrder: 'desc', minWidth:'70px'},
    { title: 'Amount', sortable: true, sortingName: 'amt', sortOrder: 'desc', minWidth:'100px'},
    { title: 'Receipt id', sortable: false},
    { title: 'Payment id', sortable: false}
]

export const ORDER_ROW_TABLE_HEADER = ['#', 'Product', 'Quantity', 'Amount']

export const NO_ORDERS = 'No orders to display. Please purchase to view orders.'

export const UNAUTHORIZED = 'Unauthorized'

export const UNSUCCESSFUL_AUTHENTICATION = 'Unsuccessful Authentication'

export const SESSION_EXPIRED = 'Session Expired!'