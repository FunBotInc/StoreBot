exports.quantity = [
    { qty: '1', unit: 'gram'},
    { qty: '2', unit: 'gram'},
    { qty: '1/2', unit: 'pound'},
    { qty: '1', unit: 'pound'},
    { qty: '5', unit: 'pound'}
]

exports.adminMenu = [
    { slug: '/admin/add', title: 'Add Product'},
    { slug: '/admin/products', title: 'Product List'},
    { slug: '/admin', title: 'Admin Panel'},
    { slug: '/admin/accounts', title: 'Customer List'},
    { slug: '/admin/accounts/add', title: 'Add Customer'}
]
exports.userMenu = [
    { slug: '/products', title: 'HomePage'},
    { slug: '/order', title: 'Cart'}
]

exports.adminPages = [
    { add: '/admin/add' },
    { products: '/admin/products'}
]

exports.siteName = 'weedBot';

exports.rootURL = {
    aProd: '/admin/products',
    prod: '/products',
    aAcct: '/admin/accounts',
    acct: '/account'
};