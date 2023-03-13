import { LogOut, setCredentials } from '../Slices/UserSlice';
import { apiSlice } from '../ApiSlice';
import getSocket from '../../Utils/SocketConnect';
export const AuthApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signin',
                method: 'POST',
                body: data,
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken, user } = data
                    dispatch(setCredentials({ accessToken, user }));
                    let userId = user?._id;
                    const socket = getSocket()
                    socket.on("connect", () => {
                        socket.emit("join", userId);
                        console.log('connected')
                    });
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatesTags: ['Auth'],
        }),
        VerifyEmail: builder.mutation({
            query: (data) => ({
                url: `/api/auth/activateEmail`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem('persist', true)
                    dispatch(
                        setCredentials({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                    let userId = result?.data?.user?._id;
                    console.log(userId)
                    const socket = getSocket()
                    socket.on("connect", () => {
                        socket.emit("join", userId);
                        console.log('connected')
                    });
                } catch (err) {
                    // do nothing
                }
            },
        }),
        RequestOTP2: builder.mutation({
            query: (data) => ({
                url: '/api/auth/request2otpactivate',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(LogOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                        localStorage.removeItem('persist')
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
});
export const {
    useLogOutMutation,
    useRefreshMutation,
    useSigninMutation,
    useVerifyEmailMutation,
    useRequestOTP2Mutation,
} = AuthApi;