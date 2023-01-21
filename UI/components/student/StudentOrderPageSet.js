import { Stack } from "@chakra-ui/react";
import { Fragment } from "react";
import { StudentOrderPageCard } from "./StudentOrderPageCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { studentCartActions } from "./../../store/student-cart-slice.js";
import { fetchStudentOrders } from "./../../store/student-order-placing-actions.js";
import LoaderCard from "./../student/PlaceOrder/LoaderCard.js";

function StudentOrderPageSet({ showLoader, setShowLoader }) {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.authReducer.user);
  const orderList = useSelector((state) => state.studentOrderPlace.orderInfo);
  const studentId = useSelector(
    (state) => state.userProfileReducer.user.studentId
  );

  if (orderList != undefined) {
    setShowLoader(false);
  }

  useEffect(() => {
    setShowLoader(true);
    dispatch(fetchStudentOrders({ id: loggedInUser.id, studentId }));
  }, [dispatch]);

  return (
    <Fragment>
      {showLoader && <LoaderCard />}
      {!showLoader &&
        orderList.orderItems.map((orderItem) => (
          <StudentOrderPageCard
            key={orderItem._id}
            order={orderItem}
          ></StudentOrderPageCard>
        ))}
    </Fragment>
  );
}

export default StudentOrderPageSet;
