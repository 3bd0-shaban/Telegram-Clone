import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Features",
    initialState: {
        DrobdownMore: false,
        isSearchPanel: false,
    },
    reducers: {
        ShowDrobdownMore(state) {
            state.DrobdownMore = !state.DrobdownMore;
        },
        setSearchPanel(state) {
            state.isSearchPanel = !state.isSearchPanel
        }
    },

})

export const FeaturesAction = FeaturesSlice.actions;
export default FeaturesSlice.reducer
