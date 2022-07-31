import { configureStore } from '@reduxjs/toolkit';
import championReducer from './champion';

const store = configureStore({
    reducer: {champion: championReducer}
});

export default store;