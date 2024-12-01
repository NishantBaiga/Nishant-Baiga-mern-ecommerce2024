import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice/index.js'
import AdminProductsSilce from './admin/products-slice/index.js'
import shopProductsSlice from './shop/products-slice/index.js'
import shopCartSlice from './shop/cart-slice/index.js'
import shopAddressSlice from './shop/address-slice/index.js'
import shopOrderSlice from './shop/order-slice/index.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductsSilce,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice
    },
})

export default store;