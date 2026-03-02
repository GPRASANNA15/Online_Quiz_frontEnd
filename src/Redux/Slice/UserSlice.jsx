import { createSlice } from "@reduxjs/toolkit"

const initialState={
    id:localStorage.getItem("userId"),
    role:localStorage.getItem("role")
}
const UserSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setRole:(state,action)=>{
            state.role=action.payload;
            localStorage.setItem("role",action.payload);
        },
        setUserId:(state,action)=>{
          state.id=action.payload;
          localStorage.setItem("userId",action.payload);
        }
    }
})
export const{setRole,setUserId}=UserSlice.actions;
export default UserSlice.reducer;