import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice"; 
import authReducer from "./authSlice";
import empresaReducer from "./empresaSlice";

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        auth: authReducer,
        empresa: empresaReducer
    },
});

