import { createSlice } from "@reduxjs/toolkit";
import { signinAsync, signupAsync } from "./userThunk";

const initialState = {
  currentUser: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.currentUser === action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signupAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
    });

    builder.addCase(signupAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    builder.addCase(signinAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(signinAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.currentUser = action.payload.data;
      state.error = "";
    });

    builder.addCase(signinAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
