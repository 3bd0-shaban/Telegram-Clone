import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Features",
    initialState: {
        DrobdownMore: false,
    },
    reducers: {
        ShowDrobdownMore(state) {
            state.DrobdownMore = !state.DrobdownMore;
        },
    },

})

export const { ShowDrobdownMore } = FeaturesSlice.actions;
export default FeaturesSlice.reducer
