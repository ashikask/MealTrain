import { providerOrderActions } from "./provider-orders-slice.js";
export const fetchProfileData = (providerId) => {
  return async (dispatch) => {
    const fetchUserDetailsHandler = async (providerId) => {
      //make API call to fetch User Details with provider ID and return Data
      // //   const res = await fetch(
      // //     `http://localhost:3000/mealtrain/providers/${providerId}/orders`
      // //   );
      //   const data = await res.json();
      //   return data;
    };
    const fetchProviderDetailsHandler = async (providerId) => {
      //make API call to fetch providerDetails with provider ID and return Data
      // //   const res = await fetch(
      // //     `http://localhost:3000/mealtrain/providers/${providerId}/orders`
      // //   );
      //   const data = await res.json();
      //   return data;
    };

    try {
      //call two function
      //get data from two function
      //construct object  dispatch the action to store the data
      const cartData = await fetchHandler(providerId);
      dispatch(providerOrderActions.addOrders(cartData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updataUserDetails = (updatedUserDetails) => {
  return async (dispatch) => {
    const updateUserDetailsHandler = async (updatedUserDetails) => {
      //make API call update user details
      // //   const res = await fetch(
      // //     `http://localhost:3000/mealtrain/providers/${providerId}/orders`
      // //   );
      //   const data = await res.json();
      //   return data;
    };

    try {
      // call one function
      // get the data
      // disatch an action to update data in local
      // const cartData = await fetchHandler(providerId);
      // dispatch(providerOrderActions.addOrders(cartData));
    } catch (err) {
      console.log(err);
    }
  };
};
