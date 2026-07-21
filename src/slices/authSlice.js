import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    return JSON.parse(token)
  } catch {
    return token
  }
}

const initialState = {
  signupData: null,
  loading: false,
  token: getTokenFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;

      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;