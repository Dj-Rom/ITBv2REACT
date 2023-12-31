import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slices/modalSlice'
import pagelSlice from './slices/pageSlice'
const store = configureStore({
    reducer: {
        modal: modalSlice,
        page: pagelSlice,
    }
})


export default store