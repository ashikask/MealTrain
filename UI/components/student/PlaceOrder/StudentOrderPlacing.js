//import Image from "next/image";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { studentCartActions } from "./../../../store/student-cart-slice.js";
import { placeOrder } from "./../../../store/student-order-placing-actions.js";
import { fetchProvider } from "../../../store/student-provider-info-actions.js";
import StudentOrderList from "./StudentOrderList.js";
import LoaderCard from "./LoaderCard";
import Router from "next/router";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Link,
  Center,
  position,
  Divider,
  Image,
  Heading,
  Color,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { getFontDefinitionFromManifest } from "next/dist/server/font-utils.js";

export default function StudentOrderPlacing({ providerData }) {
  const router = useRouter();
  const { status } = router.query;

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  var orderStatus = "";
  const dispatch = useDispatch();
  const providerInfo = useSelector(
    (state) => state.studentProviderInfo.providerInfoCart
  );
  const cartInfo = useSelector((state) => state.studentCartInfo.cartInfo);

  const studentId = useSelector(
    (state) => state.userProfileReducer.user.studentId
  );

  const placingOrderDetails = useSelector(
    (state) => state.studentCartInfo.placingOrderDetails
  );

  function getItem() {
    const item = {
      name: "MEAL TRAIN",
      description: "Place the order",
      image:
        "https://pyxis.nymag.com/v1/imgs/8c7/68b/0b742d483e483bf5f547faa34f98c91d23-15-saravana-bhavan.rsquare.w700.jpg",
      quantity: 1,
      price: cartInfo.cartTotal,
    };
    return item;
  }
  const orderInfo = {
    status: "NEW",
    paymentMethod: "cash",
    providerId:
      providerData.providerID == undefined
        ? placingOrderDetails.providerID
        : providerData.providerID,
    providerName:
      providerData.providerShopName == undefined
        ? placingOrderDetails.providerShopName
        : providerData.providerShopName,
    providerImage:
      providerData.businessImageURL == undefined
        ? placingOrderDetails.businessImageURL
        : providerData.businessImageURL,
    studentId: studentId,
    orderItems: cartInfo.cartItem,
    totalPrice: cartInfo.cartTotal,
  };
  console.log("outside useeffect");
  console.log(orderInfo);
  useEffect(() => {
    console.log("inside useeffect");
    console.log(orderInfo);
    if (status != "success") {
      console.log("not sucess");
      dispatch(studentCartActions.replaceProviderOrderDetail(orderInfo));
    }

    if (status == "success") {
      onOpen();
    }
  }, [status]);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);
    console.log(getItem());
    const stripe = await stripePromise;
    const checkoutSession = await axios
      .post("/api/create-stripe-session", {
        item: getItem(),
      })
      .then(function (response) {
        const result = stripe.redirectToCheckout({
          sessionId: response.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    setLoading(false);
  };

  function onPlaceOrderHandler() {
    console.log(placingOrderDetails);
    const orderParams = {
      studentId: studentId,
      orderData: placingOrderDetails,
    };
    dispatch(placeOrder(orderParams)).then((res) => {
      onOpen();
    });
    // dispatch(studentCartActions.deleteAllCart(orderParams));
    // onOpen();
  }

  function onPlacePaymentOrderHandler() {
    console.log(placingOrderDetails);
    const orderParams = {
      studentId: studentId,
      orderData: {
        ...placingOrderDetails,
        paymentMethod: "payment",
      }
    };
    dispatch(placeOrder(orderParams)).then((res) => {
      createCheckOutSession();
    });
    // dispatch(studentCartActions.deleteAllCart(orderParams));

    // onOpen();
  }

  function onOrderSucess() {
    Router.push("/student/orders");
  }

  function onPaymentSucess() {
    Router.push("/auth/login");
  }

  function goToMain() {
    Router.push("/student/");
  }
  return (
    <div>
      {/* {
        status && status === "success" && onPlaceOrderHandler()
        // <div className="bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700">
        //   Payment Successful
        // </div>
      } */}
      {status && status === "cancel" && (
        <div className="bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700">
          Payment Unsuccessful
        </div>
      )}

      {loading && <LoaderCard></LoaderCard>}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign={"center"}>
          <Image
            borderRadius="6px"
            maxW="container"
            src="https://thepointsguy.global.ssl.fastly.net/us/originals/2022/06/GettyImages-1316145932-scaled.jpg"
          />
          <Divider />
          <Text className="absolute text-7xl text-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-Pacifico ">
            MealTrain
          </Text>
          <ModalHeader p="5px">Order Placed Successfully</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text className="font-Roboto">Now sit back and relax</Text>
            <Text className="font-Roboto">while we prepare your order</Text>
          </ModalBody>
          <Divider />
          <ModalFooter justifyContent="center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                status == "success" ? onPaymentSucess() : onOrderSucess();
              }}
              colorScheme="red"
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!loading && (
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b-4 pb-8 border-[#d36a19]">
                <h1 className="font-semibold text-2xl">Items Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {cartInfo.cartItem.length} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5 border-b pb-2 border-[#d36a19]">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              {cartInfo.cartItem.map((cartItem) => (
                <StudentOrderList
                  key={cartItem._id}
                  cartInfo={cartItem}
                ></StudentOrderList>
              ))}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToMain();
                }}
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </button>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10 bg-[#fde68a]">
              <h1 className="font-semibold text-2xl border-b pb-8 border-[#d36a19]">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  {cartInfo.cartItem.length} Items
                </span>
                <span className="font-semibold text-sm">
                  {cartInfo.cartTotal}.00 $
                </span>
              </div>
              {/* <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Tax</span>
                <span className="font-semibold text-sm">3.00 $</span>
              </div>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Packing Charges
                </span>
                <span className="font-semibold text-sm">1.00 $</span>
              </div> */}

              <div className="border-t border-[#d36a19] mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>{cartInfo.cartTotal}.00 $</span>
                </div>
                <button
                  className="bg-[#610b15] rounded-lg font-semibold hover:bg-[#d36a19] py-3 text-sm text-white uppercase w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    orderStatus = "cash";
                    onPlaceOrderHandler();
                  }}
                >
                  Cash On Delivery
                </button>
                <button
                  className="bg-[#610b15] my-5 rounded-lg font-semibold hover:bg-[#d36a19] py-3 text-sm text-white uppercase w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    orderStatus = "payment";
                    onPlacePaymentOrderHandler();
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
