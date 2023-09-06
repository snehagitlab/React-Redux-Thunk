import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        const request = await axios.post('https://semilynx-api.gogtas.com/support/public/api/v1/login',userCredentials)
        const response = await request.data.payload
        localStorage.setItem('UserInfo',JSON.stringify(response))
        localStorage.setItem('Token',JSON.stringify(response.token))
        return response
    }
)
const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:null,
       // LoggedInUser:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true
            state.user = null
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.data.fname+" "+action.payload.data.lname
           // state.LoggedInUser = action.payload.data
            state.error=null
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.user = null
            if(action.error.message === 'Request failed with status code 401')
            {
                state.error = "Access Denied! Invalid Credentials"
            }
            else
            {   
                state.error = action.error.message

            }
        })
    }
})

export default userSlice.reducer