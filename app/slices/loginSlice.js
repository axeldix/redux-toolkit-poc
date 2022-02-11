import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    data: null,
    token: null,
  },
  reducers: {
    fetchingLoginStart: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.error = null;
      state.loading = true;
      state.data = null;
      state.token = null;
    },
    fetchingLoginSuccess: (state, {payload}) => {
      state.error = null;
      state.data = payload;
      state.token = payload;
      state.loading = false;
    },
    fetchingLoginFail: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {fetchingLoginStart, fetchingLoginSuccess, fetchingLoginFail} =
  loginSlice.actions;

export default loginSlice.reducer;

/*
 * Thunk
 */
export const fetchLogin = () => async dispatch => {
  console.log('ejecutado');
  dispatch(fetchingLoginStart());
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response.ok) {
      const fetchedData = await response.json();
      dispatch(fetchingLoginSuccess(fetchedData));
    } else {
      dispatch(fetchingLoginFail(response.status));
    }
  } catch (err) {
    console.log('error', err);
  }
};

/*
 * Selectors
 */

export const selectLoginData = state => state.login.data;
export const selectLoginLoading = state => state.login.loading;
export const selectLoginError = state => state.login.error;
