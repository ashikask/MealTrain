import { createSlice, current } from "@reduxjs/toolkit";

export const providerOfferingsSlice = createSlice({
  name: "providerOfferings",
  initialState: {
    offerings: [],
  },
  reducers: {
    replaceOffering: (state, action) => {
      state.offerings = action.payload;
    },
    deleteOffering: (state, action) => {
      var offerings = state.offerings;
      for (let i in offerings) {
        offerings = offerings.filter(
          (offering) => offering._id != action.payload._id
        );
        state.offerings = offerings;
      }
    },
    updateOffering: (state, action) => {
      var offerings = state.offerings;
      for (let i in offerings) {
        if (offerings[i]._id == action.payload._id) {
          offerings[i] = action.payload;
        }
      }
      state.offerings = offerings;
    },
    addOffering: (state, action) => {
      var newOffering = action.payload;
      state.offerings.push(newOffering);
    },
  },
});

export const providerOfferingsActions = providerOfferingsSlice.actions;
export default providerOfferingsSlice.reducer;
