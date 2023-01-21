import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  addStudentCart,
  deleteCart,
  updateCart,
} from "./../../store/student-cart-actions.js";
import { studentCartActions } from "./../../store/student-cart-slice.js";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { deleteAllCart } from "./../../store/student-cart-actions.js";

function ProviderOfferingCard({
  offeringDetails,
  cartInfo,
  studentId,
  providerId,
}) {
  const [value, setIncrement] = useState(0);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
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
        offeringImage: offeringDetails.offeringImage,
        cuisineType: offeringDetails.cuisineType,
        offeringType: offeringDetails.offeringType,
        offeredAt: offeringDetails.offeredAt,
        offeringName: offeringDetails.offeringName,
        offeringDescription: offeringDetails.offeringDescription,
        offeringPrice: offeringDetails.offeringPrice,
        offeringQuantity: offeringDetails.offeringQuantity,
        providerId: providerId,
        _id: offeringDetails._id,
      });
    } catch (e) {
      console.log(e);
    }
  }, [offeringDetails]);

  cartInfo = useSelector((state) => state.studentCartInfo.cartInfo);

  function getCartCount() {
    var offeringQuantity = 0;
    for (var cartItem of cartInfo.cartItem) {
      if (cartItem._id == offeringDetails._id) {
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
    console.log(updatedCartFields.offeringQuantity);
    if (updatedCartFields.offeringQuantity == 0) {
      dispatch(deleteCart(updateCartParams));
      dispatch(studentCartActions.deleteTheCart(updatedCartFields));
    } else {
      dispatch(updateCart(updateCartParams));
       dispatch(studentCartActions.updateTheCart(updatedCartFields));
    }
  };

  function handleIncrement() {
    if (cartFields.offeringQuantity == 0) {
      handleAddCart();
    } else {
      onQuantityPlus();
    }
  }

  function handleDecrement() {
    if (cartFields.offeringQuantity >= 0) {
      onQuantityMinus();
    }
  }

  function deleteTheCart() {
    dispatch(deleteAllCart(studentId));
    onClose();
    addToNewCart();
  }

  function addNewProviderCart() {
    const cartOffer = {
      offeringImage: offeringDetails.offeringImage,
      cuisineType: offeringDetails.cuisineType,
      offeringType: offeringDetails.offeringType,
      offeredAt: offeringDetails.offeredAt,
      offeringName: offeringDetails.offeringName,
      offeringDescription: offeringDetails.offeringDescription,
      offeringPrice: offeringDetails.offeringPrice,
      offeringQuantity: 1,
      providerId: providerId,
      _id: offeringDetails._id,
    };
    changeQuantity(1);
    const addCartParams = {
      studentId: studentId,
      cartItem: cartOffer,
    };
    console.log("addCartParams");
    console.log(addCartParams);

    dispatch(addStudentCart(addCartParams));
    // dispatch(studentCartActions.addCart(addCartParams));
  }

  function addToNewCart() {
    changeQuantity(1);
    var updatedCartFields = {
      ...cartFields,
      offeringQuantity: 1,
    };

    const addCartParams = {
      studentId: studentId,
      cartItem: updatedCartFields,
    };

    dispatch(addStudentCart(addCartParams));
    dispatch(studentCartActions.addCart(updatedCartFields));
  }

  function handleAddCart() {
   // addToNewCart();
    if (cartInfo.cartItem.length > 0) {
      console.log("cartInfo.cartItem.length");
      console.log(cartInfo.cartItem[0].providerId);
      console.log(providerId);
      if (cartInfo.cartItem[0].providerId == providerId) {
        addToNewCart();
      } else {
        onOpen();
      }
    } else {
      addToNewCart();
    }
  }

  return (
    <div
      key={offeringDetails._id}
      // className="max-w-sm w-full lg:max-w-full lg:flex"
    >
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alert!!!
            </AlertDialogHeader>

            <AlertDialogBody>
              There are items in the cart from other provider , do you want to
              clear and items from new provider?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteTheCart} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className="flex flex-col md:flex-row md:max-w-3xl md: my-5 md: mx-5 rounded-lg bg-[#fddd91] shadow-lg">
        <img
          className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={offeringDetails.offeringImage}
          alt=""
        />
        <div className="p-6 flex flex-col justify-start">
          <h5 className="text-2xl text-[#d36a19] uppercase font-medium mb-2">
            {offeringDetails.offeringName}
          </h5>
          <p className="text-[#610b15] text-base font-medium mb-4">
            {offeringDetails.offeringDescription}
          </p>
          <p className="text-gray-700 font-normal text-base mb-4">
            {offeringDetails.offeringType + ", " + offeringDetails.cuisineType}
          </p>
          <p className="text-[#610b15] text-[13px] text-base">
            ${offeringDetails.offeringPrice} /per item
          </p>
          <div className="flex flex-row h-10 w-1/5 rounded-lg relative bg-transparent mt-4">
            {getCartCount() == 0 && (
              <button
                className=" bg-[#d36a19] text-white  h-full w-20 cursor-pointer outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddCart();
                }}
              >
                ADD
              </button>
            )}

            {getCartCount() > 0 && (
              <div className="flex flex-row h-10 w-4/5 rounded-lg relative bg-transparent mt-1">
                <button
                  data-action="decrement"
                  className=" bg-[#d36a19] text-white hover:bg-[#d36a19] h-full w-20 rounded-l cursor-pointer outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement();
                  }}
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <p className="text-center bg-[#d36a19] font-semibold flex items-center text-white">
                  {getCartCount()}
                </p>
                <button
                  data-action="increment"
                  className="bg-[#d36a19] text-white hover:bg-[#d36a19] h-full w-20 rounded-r cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrement();
                  }}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProviderOfferingCard;
