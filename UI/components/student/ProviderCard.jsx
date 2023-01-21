import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Icon,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
export function ProviderCard({ details }) {
  console.log(details);
  const data = {
    providerShopName: details.provider.name,
    businessImageURL: details.provider.businessImage,
    phoneNumber: details.providerDetails.phoneNumber,
    address_aptNo: details.providerDetails.address.aptNo,
    address_streetName: details.providerDetails.address.streetName,
    address_city: details.providerDetails.address.city,
    address_state: details.providerDetails.address.state,
    address_zip: details.providerDetails.address.zipcode,
    tags: "South Indian",
    about_text: details.provider.description,
  };
  function getData() {
    return {
      businessImageURL: data.businessImageURL,
      providerDescription: data.about_text,
      providerShopName: details.provider.name,
      phoneNumber: details.providerDetails.phoneNumber,
      address_aptNo: details.providerDetails.address.aptNo,
      address_streetName: details.providerDetails.address.streetName,
      address_city: details.providerDetails.address.city,
      address_state: details.providerDetails.address.state,
      address_zip: details.providerDetails.address.zipcode,
      description: details.provider.description,
      shortDescription: details.provider.shortDescription,
      providerID: details.provider._id,
    };
  }
  return (
    <Link
      href={{
        pathname: `student/${details.provider._id}`,
        query: getData(),
      }}
    >
      <Card
        maxW="100%"
        bg="white"
        p="0"
        h="490px"
        className="m-[3%]  mx-[3%] hover:bg-[#eee1c7]"
        boxShadow="xl"
      >
        <CardBody>
          <Image
            h="200px"
            w="500px"
            src={data.businessImageURL}
            alt="Image"
            borderRadius="md"
            objectFit="cover"
            mx="auto"
          />
          {/* <HStack mt="5" spacing="2">
            <Tag variant="outline">
              min ${details.provider.minOfferingPrice}
            </Tag>
          </HStack> */}
          <Heading my="4" size="md" className="text-[15px]">
            {details.provider.name}
          </Heading>
          <Text my="2" size="sm" color="grey">
            <Icon as={MdLocationOn} boxSize="5" color="rgb(212, 106, 25)" />
            {+data.address_aptNo +
              " " +
              data.address_streetName +
              ", " +
              data.address_city +
              ", " +
              data.address_state +
              " " +
              data.address_zip}
          </Text>
          <Text className="text-lg font-Inter text-[14px]">
            {data.about_text}
          </Text>
        </CardBody>
        <Divider />
      </Card>
    </Link>
  );
}
