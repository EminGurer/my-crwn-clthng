import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUserSession(state) {
      state.isLoading = true;
    },
    googleSignInStart(state) {
      state.isLoading = true;
    },
    emailSignInStart(state, action) {
      state.isLoading = true;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signInFail(state, action) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    signUpStart(state, action) {},
    signUpSuccess(state, action) {},
    signUpFail(state, action) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    signOutStart() {},
    signOutSuccess(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    signOutFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFail,
  signUpStart,
  signUpSuccess,
  signUpFail,
  signOutStart,
  signOutSuccess,
  signOutFail,
} = userSlice.actions;
export default userSlice.reducer;
