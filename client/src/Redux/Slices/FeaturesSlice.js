import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Features",
    initialState: {
        keyword: '',
        DrobdownMore: false,
        SeachPanel: false,
    },
    reducers: {
        setKeyword(state, action) {
            state.keyword = action.payload;
        },
        ShowDrobdownMore(state) {
            state.DrobdownMore = !state.DrobdownMore;
        },
        setSearchPanel(state) {
            state.SeachPanel = !state.SeachPanel
        }
    },

})

export const FeaturesAction = FeaturesSlice.actions;
export default FeaturesSlice.reducer
