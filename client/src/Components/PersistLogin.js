import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "../Redux/APIs/AuthApi";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Redux/Slices/UserSlice";
import usePersist from "../Hooks/usePersist";
// import Logo from './Home/Layouts/Logo';
import { ImSpinner7 } from 'react-icons/im';
const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    await refresh()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])



    let content
    if (!persist) { // persist: no
        // console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        // console.log('loading')

        content =
            <>
                <div className="h-screen flex justify-center items-center text-7xl">
                    <div className="">
                        {/* <Logo /> */}
                        <div className="text-blue-600 text-5xl py-8 animate-spin flex items-center justify-center"><ImSpinner7/></div>
                    </div>
                </div>
            </>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        console.log(error)
        content = <Outlet />
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        // console.log('token and uninit')
        // console.log(isUninitialized)
        content = <Outlet />
    }
    return content
}

export default PersistLogin

