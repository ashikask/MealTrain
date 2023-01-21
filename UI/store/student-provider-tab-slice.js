import { createSlice, current } from "@reduxjs/toolkit";

export const studentProviderOfferingTabSlice = createSlice({
  name: "offerTab",
  initialState: {
    tabIndex: "Breakfast",
  },
  reducers: {
    setTab: (state, action) => {
      state.tabIndex = action.payload;
    },
  },
});

export const studentProviderOfferingTabActions =
  studentProviderOfferingTabSlice.actions;
export default studentProviderOfferingTabSlice.reducer;
