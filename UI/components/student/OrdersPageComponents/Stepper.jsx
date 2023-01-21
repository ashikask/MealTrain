import { Step, Steps } from "chakra-ui-steps";
import { Flex } from "@chakra-ui/react";

const steps = [
  { label: "Order Recieved" },
  { label: "Order Accepted" },
  { label: "Order Processing" },
  { label: "Order Complete" },
  { label: "Order Delivered" },
];

const dummyData = {
  orderStatus: 2,
};

export const Stepper = ({status}) => {
  var orderStatus;
  switch (status) {
    case "NEW":
      orderStatus = 1;
      break;
    case "ORDER_ACCEPTED":
      orderStatus = 2;
      break;
    case "ORDER_PROCESSING":
      orderStatus = 3;
      break;
    case "ORDER_COMPLETE":
      orderStatus = 4;
      break;
    case "DELIVERED":
      orderStatus = 5;
      break;
    default:
  }
  return (
    <Flex flexDir="column" width="100%" p="10px">
      <Steps activeStep={orderStatus}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};
