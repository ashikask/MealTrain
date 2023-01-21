import { studentOrderPlacingActions } from "./student-order-placing-slice.js";
import { studentCartActions } from "./student-cart-slice.js";
import axios from "../lib/axios";

export const fetchStudentOrders = (data) => {
  return async (dispatch) => {
    const fetchOrders = async (data) => {
      console.log("data", data);
      const response = await axios
        .get(`students/${data.studentId}/orders`, {
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
      const studentOrders = await fetchOrders(data);
      dispatch(studentOrderPlacingActions.replaceOrderInfo(studentOrders));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const fetchStudentOrders = (studentId) => {
//   return async (dispatch) => {
//     const fetchOrders = async (studentId) => {
//       const res = await axios(
//         `http://localhost:3000/mealtrain/students/${studentId}/orders/`
//       );
//       const data = await res.json();
//       return data;
//     };

//     const response = await axios
//       .get(`students/${data.providerId}/orders`, {
//         params: {
//           userAccountId: data.id,
//         },
//       })
//       .then((res) => {
//         return res.data;
//       });
//     return response;

//     try {
//       const studentOrders = await fetchOrders(studentId);
//       dispatch(studentOrderPlacingActions.replaceOrderInfo(studentOrders));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const placeOrder = (addCartParams) => {
  return async (dispatch) => {
    const placeOrderHandler = async (addCartParams) => {
      const res = await fetch(`http://localhost:3000/mealtrain/orders/`, {
        method: "POST",
        body: JSON.stringify(addCartParams.orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    };

    const deleteStudentcart = async (studentId) => {
      const res = await fetch(
        `http://localhost:3000/mealtrain/students/${studentId}/cart/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    };

    try {
      const orderData = await placeOrderHandler(addCartParams);
      dispatch(studentOrderPlacingActions.replaceOrderPlaceInfo(orderData));
      const studentCartData = await deleteStudentcart(addCartParams.studentId);
      dispatch(studentCartActions.deleteAllCart(studentCartData));
    } catch (err) {
      console.log(err);
    }
  };
};
