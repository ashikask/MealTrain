import Image from "next/image";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart } from "./../../../store/student-cart-actions.js";
import { studentCartActions } from "./../../../store/student-cart-slice.js";

export default function StudentOrderList({ cartInfo }) {
  const router = useRouter();
  const { status } = router.query;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const providerInfo = useSelector(
    (state) => state.studentProviderInfo.providerInfoCart
  );
  const studentId = useSelector(
    (state) => state.userProfileReducer.user.studentId
  );
  const onRemoveCartItem = () => {
    const updateCartParams = {
      studentId: studentId,
      cartId: cartInfo._id,
      updatedCartDetails: cartInfo,
    };

    dispatch(deleteCart(updateCartParams));
    dispatch(studentCartActions.deleteTheCart(cartInfo));
  };

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-24">
          <img className="h-24" src={cartInfo.offeringImage} alt="" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{cartInfo.offeringName}</span>
          <span className="text-[#d36a19] text-xs">{cartInfo.offeredAt}</span>
          <a
            onClick={onRemoveCartItem}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
          >
            Remove
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-center w-1/5">
        <p className="mx-2 text-center w-8 text-gray-500"> Qty </p>
        <p className="mx-2 border text-center w-8">
          {" "}
          {cartInfo.offeringQuantity}{" "}
        </p>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cartInfo.offeringPrice}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cartInfo.offeringPrice * cartInfo.offeringQuantity}
      </span>
    </div>
  );
}
