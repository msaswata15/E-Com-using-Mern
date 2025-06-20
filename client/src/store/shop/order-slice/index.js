import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the order slice
const initialState = {
  razorpayOrderId: null,
  approvalURL: null,
  isLoading: false,
  orderList: [],
  orderDetails: null,
  paymentSuccess: null, // Store payment success details
  error: null,
};

// Action to create a new order
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/create",
        orderData
      );
      return response.data; // Return the response data containing Razorpay info
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Action to capture payment after a successful order
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/capture",
        { paymentId, orderId }
      );
      // Store payment success information in session storage
      sessionStorage.setItem("paymentSuccess", JSON.stringify(response.data));
      return response.data; // Return response data on successful payment capture
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Fetch orders by user ID
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/order/list/${userId}`
      );
      return response.data; // Return the fetched orders
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Fetch order details by order ID
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/order/details/${orderId}`
      );
      return response.data; // Return the fetched order details
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Create the order slice
const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => { // Changed back to resetOrderDetails
      state.orderDetails = null;
      state.paymentSuccess = null;
      state.error = null;
      state.razorpayOrderId = null;
      state.approvalURL = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.razorpayOrderId = action.payload.orderId;
        sessionStorage.setItem("currentRazorpayOrderId", action.payload.orderId);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.approvalURL = null;
        state.razorpayOrderId = null;
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentSuccess = action.payload; // Save payment success info
        console.log("Payment Success Data:", action.payload); // Check data in console
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to capture payment. Please try again.";
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

// Export actions and reducer
export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
