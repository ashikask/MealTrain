import { Fragment, useEffect } from "react";
import OrderCard from "../order/OrderCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../store/provider-orders-actions.js";
import { useState } from "react";
import ProviderLoaderCard from "./../utility/ProviderLoaderCard.js";

function OrderLayout({ showLoader, setShowLoader }) {
  var isNewOrders = true;
  var isOrdersInProgress = true;
  const loggedInUser = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.providerOrders.orders);
  const providerId = useSelector(
    (state) => state.userProfileReducer.user.providerId
  );
  const newOrders = orders.filter((order) => order.status == "NEW");

  const ongoingOrders = orders.filter(
    (order) => order.status != "NEW" && order.status != "DELIVERED"
  );

  const pastOrders = orders.filter((order) => order.status == "DELIVERED");

  if (ongoingOrders.length == 0) {
    isOrdersInProgress = false;
  }

  if (newOrders.length == 0) {
    isNewOrders = false;
  }

  if (orders != undefined) {
    setShowLoader(false);
  }

  useEffect(() => {
    if (typeof providerId !== "undefined") {
      setShowLoader(false);
      dispatch(fetchOrders({ id: loggedInUser.id, providerId }));
    }
  }, [dispatch, providerId]);

  useEffect(() => {}, [ongoingOrders, newOrders]);

  return (
    <Fragment>
      {showLoader && <ProviderLoaderCard />}
      {!showLoader && (
        <div>
          <h1 className="text-[30px] pl-[6%] pt-[3%] bg-white">Your Orders</h1>
          <div className="pl-[7%] mt-[1%] grid grid-rows-[80px, 1fr, 1fr] maxW=[80%] pr-[7%]">
            <div className="mt-2">
              <h2 className="mt-[1%] p-2 text-[27px] font-semibold">
                {/* border-b-[1px] border-[#1d3557] */}
                New Order
              </h2>
              <div>
                {isNewOrders &&
                  newOrders.map((order) => (
                    <OrderCard key={order._id} orderDetails={order}></OrderCard>
                  ))}
                {!isNewOrders && (
                  <p className="pt-[23px] pl-[3%] italic font-normal text-[20px]">
                    No New Orders yet
                  </p>
                )}
                {/* card goes inside */}
              </div>
            </div>
            <div className="mt-2">
              <h2 className="mt-[4%] mb-[2%] p-2 text-[27px] font-semibold">
                {/* border-b-[1px] border-[#1d3557] */}
                Ongoing
              </h2>
              <div>
                {isOrdersInProgress &&
                  ongoingOrders.map((order) => (
                    <OrderCard key={order._id} orderDetails={order}></OrderCard>
                  ))}
                {!isOrdersInProgress && (
                  <p className="pl-[3%] italic font-normal text-[20px]">
                    You are all Done! No Ongoing Orders
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <h2 className="mt-[2%] mb-[2%] p-2 text-[27px] font-semibold">
                {/* border-b-[1px] border-[#1d3557] */}
                Past
              </h2>
              <div>
                {pastOrders.map((order) => (
                  <OrderCard key={order._id} orderDetails={order}></OrderCard>
                ))}

                {/* card goes inside */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default OrderLayout;
