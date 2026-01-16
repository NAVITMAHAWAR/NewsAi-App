import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/utils";

const initialState = {
  loading: false,
  data: null,
  error: null,
  news: [],
  totalPages: 0,
  totalCount: 0,
  totalItem: 0,
  readingHistory: [],
};

const id = getCookie("id");
export const setPreferences = createAsyncThunk(
  "/preferences",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/preferences/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllNews = createAsyncThunk(
  "/fetchallnews",
  async ({ currentPage, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/news?page=${currentPage}&keyword=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "somthing went wrong");
    }
  }
);

export const addReadingHistory = createAsyncThunk(
  "/reading-history",
  async (data, { rejectWithValue }) => {
    const id = getCookie("id");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,
        data
      );
      // Return the full response data
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getReadingHistory = createAsyncThunk(
  "/getreading-history",
  async (_, { rejectWithValue }) => {
    const id = getCookie("id");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`
      );
      // Return the full response data
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setPreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPreferences.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        console.log(action.payload);
        state.totalPages = action.payload.totalPages;
        state.news = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalItem = action.payload.length;
        state.loading = false;
      })
      .addCase(addReadingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getReadingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.readingHistory = action.payload.data;
      })
      .addCase(getReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default newsSlice.reducer;
