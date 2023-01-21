import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SelectedCartItemCard from "./SelectedCartItemCard";
import Link from "next/link";
import { deleteAllCart } from "./../../store/student-cart-actions.js";

function SelectedCartItems({
  cartDetails,
  classes = "",
  studentId,
  name,
  providerOfferInfo,
}) {
  cartDetails = useSelector((state) => state.studentCartInfo.cartInfo);

  const dispatch = useDispatch();
  function deleteCart() {
    dispatch(deleteAllCart(studentId));
  }

  function getdata() {
    return providerOfferInfo;
  }

  return (
    <div className={`"flex flex-col" ${classes ? classes : ""}`}>
      <h2 className="title-font font-semibold text-gray-800 tracking-wider text-2xl mb-3">
        Cart
      </h2>
      {cartDetails.cartItem.length == 0 && (
        <div>
          <p className="text-gray-700 text-base mb-4">
            items <span className="text-blue-700 text-base">Empty</span>
          </p>
          <img
            className="w-full h-full object-cover md:w-60 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src="./../empty-cart.png"
            alt=""
          />
        </div>
      )}
      {cartDetails.cartItem.length > 0 && (
        <section>
          <p className="text-gray-700 text-base mb-4">
            items from <span className="text-[#d36a19] text-base">{name}</span>
          </p>
          <button
            onClick={deleteCart}
            className="bg-transparent hover:bg-[#d36a19] text-[#610b15] font-semibold hover:text-white py-2 px-4 md: w-full border border-[#d36a19] hover:border-transparent rounded"
          >
            Clear Cart
          </button>
          {cartDetails.cartItem.map((cartItem) => (
            <SelectedCartItemCard
              key={cartItem._id}
              cartDetail={cartItem}
              studentId={studentId}
              providerId={providerOfferInfo.providerID}
            ></SelectedCartItemCard>
          ))}
          <div className="flex flex-row my-2">
            <span className="flex w-1/2 md: my-3 title-font font-semibold text-xl uppercase text-gray-900">
              <p> Subtotal </p>
            </span>
            <span className="flex w-2/2 md: my-3 title-font font-medium text-xl text-gray-900">
              <p> ${cartDetails.cartTotal} </p>
            </span>
          </div>
          <Link
            href={{
              pathname: "./../student/placeOrder",
              query: getdata(),
            }}
          >
            <button className="bg-[#610b15] hover:bg-[#d36a19] text-white font-semibold hover:text-white py-2 px-4 md: w-full hover:border-transparent rounded">
              CHECKOUT
            </button>
          </Link>
        </section>
      )}
    </div>
  );
}
export default SelectedCartItems;
