import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";


type Image = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

type CounterState = {
    loading: boolean
    count: number
    images: Image[]
    error: string
}

const initialState: CounterState = {
    loading: false,
    count: 0,
    images: [],
    error: ''
}

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
    await timeout(5000);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
    return response.data as Image[];
})

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            //{...state, count: count +1}
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImages.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.images = payload
            })
            .addCase(fetchImages.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string
            })
    }
});


export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer
export const selectCount = (state: RootState) => state.counter.count;