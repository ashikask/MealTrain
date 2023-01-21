import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteOffering } from "../../store/provider-offering-actions.js";
import { useSelector } from "react-redux";
import { providerOfferingsModalActions } from "./../../store/provider-offering-modal-slice.js";
function OfferingCard({ offeringDetails }) {
  const providerId = useSelector((state) => state.userProfileReducer.user.providerId);
  const loggedInUser = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  function handleDelete() {
    const deleteOfferingParams = {
      providerId: providerId,
      offering: offeringDetails,
      id:loggedInUser.id
    };
    dispatch(deleteOffering(deleteOfferingParams));
  }
  function handleEdit() {
    dispatch(providerOfferingsModalActions.setOfferingDetails(offeringDetails));
    dispatch(providerOfferingsModalActions.setIsOpen(true));
  }

  return (
    <Card
      zIndex={10}
      mt="2%"
      mb="0.5%"
      direction="row"
      overflow="hidden"
      variant="elevated"
      w="100%"
      className="p-[5px] border-[1px]"
      bg="#FFFFFF"
      boxShadow="2xl"
    >
      <Image
        objectFit="cover"
        maxW="25%"
        className="rounded-1"
        borderRadius="4"
        src={`${offeringDetails.offeringImage}`}
      />

      <Stack className="w-full">
        <CardBody>
          <Heading size="md" className="mb-3 text-sm pb">
            {offeringDetails.offeringName}
          </Heading>
          <span className="mx-1 px-3 py-2 bg-[#dadee0]/50 rounded-full text-[13px] font-semibold">
            {offeringDetails.offeredAt}
          </span>
          <span className="mx-1 px-3 py-2 bg-[#dadee0]/50 rounded-full font-semibold text-[13px]">
            {offeringDetails.offeringType}
          </span>
          <span className="mx-1 px-3 py-2 bg-[#dadee0]/50 rounded-full font-semibold text-[13px]">
            {offeringDetails.cuisineType}
          </span>
          <span className="mx-1 px-3 py-2 bg-[#dadee0]/50 rounded-full font-semibold text-[13px]">
            Price : ${offeringDetails.offeringPrice}
          </span>

          <Text p="2" className="mt-2 font-light font-normal text-normal">
            {offeringDetails.offeringDescription}
          </Text>
        </CardBody>

        <CardFooter className="flex flex-row-reverse">
          <button
            onClick={handleDelete}
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:ring-red-900"
          >
            <div className="flex flex-nowrap">
              <AiFillDelete color="white" size={17} />
              <p className="px-2">Delete</p>
            </div>
          </button>
          <button
            onClick={handleEdit}
            type="button"
            className="text-white bg-orange-500 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-orange-500 dark:hover:bg-orange-500 dark:ring-orange-800"
          >
            <div className="flex flex-nowrap">
              <MdEdit size={16} color="white"></MdEdit>
              <p className="px-2">Edit</p>
            </div>
          </button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
export default OfferingCard;
