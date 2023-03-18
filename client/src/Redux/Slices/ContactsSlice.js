import { createSlice } from "@reduxjs/toolkit"
const ContactsSlice = createSlice({
    name: 'Contacts',
    initialState: {
        contacts: [],
    },
    reducers: {
        setContacts(state, action) {
            state.contacts = action.payload;

        },
    }
})
export const { setContacts } = ContactsSlice.actions;
export default ContactsSlice.reducer

export const selectContacts = (state) => state.Contacts.contacts
