import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice.js'

export default function Signup() {
  const [formData,setFormData] = useState({})
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Handlechange = (e) => {
      setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        dispatch(signUpStart())
        const res = await fetch('/api/auth/signup', {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(formData)
        })
        
        const data = await res.json()
        console.log(data)
        if(data.success === false){  
          dispatch(signUpFailure(data.message))
          return 
        }
        dispatch(signUpSuccess(data))
        navigate("/sign-in")
      } catch (error) {
        dispatch(signUpFailure(error.message))
      }
  }
  // console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold  my-7'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="username"  placeholder="Username" name="" id="username" className='border p-3 rounded-lg  hover:opacity-90' onChange={Handlechange} />
        <input type="email"  placeholder="Enter Email" name="" id="email" className='border p-3 rounded-lg  hover:opacity-90' onChange={Handlechange}/>
        <input type="password"  placeholder="password" name="" id="password" className='border p-3 rounded-lg  hover:opacity-90'onChange={Handlechange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-50'> {loading? "LOADING..." : "Sign Up"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account </p>
        <Link to="/sign-in">
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
      
    </div>
  )
}
