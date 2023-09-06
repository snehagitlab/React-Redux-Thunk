import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Store/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    //state
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
     
    //Redux state
    const  {loading,error} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginEvent = (e) =>{
        e.preventDefault()
        const plateform  = 1;
        const firebaseToken="cVXvNf31hUgEgkpTGCnDGw:APA91bFPDiduE7ct6hoHTKMiPz_DOEJa-GIYIOKkK5ZnsMy0tSRZ7vT4nw850Y9zcu9sT4K6E3RWU4IQkvv1d5S7nkDPaQlSZNqLJ2CFLaO3TI0TLOpAxGTZHkcq2Cl3RsxuvUNFYIkf";
        let userCredential ={
            email,password,plateform,firebaseToken
        }
        dispatch(loginUser(userCredential)).then((result)=>{
            if(result.payload){
                setEmail('')
                setPassword('')
                navigate('/')
            }
        })
    }

  return (
    <>
    <div className='flex justify-center items-center min-h-screen px-5 md:px-0'>
    <div  className='shadow hover:shadow-lg p-10 rounded-md !bg-white w-full max-w-[500px]'>
        <div className='text-2xl text-black font-bold mb-3'>Login</div>
        <form className='custom-form' onSubmit={handleLoginEvent}>
          <label className='text-black'>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}  autoComplete='off'
          className="input-form" placeholder="Email" />

          <br />
          <label className='text-black'>Password</label>
          <input type="password" required className='input-form' autoComplete='off'
           value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
          <br />
          <button  className='btn !btn-wide  min-w-full mt-4 text-white bg-accent border-none hover:bg-accent '>
            Login
          </button>
          <div
          className='text-sm text-right mt-1'
          >Forgot Password?</div>
          {error && (
              <div className='alert alert-danger' role='alert'>{error}</div>
          )}
      </form>
      </div>
    </div>
    </>
  )
}

export default Login
