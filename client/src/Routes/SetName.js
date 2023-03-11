import useTitle from '../Hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCurrentToken, setCredentials } from '../Redux/Slices/UserSlice';
import { ImSpinner7 } from 'react-icons/im';
import { useSetNameMutation, useUpdateProfilePicMutation } from '../Redux/APIs/UserApi';
import { FeaturesAction } from '../Redux/Slices/FeaturesSlice';
import { FiPlus } from 'react-icons/fi';
import { selectCurrentUser } from './../Redux/Slices/UserSlice';
const SetName = () => {
    useTitle('Login')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',

    });
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const accessToken = useSelector(selectCurrentToken)
    const userInfo = useSelector(selectCurrentUser)

    const [setName, { isLoading, isError, error }] = useSetNameMutation();
    const HandleVerify = async (event) => {
        event.preventDefault();
        const { firstname, lastname } = inputs;
        const data = { firstname, lastname }
        try {
            const { user } = await setName(data).unwrap()
            dispatch(setCredentials({ accessToken, user }));
            setInputs({ code: '' });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const [UpdateProfilePic, { isLoading: loadingupload, isError: iserrorupload, error: errorupload }] = useUpdateProfilePicMutation();
    const [avatar, setAvatar] = useState();
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatar(reader.result);
            };
        }
    };
    const UploadPhotoHandler = async () => {
        const data = { avatar };
        const { user } = await UpdateProfilePic(data).unwrap();
        if (user) {
            dispatch(setCredentials({ accessToken, user }))
            dispatch(FeaturesAction.setIsModalChangeProfile(false))
        }
    };
    useEffect(() => {
        if (avatar) {
            UploadPhotoHandler()
        }
        // eslint-disable-next-line 
    }, [avatar])

    return (
        <div className='flex mt-[10rem] text-center justify-center'>
            <form onSubmit={HandleVerify} className='container max-w-[28rem]'>
                <div className='flex justify-center '>
                    <label className="block cursor-pointer text-blue-500 font-medium focus:bg-gray-500 group relative">
                        <img
                            className="w-40 h-40 lg:w-48 lg:h-48 rounded-full flex justify-center object-cover items-center"
                            src={userInfo?.avatar[0]?.url ? userInfo?.avatar[0]?.url : process.env.REACT_APP_DefaultIcon}
                            alt=''
                        />

                        {loadingupload ?
                            <div className='hidden rounded-full group-hover:flex text-white items-center justify-center absolute p-2 inset-0 hover:bg-black/20'>
                                <ImSpinner7 size={25} />
                            </div> :
                            <div className='hidden rounded-full group-hover:flex text-white items-center justify-center absolute p-2 inset-0 hover:bg-black/20'>
                                <FiPlus />
                            </div>
                        }
                        <input
                            onChange={loadFile}
                            id="dropzone-file"
                            type="file"
                            multiple
                            className="hidden"
                        />
                    </label>
                </div>
                <div className='py-5'>
                    <p className='text-base font-medium py-3 text-gray-500'>Enter your full name.</p>
                </div>
                <div className='py-5 pt-3'>
                    <div className='space-y-6'>
                        <div className="relative">
                            <input type="text" onChange={handleChange} value={inputs.firstname} name='firstname' className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label className="absolute text-md font-semibold text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First name</label>
                        </div>
                        <div className="relative">
                            <input type="text" onChange={handleChange} value={inputs.lastname} name='lastname' className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label className="absolute text-md font-semibold text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last name</label>
                        </div>
                    </div>
                </div>
                <button disabled={isLoading || loadingupload} className={`w-full uppercase text-white bg-indigo-500 font-bold text-xl py-4 rounded-xl hover:bg-indigo-600 focus:bg-indigo-700 duration-700 ${isLoading && '!bg-indigo-400'}`}>
                    {isLoading ?
                        <span className='flex justify-between mx-10 items-center'>
                            <p>Next</p>
                            <p className='text-xl font-bold'><ImSpinner7 size={22} /></p>
                        </span> : 'Next'}
                </button>
                {(isError || iserrorupload) && <p className='text-lg font-semibold my-3 text-red-600'>{error?.data?.msg || errorupload?.data?.msg}</p>}
            </form>

        </div>
    )
}

export default SetName
