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
} = AuthApi;