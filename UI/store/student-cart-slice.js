import { createSlice, current } from "@reduxjs/toolkit";

export const studentCartSlice = createSlice({
  name: "cart",
  initialState: {
    cartInfo: { cartItem: [] },
    cartDetail: {
      offeringImage: "",
      cuisineType: "",
      offeringType: "",
      offeredAt: "",
      offeringName: "",
      offeringDescription: "",
      offeringPrice: "",
      offeringQuantity: "",
      providerId: "",
      _id: "",
    },
    placingOrderDetails: {},
  },
  reducers: {
    replaceProviderOrderDetail: (state, action) => {
      state.placingOrderDetails = action.payload;
    },
    replaceCartInfo: (state, action) => {
      state.cartInfo = action.payload;
    },
    addCart: (state, action) => {
      var newCart = action.payload;
      console.log("newCart");
      console.log(newCart);
      state.cartInfo.cartItem.push(newCart);
      var cartItems = state.cartInfo.cartItem;

      for (let i in cartItems) {
        state.cartInfo.cartTotal =
          state.cartInfo.cartTotal +
          cartItems[i].offeringPrice * cartItems[i].offeringQuantity;
      }
    },
    updateTheCart: (state, action) => {
      console.log("update cart:");
      var cartItems = state.cartInfo.cartItem;

      let index = 0;
      for (let i in cartItems) {
        if (cartItems[i]._id == action.payload._id) {
          index = i;
          break;
        }
      }
      state.cartInfo.cartItem[index] = action.payload;

      var totalPrice = state.cartInfo.cartItem.reduce(function (total, cart) {
        return total + cart.offeringQuantity * cart.offeringPrice;
      }, 0);
      state.cartInfo.cartTotal = totalPrice;
    },
    deleteTheCart: (state, action) => {
      var cartItems = state.cartInfo.cartItem;

      const todoList = state.cartInfo.cartItem.filter(
        (cart) => cart._id !== action.payload._id
      );
      state.cartInfo.cartItem = todoList;

      var totalPrice = state.cartInfo.cartItem.reduce(function (total, cart) {
        return total + cart.offeringQuantity * cart.offeringPrice;
      }, 0);

      state.cartInfo.cartTotal = totalPrice;
      if (state.cartInfo.cartTotal == 0) {
        state.cartInfo.cartItem = [];
        state.cartInfo.cartTotal = 0;
        state.cartInfo.providerId = null;
      }
    },
    deleteAllCart: (state, action) => {
      state.cartInfo.cartItem = [];
      state.cartInfo.cartTotal = 0;
      state.cartInfo.providerId = null;
    },
  },
});

export const studentCartActions = studentCartSlice.actions;
export default studentCartSlice.reducer;
