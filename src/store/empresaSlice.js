import { createSlice } from "@reduxjs/toolkit";

const empresaSlice = createSlice({
    name: "empresa",
    initialState: {}, 
    reducers: {
        setEmpresa: (state, action) => {
            state.empresa = action.payload
        },
        deleteEmpresa: (state, action) => {
            state.empresa = null
        }
    }
})

export const {setEmpresa, deleteEmpresa} = empresaSlice.actions;
export default empresaSlice.reducer;