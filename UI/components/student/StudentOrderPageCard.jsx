import {
  Text,
  Card,
  Tag,
  Image,
  Grid,
  Divider,
  Box,
  Spacer,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Progress,
  Flex,
  Badge,
  ProgressLabel,
} from "@chakra-ui/react";
import classes from "./../provider/order/ProgressTracker.module.scss";
import ProgressTracker from "./../provider/order/ProgressTracker";
import { Stepper } from "./OrdersPageComponents/Stepper";

export function StudentOrderPageCard({ order }) {
  function getFormatedDate() {
    const date = new Date(order.orderPlacedDate);

    return date.toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const status = order.status;
  var color = "yellow";
  if (status == "NEW") {
    color = "yellow";
  } else if (status == "ORDER_ACCEPTED") {
    color = "orange";
  } else if (status == "ORDER_PROCESSING") {
    color = "blue";
  } else if (status == "ORDER_COMPLETE") {
    color = "red";
  } else if (status == "DELIVERED") {
    color = "green";
  }

  return (
    <Card
      variant="elevated"
      py="15"
      px="2"
      bg="white"
      ml="20"
      mr="20"
      mt="10"
      mb="10"
      boxShadow="2xl"
    >
      <CardBody>
        <Box className="flex flex-row w-full pb-6 border-b ">
          <Image
            className="rounded-[10px]"
            objectFit="cover"
            maxW={{ base: "100%", sm: "280px" }}
            src={order.providerImage}
            alt={order.providerName}
          />
          <div className="px-5 w-full">
            <Stack justifyContent="space-between">
              <Box className="flex flex-row justify-between ">
                <div className="font-bold text-[20px]">
                  {order.providerName}
                </div>
                {order.status == "NEW" && (
                  <Badge
                    className="text-center drop-shadow-md"
                    colorScheme="green"
                    borderRadius="8px"
                    py="7px"
                    px="10px"
                  >
                    {order.status}
                  </Badge>
                )}
              </Box>
            </Stack>
            <Stack
              flex={1}
              flexDirection="column"
              justifyContent="left"
              alignItems="left"
              p={1}
              pt={2}
            >
              <Box className="flex">
                <Text
                  textAlign={"left"}
                  className="text-sm border-r-[1.5px] border-black pr-3 font-normal text-[16px]"
                >
                  Order #{order._id}
                </Text>
                <Text
                  textAlign={"left"}
                  className="text-sm px-3 font-normal text-[16px]"
                >
                  {getFormatedDate()}
                </Text>
              </Box>
              <Box className="py-4 border px-4">
                <div className="flex flex-row flex-nowrap">
                  <div className="flex w-1/2 font-semibold text-[#b15e2e]">
                    Item
                  </div>
                  <div className="flex w-4/4 font-semibold text-[#b15e2e]">
                    Price
                  </div>
                </div>
                {order.orderItems.map((orderItem) => (
                  <div key={orderItem._id} className="flex w-full ">
                    <span className="flex w-1/2 title-font font-medium text-base text-gray-900">
                      <p className="text-[15px]">
                        {" "}
                        {orderItem.offeringName} x {orderItem.offeringQuantity}
                      </p>
                    </span>
                    <span className="flex w-4/4 title-font font-medium text-base text-gray-900">
                      <p className="text-[15px]">
                        {" "}
                        $
                        {orderItem.offeringQuantity == 0
                          ? orderItem.offeringPrice
                          : orderItem.offeringQuantity *
                            orderItem.offeringPrice}
                      </p>
                    </span>
                  </div>
                ))}
              </Box>
              <Text
                textAlign={"left"}
                className="flex  w-4/4 flex-row-reverse text-sm pr-3 text-[#d36a19]"
              >

                Total Paid: ${order.totalPrice}
              </Text>
            </Stack>
          </div>
        </Box>
      </CardBody>

      <div className="col-span-4 ">
        <Stepper status={order.status} />
      </div>
    </Card>
  );
}
