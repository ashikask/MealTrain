import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  Stack,
  RadioGroup,
  Select,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { addOffering } from "../../store/provider-offering-actions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { providerOfferingsModalActions } from "../../store/provider-offering-modal-slice.js";
import { updateOffering } from "./../../store/provider-offering-actions.js";
import { imageUpload } from "./../../utility/s3-util.js";

function EditOfferingModal({ initialRef, isOpen, onClose }) {
  const dispatch = useDispatch();
  const providerId = useSelector(
    (state) => state.userProfileReducer.user.providerId
  );
  var offeringDetails = useSelector(
    (state) => state.providerOfferingModal.offeringDetails
  );
  const loggedInUser = useSelector((state) => state.authReducer.user);

  var modalFieldsinitial = {
    offeringImage: "",
    cuisineType: "",
    offeringType: "",
    offeredAt: "",
    offeringName: "",
    offeringDescription: "",
    offeringPrice: "",
  };

  const [modalFields, setModalFields] = useState(modalFieldsinitial);

  useEffect(() => {
    try {
      setModalFields({
        offeringImage: offeringDetails.offeringImage,
        cuisineType: offeringDetails.cuisineType,
        offeringType: offeringDetails.offeringType,
        offeredAt: offeringDetails.offeredAt,
        offeringName: offeringDetails.offeringName,
        offeringDescription: offeringDetails.offeringDescription,
        offeringPrice: offeringDetails.offeringPrice,
      });
    } catch (e) {
      console.log(e);
    }
  }, [offeringDetails]);

  async function handleUpdate() {
    var updatedOfferingDetails;
    if (typeof modalFields.offeringImage === "string") {
      updatedOfferingDetails = {
        ...offeringDetails,
        ...modalFields,
        offeringImage: offeringDetails.offeringImage,
      };
    } else {
      modalFields.offeringImage = await imageUpload(modalFields.offeringImage);
      updatedOfferingDetails = { ...offeringDetails, ...modalFields };
    }

    const updatedOfferingParams = {
      providerId: providerId,
      updatedOfferingDetails,
      userAccountId:loggedInUser.id
    };
    dispatch(providerOfferingsModalActions.setIsOpen(false));
    dispatch(updateOffering(updatedOfferingParams));
  }

  function handleChange(e) {
    setModalFields({ ...modalFields, [e.target.name]: e.target.value });
  }
  function handleChangeOfferingImage(e) {
    setModalFields({
      ...modalFields,
      offeringImage: e.target.files[0],
    });
    // modalFields.offeringImage = e.target.value;
  }
  function handleChangeCusineType(e) {
    setModalFields({
      ...modalFields,
      cuisineType: e.target.value,
    });
    // modalFields.cuisineType = e.target.value;
  }
  function handleChangeOfferingType(e) {
    setModalFields({
      ...modalFields,
      offeringType: e.target.value,
    });
    //modalFields.offeringType = e.target.value;
  }
  function handleChangeOfferedAt(value) {
    setModalFields({
      ...modalFields,
      offeredAt: value,
    });
    // modalFields.offeredAt = value;
  }
  function handleChangeOfferingName(e) {
    setModalFields({
      ...modalFields,
      offeringName: e.target.value,
    });
    // modalFields.offeringName = e.target.value;
  }
  function handleChangeOfferingDescription(e) {
    setModalFields({
      ...modalFields,
      offeringDescription: e.target.value,
    });
    //modalFields.offeringDescription = e.target.value;
  }
  function handleChangeOfferingPrice(e) {
    setModalFields({
      ...modalFields,
      offeringPrice: e.target.value,
    });
    //modalFields.offeringPrice = e.target.value;
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      //finalFocusRef={finalRef}
      size={"lg"}
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={true}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit an Offering</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl className="grid grid-cols-2 items-center" isRequired>
            <div>
              <FormLabel>Name</FormLabel>
            </div>
            <div>
              <Input
                value={modalFields.offeringName}
                onChange={handleChangeOfferingName}
                ref={initialRef}
                placeholder="Offering Title"
              />
            </div>
          </FormControl>

          <FormControl className="grid grid-cols-2" mt={4} isRequired>
            <div>
              <FormLabel>Price</FormLabel>
            </div>
            <div>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  value={modalFields.offeringPrice}
                  onChange={handleChangeOfferingPrice}
                  placeholder="price"
                />
              </InputGroup>
            </div>
          </FormControl>

          <FormControl className="grid grid-cols-2" mt={4} isRequired>
            <div>
              <FormLabel>Offered at</FormLabel>
            </div>
            <div>
              {/* <Input
                  onChange={handleChangeOfferingDescription}
                  placeholder="ie. breakfast..."
                /> */}
              <RadioGroup
                value={modalFields.offeredAt}
                onChange={handleChangeOfferedAt}
              >
                <Stack direction="row">
                  <Radio value="Breakfast">Breakfast</Radio>
                  <Radio value="Lunch">Lunch</Radio>
                  <Radio value="Dinner">Dinner</Radio>
                </Stack>
              </RadioGroup>
            </div>
          </FormControl>

          <FormControl className="grid grid-cols-2" mt={4} isRequired>
            <div>
              <FormLabel>Offering Type</FormLabel>
            </div>
            <div>
              {/* <Input
                  onChange={handleChangeOfferingDescription}
                  placeholder="i.e veg, non-veg"
                /> */}
              <Select
                placeholder="Select option"
                value={modalFields.offeringType}
                onChange={handleChangeOfferingType}
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </Select>
            </div>
          </FormControl>

          <FormControl className="grid grid-cols-2" mt={4} isRequired>
            <div>
              <FormLabel>Cusine Type</FormLabel>
            </div>
            <div>
              <Input
                value={modalFields.cuisineType}
                onChange={handleChangeCusineType}
                placeholder="i.e Asian"
              />
            </div>
          </FormControl>
          <FormControl className="grid grid-cols-2" mt={4} isRequired>
            <div>
              <FormLabel>image URL</FormLabel>
            </div>
            <div>
              {/* <Input
                value={modalFields.offeringImage}
                onChange={handleChangeOfferingImage}
                placeholder="Image url"
              /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeOfferingImage}
              ></input>
            </div>
          </FormControl>

          <FormControl className="grid grid-cols-2" mt={4} isRequired>
            <div>
              <FormLabel>Description</FormLabel>
            </div>
            <div>
              <Textarea
                onChange={handleChangeOfferingDescription}
                value={modalFields.offeringDescription}
                placeholder="Enter the offering description"
              />
            </div>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleUpdate} colorScheme="orange" mr={3}>
            Update Offering
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditOfferingModal;
