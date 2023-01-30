import { apiSlice } from '../ApiSlice';
export const AuthApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        NewChat: builder.mutation({
            query: (id) => ({
                url: `/api/chat/new/${id}`,
                credentials: 'include',
                method: 'POST'
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});
export const {
    useNewChatMutation,
} = AuthApi;