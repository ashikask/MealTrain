import ProgressTracker from "./ProgressTracker";
import { Box, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../store/provider-orders-actions.js";
import { useSelector } from "react-redux";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
function OrderCard(props) {
  const orders = useSelector((state) => state.providerOrders.orders);
  var orderDetails = props.orderDetails;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(orderDetails.status);
  var currentStatusInDropDown = null;
  const [canChangeStatus, setCanChangeStatus] = useState(
    orderDetails.status != "DELIVERED"
  );
  const date = orderDetails.orderPlacedDate.split("T");

  function handleChange(e) {
    currentStatusInDropDown = e.target.value;
  }

  function handleUpdateStatus() {
    //update in Database as well
    const updatedOrderDetails = {
      ...orderDetails,
      status: currentStatusInDropDown,
    };

    const updateDetails = {
      orderId: updatedOrderDetails._id,
      providerId: updatedOrderDetails.providerId,
      order: updatedOrderDetails,
    };
    dispatch(updateOrderStatus(updateDetails));
    if (updatedOrderDetails.status == "DELIVERED") {
      console.log("inside if condition");
      setCanChangeStatus(false);
    }
    //setStatus(currentStatusInDropDown);
  }

  return (
    <div className=" border-[0.5px] grid grid-cols-4 border-5 border-black rounded-[12px] p-[20px] mt-[2.5%] pb-[25px] shadow-xl mb-[2%]">
      <div className="border-r-[1px] border-[#a0acbe] pl-[20%]">
        <div className="p-5">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1780&q=80"
            alt="image"
            className="object-cover w-40 rounded-full"
          ></img>
        </div>
      </div>

      <div className="col-span-2 justify-self-center pt-[3%] font-normal text-[15px]">
        {/* Order details
        {orderDetails.orderPlacedDate}
        // {/* {orderDetails.orderSummary} //
        {orderDetails.paymentMethod}
        {orderDetails.studentId}
        <div>Student Name {orderDetails.studentId}</div>
        <div>
          {/* <h3>Order Items {orderDetails.orderItems}</h3> //
          <div>
            <div>Order Item 1</div>
            <div>Order Item 2</div>
            <div>Order Item 3</div>
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-8">
          <div className="col-start-1 col-end-2 font-bold">
            Order ID: {orderDetails._id}
          </div>
          <div className="col-start-2 col-end-3 flex flex-row-reverse">
            Ordered at:
            {` ${date[0]}`}
          </div>
          <div className="col-start-1 col-end-3">
            <div className="flex border-b pb-2 border-[#d36a19]">
              <h3 className="pl-[10px] font-bold text-gray-600 text-xs uppercase w-1/3">
                Item
              </h3>

              <h3 className="font-bold  text-gray-600 text-xs uppercase w-1/3 text-center">
                Quantity
              </h3>

              <h3 className="pr-[10px] flex flex-row-reverse font-bold text-gray-600 text-xs uppercase w-1/3 text-center">
                Price
              </h3>
            </div>
            <div className="border-b border-[#e9bf9e]">
              {orderDetails.orderItems.map((orderItem) => (
                <div key={orderItem._id} className="flex">
                  <span className="pl-[10px] flex w-1/2 md: my-4 title-font font-semiboldtext-base text-gray-900 justify-between">
                    <p> {orderItem.offeringName} </p>
                  </span>
                  <p className=" flex w-1/3 text-center font-semibold items-center mx-5 text-gray-700">
                    ×{orderItem.offeringQuantity}
                  </p>

                  <span className="pr-[10px] flex flex-row-reverse w-1/4 my-4 title-font font-medium text-base text-gray-900">
                    <p>
                      $
                      {orderItem.offeringQuantity == 0
                        ? orderItem.offeringPrice
                        : orderItem.offeringQuantity * orderItem.offeringPrice}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-start-1 col-end-2">
            <div className="flex flex-row items-center">
              <div>
                Paid by:
                <i>
                  {` ${orderDetails.paymentMethod}`}
                  <span></span>
                </i>
              </div>
              <div className="px-[5px]">
                <MdVerified color="green" />
              </div>
            </div>
          </div>
          <div className="font-bold col-start-2 col-end-3 flex flex-row-reverse pr-[8px]">
            Total: ${orderDetails.totalPrice}
          </div>
        </div>
      </div>

      <div className="border-l-[1px] border-[#a0acbe] justify-self-center pl-[5%] pt-[3%]">
        <div className="p-[20px] font-semibold ">
          {canChangeStatus && (
            <div>
              <p className="mb-6"> Change status here</p>
              <div>
                <label htmlFor="Selector" className="sr-only">
                  Status Selector
                </label>
                {/* <select
              id="underline_select"
              value="NEW"
              // onChange={handleChange}
              className="block py-2.5 px-0 w-[100%] text-sm text-gray-700 bg-transparent border-b-[1px] border-gray-100 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:border-gray-200 peer"
            >
              <option selected>Change Status</option>
              <option value="ORDER_ACCEPTED">Accept Order</option>
              <option value="ORDER_PROCESSING">Order Processing</option>
              <option value="ORDER_COMPLETE">Order Complete</option>
              <option value="DELIVERED">Order Delivered</option>
            </select> */}

                <Select
                  placeholder="Change Status"
                  className="font-normal"
                  onChange={handleChange}
                >
                  <option value="ORDER_ACCEPTED">Accept Order</option>
                  <option value="ORDER_PROCESSING">Order Processing</option>
                  <option value="ORDER_COMPLETE">Order Complete</option>
                  <option value="DELIVERED">Order Delivered</option>
                </Select>
              </div>

              <div>
                <Box
                  className="mt-8 p-2"
                  as="button"
                  color="white"
                  fontWeight="bold"
                  borderRadius="md"
                  bg="orange.500"
                  // bgGradient="linear(to-r, teal.500, green.500)"
                  _hover={{
                    //   bgGradient: "linear(to-r, red.500, yellow.500)",
                    bg: "orange.400",
                  }}
                >
                  <div onClick={handleUpdateStatus}>Update Status</div>
                </Box>
              </div>
            </div>
          )}

          {!canChangeStatus && (
            <div className="flex flex-row justify-items-center items-center pl-[23%] pt-[24%]">
              <div className="">
                <IoCheckmarkDoneCircle size={55} color="orange" />
              </div>
              <div className="text-[25px]">Complete</div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-4 mt-[20px]">
        <ProgressTracker status={orderDetails.status}></ProgressTracker>
      </div>
    </div>
  );
}
export default OrderCard;
