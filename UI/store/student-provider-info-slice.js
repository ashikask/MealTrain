import { createSlice, current } from "@reduxjs/toolkit";

export const studentProviderInfoSlice = createSlice({
  name: "provider",
  initialState: {
    providerInfo: { offerings: [] },
    providerInfoCart: {
      offerings: [],
    },
    userDetails: {},
  },
  reducers: {
    replaceProviderInfo: (state, action) => {
      console.log("action.payload[0]");
      console.log(action.payload[0]);
      state.providerInfo = action.payload[0];

      state.providerInfoCart = action.payload[0];
      console.log(state.providerInfo.offerings);
      var offerings = [];
      for (let i = 0; i < state.providerInfo.offerings.length; i++) {
        var isCart = action.payload[1].length > 0;
        var itemIndex = -1;
        if (isCart) {
          itemIndex = action.payload[1].findIndex(
            (x) => x._id == state.providerInfo.offerings[i]._id
          );
        }
        if (
          itemIndex >= 0 &&
          state.providerInfoCart.offerings[i]._id ==
            action.payload[1][itemIndex]._id
        ) {
          offerings.push(action.payload[1][itemIndex]);
        } else {
          var newObject = {
            offeringImage: state.providerInfoCart.offerings[i].offeringImage,
            cuisineType: state.providerInfoCart.offerings[i].cuisineType,
            offeringType: state.providerInfoCart.offerings[i].offeringType,
            offeredAt: state.providerInfoCart.offerings[i].offeredAt,
            offeringName: state.providerInfoCart.offerings[i].offeringName,
            offeringDescription:
              state.providerInfoCart.offerings[i].offeringDescription,
            offeringPrice: state.providerInfoCart.offerings[i].offeringPrice,
            offeringQuantity: 0,
            _id: state.providerInfoCart.offerings[i]._id,
          };
          offerings.push(newObject);
        }
      }
      state.providerInfoCart.offerings = offerings;
      console.log("san");
      console.log(state.providerInfoCart);
    },
    replaceUserDeatils: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const studentProviderInfoActions = studentProviderInfoSlice.actions;
export default studentProviderInfoSlice.reducer;
