import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: true,
    hashedPassword: '',
    
};

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        toggleBanner: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { toggleBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
