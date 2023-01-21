import { studentCartActions } from "./student-cart-slice.js";

export const addStudentCart = (addCartParams) => {
  return async (dispatch) => {
    const postHandler = async (addCartParams) => {
      console.log(addCartParams.cartItem);
      const res = await fetch(
        `http://localhost:3000/mealtrain/students/${addCartParams.studentId}/cart/`,
        {
          method: "POST",
          body: JSON.stringify(addCartParams.cartItem),
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
      const newOfferingAdded = await postHandler(addCartParams);

      //dispatch(studentCartActions.addCart(addCartParams.cartItem));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchStudentcart = (studentId) => {
  return async (dispatch) => {
    const fetchStudentcart = async (studentId) => {
      const res = await fetch(
        `http://localhost:3000/mealtrain/students/${studentId}/cart/`
      );
      const data = await res.json();
      return data;
    };

    try {
      if (studentId) {
        const studentCartData = await fetchStudentcart(studentId);
        dispatch(studentCartActions.replaceCartInfo(studentCartData));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCart = (deleteCartParams) => {
  return async (dispatch) => {
    const deleteHandler = async (deleteCartParams) => {
      const res = await fetch(
        `http://localhost:3000/mealtrain/students/${deleteCartParams.studentId}/cart/${deleteCartParams.cartId}`,
        {
          method: "DELETE",
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
      const deleteStatus = await deleteHandler(deleteCartParams);
      // dispatch(
      //   studentCartActions.deleteTheCart(deleteCartParams.updatedCartDetails)
      // );
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteAllCart = (studentId) => {
  return async (dispatch) => {
    const deleteHandler = async (studentId) => {
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
      return data;
    };

    try {
      const deleteStatus = await deleteHandler(studentId);
      dispatch(studentCartActions.deleteAllCart(deleteStatus));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCart = (updatedCartParams) => {
  return async (dispatch) => {
    const putHandler = async (updatedCartParams) => {
      const res = await fetch(
        `http://localhost:3000/mealtrain/students/${updatedCartParams.studentId}/cart/${updatedCartParams.cartId}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedCartParams.updatedCartDetails),
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
      const updatedCart = await putHandler(updatedCartParams);
      // dispatch(
      //   studentCartActions.updateTheCart(updatedCartParams.updatedCartDetails)
      // );
    } catch (err) {
      console.log(err);
    }
  };
};
