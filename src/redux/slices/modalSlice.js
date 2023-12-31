import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalWindow: false,
    currentPersonage: ''
}


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalStatusChange: (state) => {
            let modalStatus = state.modalWindow
            return { ...state, modalWindow: !modalStatus }
        },
        currentPersonageForWatch: (state, action) => {
            return { ...state, currentPersonage: action.payload }
        }
    }
})

export const { modalStatusChange, currentPersonageForWatch } = modalSlice.actions
export default modalSlice.reducer