import { apiSlice } from '../ApiSlice';
export const ChannelApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewChannel: builder.mutation({
            query: (data) => ({
                url: '/api/channel/',
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
    useNewChannelMutation,
} = ChannelApi;
