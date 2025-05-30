import { setCookie, removeCookie } from "../../utils/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { getCookie } from "../../utils/utils";
import { auth, googleAuthProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const initialState = {
  loading: false,
  authenticated: getCookie("isAuthenticated") || false,
  name: getCookie("name") || null,
  id: getCookie("id") || null,
  preferences: JSON.parse(localStorage.getItem("preferences")) || [],
};

export const SignUp = createAsyncThunk(
  "/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/Register`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Logine = createAsyncThunk(
  "/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/Login`,
        data,
        { withCredentials: true }
      );

      const verifyres = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        { withCredentials: true }
      );
      return { ...res.data, ...verifyres.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signInWithGoogle = createAsyncThunk("/google-login", async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const idToken = await result.user.getIdToken();
    console.log(idToken);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      { idToken }
    );
    const verifyres = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/verify`,
      { withCredentials: true }
    );
    return { ...res.data, ...verifyres.data };
  } catch (error) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    signOut: function (state) {
      state.authenticated = false;
      state.id = null;
      state.name = null;

      removeCookie("isAuthenticated");
      removeCookie("name");
      removeCookie("id");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
        toast.success(action.payload.message);
      })
      .addCase(SignUp.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        toast.error(action.payload.response.data.message);
      })
      .addCase(Logine.pending, (state) => {
        state.loading = true;
      })
      .addCase(Logine.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;

        setCookie("isAuthenticated", action.payload.authenticated);
        setCookie("email", action.payload.email);
        setCookie("name", action.payload.name);
        setCookie("id", action.payload.id);
        state.preferences = action.payload.preferences;

        localStorage.setItem(
          "preferences",
          JSON.stringify(action.payload.preferences)
        );

        console.log(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(Logine.rejected, (state, action) => {
        console.log(action.payload);

        toast.error(action.payload.response.data.message);
        state.loading = false;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;

        setCookie("isAuthenticated", action.payload.authenticated);
        setCookie("email", action.payload.email);
        setCookie("name", action.payload.name);
        setCookie("id", action.payload.id);
        state.preferences = action.payload.preferences;

        localStorage.setItem(
          "preferences",
          JSON.stringify(action.payload.preferences)
        );

        console.log(action.payload);
        toast.success(action.payload.message);
      });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;
