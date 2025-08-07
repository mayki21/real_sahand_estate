import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold  my-7'>Signup</h1>
      <form className='flex flex-col gap-4'>
        <input type="username"  placeholder="Username" name="" id="username" className='border p-3 rounded-lg  hover:opacity-90' />
        <input type="email"  placeholder="Enter Email" name="" id="email" className='border p-3 rounded-lg  hover:opacity-90' />
        <input type="password"  placeholder="password" name="" id="password" className='border p-3 rounded-lg  hover:opacity-90' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-50'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account </p>
        <Link to="/sign-in">
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      
    </div>
  )
}
