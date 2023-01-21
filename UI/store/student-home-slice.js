import { createSlice, current } from "@reduxjs/toolkit";

export const studentHomeSlice = createSlice({
  name: "providers",
  initialState: {
    providerList: [],
  },
  reducers: {
    replaceProviderList: (state, action) => {
      state.providerList = action.payload;
    },
  },
});

export const studentHomeActions = studentHomeSlice.actions;
export default studentHomeSlice.reducer;
