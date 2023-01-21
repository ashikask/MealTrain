import { createSlice, current } from "@reduxjs/toolkit";

export const providerOrdersSlice = createSlice({
  name: "providerOrders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
    },
    changeOrderStatus: (state, action) => {
      var orders = state.orders;
      for (let i in orders) {
        if (orders[i]._id == action.payload._id) {
          state.orders[i] = action.payload;
        }
      }

    },
  },
});

export const providerOrderActions = providerOrdersSlice.actions;
export default providerOrdersSlice.reducer;
