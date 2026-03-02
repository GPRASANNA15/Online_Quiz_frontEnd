import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "/src/Redux/Slice/UserSlice.jsx";
export const Store=configureStore({
    reducer:{
        user:UserSlice,
    },
});