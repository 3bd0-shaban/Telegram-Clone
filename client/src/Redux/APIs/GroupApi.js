import { apiSlice } from '../ApiSlice';
export const GroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewGroup: builder.mutation({
            query: (data) => ({
                url: '/api/group/',
                method: 'Post',
                body: data
            }),
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("UserChats", 1, (draft) => {
                            draft.Chats.unshift(data);

                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },
        }),

    }),
});

export const {
    useNewGroupMutation,
} = GroupApi;
