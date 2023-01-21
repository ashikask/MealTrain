import { createSlice, current } from "@reduxjs/toolkit";

const getValueForStatus = (status) => {
  switch (status.toUpperCase()) {
    case "NEW":
      return 0;
    case "ORDER_ACCEPTED":
      return 1;
    case "ORDER_PROCESSING":
      return 2;
    case "ORDER_COMPLETE":
      return 3;
    case "DELIVERED":
      return 4;
    default:
      break;
  }
};

export const studentOrderPlacingSlice = createSlice({
  name: "orderPlace",
  initialState: {
    orderInfo: { orderItems: [] },
    userDetails: {},
  },
  reducers: {
    replaceOrderPlaceInfo: (state, action) => {
      console.log(action.payload);
      state.orderInfo.orderItems.push(action.payload);
    },
    replaceOrderInfo: (state, action) => {
      console.log(action.payload);
      state.orderInfo = action.payload;

      const sortedOrder = [...state.orderInfo.orderItems].sort((a, b) =>
        getValueForStatus(a.status) < getValueForStatus(b.status) ? -1 : 1
      );
      state.orderInfo.orderItems = sortedOrder;
    },
    replaceUserDeatils: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const studentOrderPlacingActions = studentOrderPlacingSlice.actions;
export default studentOrderPlacingSlice.reducer;
