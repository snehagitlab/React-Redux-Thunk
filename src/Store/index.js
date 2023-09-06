import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userList from './userListSlice'
import fileReducer from './fileReducer'; // Import the fileReducer

const store = configureStore({
    reducer:{
        user: userSlice,
        userList:userList,
        file:fileReducer
    }
})

export default store