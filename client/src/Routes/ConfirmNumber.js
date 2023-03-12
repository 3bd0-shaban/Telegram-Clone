import { BsPen, BsTelegram } from 'react-icons/bs';
import { useVerifyEmailMutation } from '../Redux/APIs/AuthApi'
import useTitle from '../Hooks/useTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCredentials } from '../Redux/Slices/UserSlice';
import { ImSpinner7 } from 'react-icons/im';
const ConfirmNumber = () => {
    useTitle('Login')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        code: '',

    });
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const country = searchParams.get('country');
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const [VerifyEmail, { isLoading, isError, error }] = useVerifyEmailMutation();
    const HandleVerify = async (event) => {
        event.preventDefault();
        const { code } = inputs;
        const data = { email, country, code }
        try {
            const { accessToken, user } = await VerifyEmail(data).unwrap()
            dispatch(setCredentials({ accessToken, user }));
            setInputs({ code: '' });
            navigate(!user.firstname ? '/full-name' : '/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex mt-[10rem] text-center justify-center'>
            <form onSubmit={HandleVerify} className='container max-w-[28rem]'>
                <div className='text-[9rem] md:text-[12rem] text-indigo-600 flex justify-center py-6'>
                    <BsTelegram />
                </div>
                <div className='py-5'>
                    <div className='flex gap-4 items-center justify-center'>
                        <p className='text-2xl md:text-4xl font-bold text-gray-600'>+20 10 1507 6447</p>
                        <button><BsPen style={{ fontSize: '1.4rem' }} /></button>
                    </div>
                    <p className='text-base font-medium py-3 text-gray-500'>We have sent you a message in Telegram <br />
                        with the code.</p>
                </div>
                <div className='py-5 pt-3'>
                    <div className='space-y-6'>
                        <div className="relative">
                            <input type="text"
                                onChange={handleChange}
                                value={inputs.code}
                                name='code'
                                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border 
                                border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label className="floating-label">Code</label>
                        </div>
                        {/* <div className="flex gap-3 w-full mb-5">
                                {[1, 2, 3, 4, 5, 6].map((digit, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="\d{1}"
                                        maxLength={'valueLength'}
                                        className="w-full h-[36px] border rounded-lg text-center font-semibold outline-[1px] outline-violet-700"
                                        value={digit}
                                    />
                                ))}
                            </div> */}
                    </div>
                </div>
                <button
                    disabled={isLoading}
                    className={`w-full uppercase text-white bg-indigo-500 font-bold text-xl py-4 rounded-xl hover:bg-indigo-600 focus:bg-indigo-700 duration-700 
                ${isLoading && '!bg-indigo-400'}`}>
                    {isLoading ?
                        <span className='flex justify-between mx-10 items-center'>
                            <p>Next</p>
                            <p className='text-xl font-bold animate-spin'><ImSpinner7 size={22} /></p>
                        </span> : 'Next'}
                </button>
                {isError && <p className='text-lg font-semibold my-3 text-red-600'>{error?.data?.msg}</p>}

            </form>
        </div>
    )
}

export default ConfirmNumber
