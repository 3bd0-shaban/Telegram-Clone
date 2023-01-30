import { LogOut, setCredentials } from '../Slices/UserSlice';
import { apiSlice } from '../ApiSlice';
export const AuthApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query({
            query: (id) => ({
                url: `/api/auth/get/${id}`,
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/auth/info',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getAllUsers: builder.query({
            query: (pagenum) => ({
                url: `/api/auth/getall?page=${pagenum}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signin',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signup',
                method: 'POST',
                // credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(LogOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
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
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        VerifyEmail: builder.mutation({
            query: ({ email, code }) => ({
                url: `/api/auth/activateEmail?email=${email}&code=${code}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        VerifyEmailtoResest: builder.mutation({
            query: ({ email, code }) => ({
                url: `/api/auth/verifyOtp?email=${email}&code=${code}`,
                method: 'GET',
            }),
            invalidatesTags: ['Auth'],
        }),
        RequestOTP2: builder.mutation({
            query: (data) => ({
                url: '/api/auth/request2otpactivate',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        ActivateLoggedEmail: builder.mutation({
            query: (data) => ({
                url: `/api/auth/request2otpactivate`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        ForgetPassword: builder.mutation({
            query: (email) => ({
                url: `/api/auth/generateOtp?email=${email}&code=`,
                method: 'GET',
                // body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        ResetPassword: builder.mutation({
            query: (data) => ({
                url: '/api/auth/resetpassword',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/auth/get/deleteuser/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserInfo: builder.mutation({
            query: (data, id) => ({
                url: `/api/auth/updateuser/${id}`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/auth/updateuserrole/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});
export const {
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useLogOutMutation,
    useRefreshMutation,
    useSigninMutation,
    useSignupMutation,
    useVerifyEmailMutation,
    useRequestOTP2Mutation,
    useActivateLoggedEmailMutation,
    useVerifyEmailtoResestMutation,
} = AuthApi;