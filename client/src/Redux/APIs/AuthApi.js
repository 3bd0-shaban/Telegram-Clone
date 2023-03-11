import { LogOut, setCredentials } from '../Slices/UserSlice';
import { apiSlice } from '../ApiSlice';
import getSocket from '../SocketRTK';
export const AuthApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signin',
                method: 'POST',
                body: data,
            }),
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
                        localStorage.removeItem('id')
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatesTags: ['Auth'],
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
                    dispatch(setCredentials({ accessToken, user }))
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
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem('persist', true)
                    localStorage.setItem('id', result?.data?.user?._id)
                    dispatch(
                        setCredentials({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                    let userId = getState().auth?.user?._id;
                    const socket = getSocket()
                    socket.on("connect", () => {
                        socket.emit("join", userId);
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

    }),
});
export const {
    useLogOutMutation,
    useRefreshMutation,
    useSigninMutation,
    useVerifyEmailMutation,
    useRequestOTP2Mutation,
} = AuthApi;