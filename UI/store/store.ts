import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import providerOrdersReducer from "./provider-orders-slice.js";
import providerOfferingsReducer from "./provider-offering-slice.js";
import providerOfferingModalReducer from "./provider-offering-modal-slice.js";
import providerProfileReducer from "./provider-profile-slice.js";
import studentProviderInfoReducer from "./student-provider-info-slice.js";
import studentCartInfoReducer from "./student-cart-slice.js";
import studentProviderOfferTabReducer from "./student-provider-tab-slice.js";
import studentOrderPlacingReducer from "./student-order-placing-slice.js";
import studentHomeReducer from "./student-home-slice.js";
import { authSlice } from "./auth";
import { userProfileSlice } from "./user-profile-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

//add reducers inside
const combinedReducer = combineReducers({
  providerOrders: providerOrdersReducer,
  providerOfferings: providerOfferingsReducer,
  providerOfferingModal: providerOfferingModalReducer,
  providerProfile: providerProfileReducer,
  studentProviderInfo: studentProviderInfoReducer,
  studentCartInfo: studentCartInfoReducer,
  offerTab: studentProviderOfferTabReducer,
  studentOrderPlace: studentOrderPlacingReducer,
  studentHome: studentHomeReducer,
  authReducer: authSlice.reducer,
  userProfileReducer: userProfileSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export type OurStore = ReturnType<typeof combinedReducer>;
//for Server side rendering only [DO NOT MODIFY THIS CODE]
const masterReducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      // counter: {
      //   count: state.counter.count + action.payload.counter.count,
      // },
      // users: {
      //   users: [...action.payload.users.users, ...state.users.users],
      // },
    };
    return nextState;
  } else if (action.type === "USER_LOGOUT") {
    return combinedReducer(undefined, action);
  } else {
    return combinedReducer(state, action);
  }
};

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });
export const store = configureStore<OurStore>({
  reducer: masterReducer,
  middleware: [thunk],
});
export const logoutHandler = () => {
  return {
    type: "USER_LOGOUT",
  };
};
export const makeStore: MakeStore = () => store;

export const wrapper = createWrapper(makeStore);
export type MyThunkDispatch = typeof store.dispatch;
