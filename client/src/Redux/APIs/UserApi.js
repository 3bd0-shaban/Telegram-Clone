import { apiSlice } from '../ApiSlice';
export const UserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Search: builder.query({
            query: (keyword) => ({
                url: `/api/user/search?keyword=${keyword}&page=${1}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                return {
                    users: apiResponse,
                    totalCount: Number(apiResponse.length),
                };
            },
        }),
        SearchMore: builder.query({
            query: ({ keyword, page }) => ({
                url: `/api/user/search?keyword=${keyword}&page=${page}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        UpdateProfilePic: builder.mutation({
            query: (data) => ({
                url: '/api/user/updatepic',
                method: 'PUT',
                body: data,
            }),
        }),
        getUserById: builder.query({
            query: (username) => ({
                url: `/api/user/get/${username}`,
            }),
        }),
        setName: builder.mutation({
            query: (data) => ({
                url: '/api/user/setname',
                method: 'PUT',
                body: data,
            }),
        }),
        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: '/api/user/updateuser',
                method: 'PUT',
                body: data,
            }),
        }),
        Block: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        UnBlock: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        ChangePrivacy: builder.mutation({
            query: () => ({
                url: '/api/user/privacy',
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
    }),

});

export const {
    useSearchQuery,
    useSetNameMutation,
    useUpdateUserInfoMutation,
    useGetUserByIdQuery,
    useBlockMutation,
    useUnBlockMutation,
    useChangePrivacyMutation,
    useUpdateProfilePicMutation,
} = UserApi;
