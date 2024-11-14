import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice/index.js'
import AdminProductsSilce from './admin/products-slice/index.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductsSilce
    },
})

export default store;