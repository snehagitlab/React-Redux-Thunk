import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'


export const UserList = createAsyncThunk(
    'user/listUser',
    async()=>{
        const authToken =  localStorage.getItem('Token'); // Replace with your actual auth token
        const token = authToken.replace(/"/g, '');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url ='https://semilynx-api.gogtas.com/support/api/v1/user/pick/list/?pageNumber=1&sortBy=email&sortOrder=ASC&search={"roleId":[3,4]}&showAll=true'
        try {
            const response = await axios.get(url, config);
            return response.data.payload;
        } catch (error) {
            throw error;
        }
    }
)

export const addUser = createAsyncThunk('user/addUser',
async(userData) => {
    const authToken =  localStorage.getItem('Token'); // Replace with your actual auth token
    const token = authToken.replace(/"/g, '');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "https://semilynx-api.gogtas.com/support/api/v1/user"
    try {
        const response = await axios.post(url, userData, config);
        return response.data.payload;
    } catch (error) {
        throw error;
    }

})

export const updateUser = createAsyncThunk('user/updateUser',
async(userData) => {
    
    const authToken =  localStorage.getItem('Token'); // Replace with your actual auth token
    const token = authToken.replace(/"/g, '');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = `https://semilynx-api.gogtas.com/support/api/v1/user?userId=`+userData.userId
    try{
        const response=await axios.put(url, userData.userData ,config )
        return response
    }
    catch(error){
        throw error;
    }
})

export const deleteUser = (state) => {
    /* console.log("<<<<<<userList===="+JSON.stringify(state))
    console.log(state.userId+"<<<<<<userid")
    const userList = JSON.stringify(state.state)
    const existingUser = userList.find(user => user.userId === state.userId)
    if(existingUser)
    {
        return userList.filter(user => user.userId !== state.userId)
    }
    */
   return state.userId
}

const userList = JSON.parse(localStorage.getItem('userList'));
const userlistSlice = createSlice({
    name:'userList',
    initialState:{
        loading:false,
        user:userList,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(UserList.pending,(state)=>{
            state.loading = true
            state.user = null
            state.error=null
        })
        .addCase(UserList.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.data
            localStorage.setItem('userList', JSON.stringify(action.payload.data));
            state.error=null
        })
        .addCase(UserList.rejected,(state,action)=>{
            state.loading = false
            state.user = null
            if(action.error.message === '"undefined" is not valid JSON')
            {
                state.error = "Access Denied! Invalid Credentials"
            }
            else
            {   
                state.error = action.error.message
            }
        })


        //Add new reducer case for addUser
        .addCase(addUser.pending,(state) => {
            state.loading = true
            state.error= null
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false 
            console.log(action.payload)
            state.user.push(action.payload)
            toast.success("User created successfully!!")
            state.error = null
        })
        .addCase(addUser.rejected,(state,action) => {
            state.loading = false
            if(action.error.message === "Request failed with status code 417")
            {
               toast.error("Something went wrong please try again letter")
            }
        })

        //Update User
        .addCase(updateUser.pending,(state)=>{
            state.loading = true
          //  state.user = null
            state.error=null
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false
            //state.user = action.payload.data
            state.error=null
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading = false
           // state.user = null
            if(action.error.message === '"undefined" is not valid JSON')
            {
                state.error = "Access Denied! Invalid Credentials"
            }
            else
            {   
                state.error = action.error.message
            }
        })

        //delete User
      /*    .addCase(deleteUser.pending,(state)=>{
            state.loading = true
          //  state.user = null
            state.error=null
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action)
            console.log(state)
            //state.user = action.payload.data
            state.error=null
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading = false
           // state.user = null
            if(action.error.message === '"undefined" is not valid JSON')
            {
                state.error = "Access Denied! Invalid Credentials"
            }
            else
            {   
                state.error = action.error.message
            }
        }) */
 
    }
})

export default userlistSlice.reducer