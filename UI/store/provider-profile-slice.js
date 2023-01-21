import { createSlice, current } from "@reduxjs/toolkit";

export const providerProfileSlice = createSlice({
  name: "providerProfile",
  initialState: {
    userDetails: {
      firstName: null,
      lastName: null,
      role: null,
      email: null,
      phoneNumber: null,
      address: {
        aptNo: null,
        streetName: null,
        city: null,
        state: null,
        zip: null,
      },
      providerId: null,
    },
    providerDetails: { name: null, businessImage: null, rating: null },
  },
  reducers: {
    replaceProviderProfile: (state, action) => {
      state.userDetails = action.payload.providerOrdersSlice;
      state.providerDetails = action.payload.providerDetails;
    },
    updateUserDetails: (state, action) => {
      state.userDetails.phoneNumber = action.phoneNumber;
      state.userDetails.address = action.address;
    },
  },
});

export const providerProfileActions = providerProfileSlice.actions;
export default providerProfileSlice.reducer;
