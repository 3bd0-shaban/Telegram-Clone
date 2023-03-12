import React from 'react'
import { BsTelegram } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../Redux/APIs/AuthApi';
import { useState } from 'react';
import { useTitle, usePersist } from '../Components/Exports';
import { ImSpinner7 } from 'react-icons/im'
const SignIn = () => {
  useTitle('Login')
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    country: '',
    email: ''
  });
  const [persist, setPersist] = usePersist();
  const HandleToggle = () => {
    setPersist(prev => !prev)
  }
  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const [signin, { isLoading, isError, error }] = useSigninMutation();
  const HandleSignIn = async (event) => {
    event.preventDefault();
    const { email, country } = inputs;
    const data = { email, country }
    await signin(data).unwrap()
      .then(() => {
        navigate(`/confirm?email=${email}&country=${country}&code=`)
        setInputs({ email: '', country: '' });
      }).catch(() => {

      })
  }
  return (
    <div className='mt-[7rem] flex text-center justify-center'>
      <div className='container max-w-[28rem]'>
        <div className='text-[9rem] md:text-[12rem] text-indigo-600 flex justify-center py-6'>
          <BsTelegram />
        </div>
        <div className='py-5'>
          <p className='text-2xl md:text-4xl font-bold text-gray-600'>Sign in to Telegram</p>
          <p className='text-base font-medium py-3 text-gray-500'>Please confirm your country and <br />
            enter your phone number.</p>
        </div>
        <form onSubmit={HandleSignIn}>
          <div className='py-5 pt-3'>
            <div className='space-y-6'>
              <div className="relative">
                <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border
                  border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={handleChange} value={inputs.country} name='country' placeholder=" " />
                <label className="floating-label">Country</label>
              </div>
              <div className="relative">
                <input type="email" onChange={handleChange} value={inputs.email} name='email' className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border
                  border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label className="floating-label">Phone Number</label>
              </div>
            </div>
            <div className='flex justify-start px-5 py-5 '>
              <input type='checkbox' onChange={HandleToggle} value={persist} className='duration-500 p-3' />
              <p className='px-6 text-lg font-medium flex items-center text-gray-500'>Keep me signed in</p>
            </div>
          </div>
          <button disabled={isLoading} className={`w-full uppercase text-white bg-indigo-500 font-bold text-xl py-4 rounded-xl hover:bg-indigo-600 focus:bg-indigo-700 duration-700 ${isLoading && '!bg-indigo-400'}`}>
            {isLoading ?
              <span className='flex justify-between mx-10 items-center'>
                <p>Next</p>
                <p className='text-xl font-bold'><ImSpinner7 size={22} /></p>
              </span> : 'Next'}
          </button>
        </form>
        <div className='py-4 hover:bg-gray-100 rounded-xl my-2 duration-700'>
          <Link to='' className='uppercase text-lg text-indigo-600 mt-3 font-semibold'>Log in by qr code</Link>
        </div>
        {isError && <p className='text-lg font-semibold text-red-600'>{error?.data?.msg}</p>}
      </div>
    </div>
  )
}

export default SignIn
