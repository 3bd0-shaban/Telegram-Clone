import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Features",
    initialState: {
        DrobdownMore: false,
        isSearchPanel: false,
        isSettingsWin: false,
        isLogout: false,
        isNotification: false,
        isDataStorage: false,
        isPrivacy: false,
        isGeneral: false,
        isChatFolder: false,
        isStikersandEmoji: false,
        isDevices: false,
        isLanguage: false,
        isVideo: false,
        isVideoModal: false,
    },
    reducers: {
        ShowDrobdownMore(state) {
            state.DrobdownMore = !state.DrobdownMore;
        },
        setSearchPanel(state) {
            state.isSearchPanel = !state.isSearchPanel
        },
        setIsSettingsWin(state) {
            state.isSettingsWin = !state.isSettingsWin
        },
        setIsLogout(state) {
            state.isLogout = !state.isLogout
        },
        setIsNotification(state) {
            state.isNotification = !state.isNotification
        },
        setIsDataStorage(state) {
            state.isDataStorage = !state.isDataStorage
        },
        setIsPrivacy(state) {
            state.isPrivacy = !state.isPrivacy
        },
        setIsGeneral(state) {
            state.isGeneral = !state.isGeneral
        },
        setIsChatFolder(state) {
            state.isChatFolder = !state.isChatFolder
        },
        setIsStikersandEmoji(state) {
            state.isStikersandEmoji = !state.isStikersandEmoji
        },
        setIsDevices(state) {
            state.isDevices = !state.isDevices
        },
        setIsLanguage(state) {
            state.isLanguage = !state.isLanguage
        },
        setIsVideo(state) {
            state.isVideo = !state.isVideo
        },
        setIsVideoModal(state) {
            state.isVideoModal = !state.isVideoModal
        }
    },

})

export const FeaturesAction = FeaturesSlice.actions;
export default FeaturesSlice.reducer
