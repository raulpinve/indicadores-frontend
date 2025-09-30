import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: null,
    usuario: null,
    token: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers:{
        login: (state, action) => {
            const { token, ...usuario } = action.payload;
            state.isAuthenticated = true
            state.usuario = usuario
            state.token= token
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.usuario = null;
            state.token = null
            localStorage.removeItem("token")
        },
        updateUser: (state, action) => {
            // ignoramos token si viene
            const { token, ...updatedFields } = action.payload;

            state.usuario = {
                ...state.usuario,   // conserva avatar, avatarThumbnail, etc.
                ...updatedFields,   // solo sobreescribe campos del formulario
                emailVerificado: true
            };
        },

        actualizarAvatar: (state, action) => {
            if (!state.usuario) return;

            const { avatar, avatarThumbnail } = action.payload;

            state.usuario = {
                ...state.usuario,  // mantiene todas las demás propiedades intactas
                avatar,
                avatarThumbnail,
            };
        },
    }
})

export const { login, logout, updateUser, actualizarAvatar } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;