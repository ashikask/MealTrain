import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ProviderOfferingCard from "./ProviderOfferingCard";
import { studentCartActions } from "./../../store/student-cart-slice.js";
import { deleteCart, updateCart } from "./../../store/student-cart-actions.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

function SelectedCartItemCard({ cartDetail, studentId, providerId }) {
  const dispatch = useDispatch();
  const [cost, setCalculatedCost] = useState(0);

  var cartFieldsinitial = {
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
  };

  const [cartFields, setCartFields] = useState(cartFieldsinitial);

  useEffect(() => {
    try {
      setCartFields({
        offeringImage: cartDetail.offeringImage,
        cuisineType: cartDetail.cuisineType,
        offeringType: cartDetail.offeringType,
        offeredAt: cartDetail.offeredAt,
        offeringName: cartDetail.offeringName,
        offeringDescription: cartDetail.offeringDescription,
        offeringPrice: cartDetail.offeringPrice,
        offeringQuantity: cartDetail.offeringQuantity,
        providerId: providerId,
        _id: cartDetail._id,
      });
      setCalculatedCost(cartDetail.offeringPrice);
    } catch (e) {
      console.log(e);
    }
  }, [cartDetail]);

  const cartInfo = useSelector((state) => state.studentCartInfo.cartInfo);

  function getCartCount() {
    var offeringQuantity = 0;
    for (var cartItem of cartInfo.cartItem) {
      if (cartItem._id == cartFields._id) {
        offeringQuantity = cartItem.offeringQuantity;
        break;
      }
    }
    return offeringQuantity;
  }

  const changeQuantity = (value) => {
    // Don't allow the quantity less than 0, if the quantity is greater than value entered by user then the user entered quantity is used, else 0
    setCartFields({ ...cartFields, offeringQuantity: Math.max(0, value) });
  };

  const onQuantityPlus = () => {
    changeQuantity(cartFields.offeringQuantity + 1);
    var updatedCartFields = {
      ...cartFields,
      offeringQuantity: cartFields.offeringQuantity + 1,
    };

    const updateCartParams = {
      studentId: studentId,
      cartId: cartFields._id,
      updatedCartDetails: updatedCartFields,
    };
    dispatch(updateCart(updateCartParams));
    dispatch(studentCartActions.updateTheCart(updatedCartFields));
  };

  const onQuantityMinus = () => {
    var updatedCartFields = {
      ...cartFields,
      offeringQuantity: cartFields.offeringQuantity - 1,
    };
    changeQuantity(updatedCartFields.offeringQuantity);
    const updateCartParams = {
      studentId: studentId,
      cartId: cartFields._id,
      updatedCartDetails: updatedCartFields,
    };
    if (cartFields.offeringQuantity == 1) {
      dispatch(deleteCart(updateCartParams));
      dispatch(studentCartActions.deleteTheCart(updatedCartFields));
    } else {
      dispatch(updateCart(updateCartParams));
      dispatch(studentCartActions.updateTheCart(updatedCartFields));
    }
  };

  function handleIncrement() {
    onQuantityPlus();
  }

  function handleDecrement() {
    onQuantityMinus();
  }

  return (
    <div key={cartDetail._id} className="flex flex-row">
      <span className="flex w-4/5 md: my-4 title-font font-semiboldtext-base text-gray-900">
        <p> {cartDetail.offeringName} </p>
      </span>

      <p className=" flex w-5/5 text-center font-semibold items-center w-40  mx-2 text-gray-700">
        Qty {cartFields.offeringQuantity}
      </p>

      <span className="flex w-5/5 my-4 title-font font-medium text-base text-gray-900">
        <p>
          {" "}
          $
          {cartFields.offeringQuantity == 0
            ? cartFields.offeringPrice
            : cartFields.offeringQuantity * cartFields.offeringPrice}
        </p>
      </span>
    </div>
  );
}
export default SelectedCartItemCard;
