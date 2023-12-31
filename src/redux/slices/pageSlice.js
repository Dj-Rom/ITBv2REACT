import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    page_number: '',
    pagination_status: false,
    loaderStatus: false,
    dataFromServer: ''
}

export const fetchPage = createAsyncThunk('user/fetchPage', async (url) => {
    console.log(url);
    const res = await axios.get(url);
    return res.data
})

const pagelSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        pagePagination: (state) => {
            let paginationStatus = state.pagination_status
            return { ...state, pagination_status: !paginationStatus }
        },
        openNewPage: (state, action) => {
            return { ...state, page_number: action.payload }
        },
        // nextPage: (state, action) => {
        //     action.payload(state.dataFromServer.info.next)
        // },
        loaderStatus: (state) => {
            let loaderStatus = state.loaderStatus
            return { ...state, loaderStatus: !loaderStatus }
        }, fetchFirstPage: (state, action) => {
            state.dataFromServer = (action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPage.fulfilled, (state, action) => {

            state.dataFromServer = (action.payload)

        })
    }
})

export const { pagePagination, openNewPage, loaderStatus, fetchFirstPage } = pagelSlice.actions
export default pagelSlice.reducer