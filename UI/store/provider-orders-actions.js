import { providerOrderActions } from "./provider-orders-slice.js";
import axios from "../lib/axios";

export const fetchOrders = (data) => {
  return async (dispatch) => {
    const fetchHandler = async (data) => {
      //   const res = await fetch(
      //     `http://localhost:3000/mealtrain/providers/${providerId}/orders`
      //   );
      //   const data = await res.json();
      //   return data;
      // };

      console.log("data", data);
      const response = await axios
        .get(`providers/${data.providerId}/orders`, {
          params: {
            userAccountId: data.id,
          },
        })
        .then((res) => {
          return res.data;
        });
      return response;
    };
    try {
      const cartData = await fetchHandler(data);
      dispatch(providerOrderActions.addOrders(cartData));
    } catch (err) {
      console.log(err);
    }
  };
};

// {
//   orderId,
//   providerId,
// updated order
// }

export const updateOrderStatus = (updateDetails) => {
  return async (dispatch) => {
    const updateHandler = async (updateDetails) => {
      const res = await fetch(
        `http://localhost:3000/mealtrain/providers/${updateDetails.providerId}/orders/${updateDetails.orderId}/`,
        {
          method: "PUT",
          body: JSON.stringify(updateDetails.order),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const data = await res.json();
      return data;
    };

    try {
      await updateHandler(updateDetails);
      dispatch(providerOrderActions.changeOrderStatus(updateDetails.order));
    } catch (err) {
      console.log(err);
    }
  };
};
