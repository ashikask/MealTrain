import { useSelector, useDispatch } from "react-redux";
import ProviderOfferingCard from "./ProviderOfferingCard";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Button,
} from "@chakra-ui/react";

function ProviderOfferInfo({ providerOfferInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(providerOfferInfo);
  return (
    <div className="height-[1vh]">
      <div className="px-5 py-5 mx-auto">
        <div className="lg:w-full mx-auto flex flex-wrap sticky">
          <img
            alt="ecommerce"
            className="lg:w-1/3 w-full lg: h-64 object-cover object-center rounded"
            // src="./../provider_image2.png"
            src={providerOfferInfo.businessImageURL}
          />
          <div className="lg:w-2/3 w-full lg:pl-10 mt-6 lg:mt-0">
            <h1 className="text-[#610b15] font-bold text-3xl title-font font-medium mb-1">
              {providerOfferInfo.providerShopName}
            </h1>
            <h2 className="text-sm title-font text-[#610b15] tracking-widest">
              {providerOfferInfo.shortDescription}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-[#d36a19]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-[#d36a19]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-[#d36a19]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-[#d36a19]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-[#d36a19]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-[#d36a19] space-x-2s">
                <img
                  alt="ecommerce"
                  className="lg:w-6 lg: h-6"
                  src="/phone.png"
                />
                <h2 className="text-sm title-font text-gray-500 tracking-widest md: mx-2">
                  {providerOfferInfo.phoneNumber}
                </h2>
              </span>
            </div>
            <div className="flex">
              <span className="flex my-4 title-font font-medium text-2xl text-gray-900">
                <img
                  alt="ecommerce"
                  className="lg:w-5 lg: h-5"
                  src="/location.png"
                />
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {providerOfferInfo.address_streetName},{" "}
                  {providerOfferInfo.address_city}
                </h2>
              </span>

              <button
                onClick={onOpen}
                className="flex text-[12px] items-center ml-2 bg-[#610b15] hover:bg-[#d36a19] text-white border-0 my-2 py-1 px-4 focus:outline-none hover:bg-orange-500 rounded"
              >
                View On Map
              </button>
            </div>
            <p className="md: my-4 leading-relaxed text-[#610b15]">
              {providerOfferInfo.description}
            </p>
          </div>
        </div>
      </div>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex flex-row-reverse"></ModalHeader>
          <ModalBody>
            <iframe
              width="100%%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
            ></iframe>

            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCp2HqnxVNILYQCJfVijRdZR_4HPPs2TEo
                &q=${providerOfferInfo?.address_aptNo} ${providerOfferInfo?.address_streetName} ${providerOfferInfo?.address_city} ${providerOfferInfo?.address_state} ${providerOfferInfo?.address_zip}`}
            ></iframe>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} className="m-auto" colorScheme="red">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default ProviderOfferInfo;
