import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './redux/visibleReducer';

export const store = configureStore({
    reducer: {
        banner: bannerReducer,
    },
});
