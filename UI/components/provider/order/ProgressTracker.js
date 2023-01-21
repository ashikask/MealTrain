import classes from "./ProgressTracker.module.scss";
import { Progress } from "@chakra-ui/react";
import { useState } from "react";

function ProgressTracker(props) {
  //const [orderStatus, setOrderStatus] = useState(0);

  const status = props.status;
  var color = "yellow";
  let orderStatus = 5;
  if (status == "NEW") {
    orderStatus = 5;
  } else if (status == "ORDER_ACCEPTED") {
    orderStatus = 30;
  } else if (status == "ORDER_PROCESSING") {
    orderStatus = 50;
  } else if (status == "ORDER_COMPLETE") {
    orderStatus = 70;
  } else if (status == "DELIVERED") {
    orderStatus = 100;
    color = "yellow";
  }

  return (
    <div className="p-[10px] grid grid-cols-5 justify-items-strech  text-normal font-semibold">
      <div className="justify-self-start">Order Recieved</div>
      <div className="justify-self-center">Order Accepted</div>

      <div className="justify-self-center">Order Processing</div>
      <div className="justify-self-center">Order Complete</div>
      <div className="justify-self-end">Order Delivered</div>
      <div className="col-span-5 w-[100%] justify-self-center mt-2">
        <Progress
          className="rounded-[10px] mt-[10px] text-[#D46A19]"
          value={orderStatus}
          size="sm"
          colorScheme={color}
        />
      </div>
    </div>
  );
}

export default ProgressTracker;
