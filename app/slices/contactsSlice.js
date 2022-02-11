import {createSlice} from '@reduxjs/toolkit';
import {contactsURL} from '../services/urls';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    loading: false,
    error: null,
    data: null,
    available: false,
  },
  reducers: {
    fetchingContactsStart: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.error = null;
      state.loading = true;
      state.data = null;
    },
    fetchingContactsSuccess: (state, {payload}) => {
      state.error = null;
      state.data = payload;
      state.available = true;
      state.loading = false;
    },
    fetchingContactsFail: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchingContactsStart,
  fetchingContactsSuccess,
  fetchingContactsFail,
} = contactsSlice.actions;

export default contactsSlice.reducer;

/*
 * Thunk
 */

export const fetchContacts = () => async dispatch => {
  dispatch(fetchingContactsStart());
  const response = await fetch(contactsURL);
  if (response.ok) {
    const fetchedData = await response.json();
    dispatch(fetchingContactsSuccess(fetchedData));
  } else {
    dispatch(fetchingContactsFail(response.status));
  }
};

/*
 * Selectors
 */

export const selectContactsData = state => state.contacts.data;
export const selectContactsLoading = state => state.contacts.loading;
export const selectContactsError = state => state.contacts.error;
export const selectContactsAvailable = state => state.contacts.available;
