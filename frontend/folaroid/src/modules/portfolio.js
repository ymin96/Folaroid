import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPortfolio, readSimplePortfolio } from '../lib/api/portfolioAPI';

export const getSimplePortfolioListThunk = createAsyncThunk(
    'portfolio/SIMPLE_LIST',
    async (userNo) => {
        const response = await readSimplePortfolio(userNo);
        return response.data;
    }
);

export const createPortfolioThunk = createAsyncThunk(
    'portfolio/CREATE_PORTFOLIO',
    async (userNo) => {
        const response = await createPortfolio({ userNo });
        return response.data;
    }
);

export const portfolio = createSlice({
    name: 'portfolio',
    initialState: {
        simple: [],
        pf: {},
    },
    reducers: {},
    extraReducers: {
        [getSimplePortfolioListThunk.fulfilled.type]: (state, action) => {
            state.simple = action.payload;
        },
        [createPortfolioThunk.fulfilled.type]: (state, action) => {
            state.pf.pfNo = action.payload.pfNo;
            state.pf.introNo = action.payload.introNo;
        },
    },
});

export default portfolio.reducer;
