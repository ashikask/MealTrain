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
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { addOffering } from "../../store/provider-offering-actions.js";
import { useDispatch, useSelector } from "react-redux";
// import { config } from "./../../service/storeToS3.js";
import { imageUpload } from "./../../utility/s3-util.js";
function CreateOfferingModal({ initialRef, isOpen, onClose }) {
  const providerId = useSelector(
    (state) => state.userProfileReducer.user.providerId
  );

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authReducer.user);

  var modalFields = {
    offeringImage: "",
    cuisineType: "",
    offeringType: "",
    offeredAt: "",
    offeringName: "",
    offeringDescription: "",
    offeringPrice: "",
  };
  async function handleSave() {
    if (modalFields.offeringImage !== "") {
      modalFields.offeringImage = await imageUpload(modalFields.offeringImage);
    } else {
      delete modalFields.offeringImage;
    }
    const addOfferingParams = {
      providerId: providerId,
      offering: modalFields,
      userAccountId:loggedInUser.id
    };

    // function handleUpdate() {}
    dispatch(addOffering(addOfferingParams));
    onClose();
  }

  function handleChangeOfferingImage(e) {
    modalFields.offeringImage = e.target.files[0];
  }
  function handleChangeCusineType(e) {
    modalFields.cuisineType = e.target.value;
  }
  function handleChangeOfferingType(e) {
    modalFields.offeringType = e.target.value;
  }
  function handleChangeOfferedAt(value) {
    modalFields.offeredAt = value;
  }
  function handleChangeOfferingName(e) {
    modalFields.offeringName = e.target.value;
  }
  function handleChangeOfferingDescription(e) {
    modalFields.offeringDescription = e.target.value;
  }
  function handleChangeOfferingPrice(e) {
    modalFields.offeringPrice = e.target.value;
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
        <ModalHeader>Create an Offering</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl
            className="grid grid-cols-2 content-center"
            isRequired="true"
          >
            <div>
              <FormLabel>Name</FormLabel>
            </div>
            <div>
              <Input
                onChange={handleChangeOfferingName}
                ref={initialRef}
                placeholder="Offering Title"
              />
            </div>
          </FormControl>

          <FormControl
            className="grid grid-cols-2 content-center"
            mt={4}
            isRequired
          >
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
                  onChange={handleChangeOfferingPrice}
                  placeholder="price"
                />
              </InputGroup>
            </div>
          </FormControl>

          <FormControl
            className="grid grid-cols-2 content-center"
            mt={4}
            isRequired
          >
            <div>
              <FormLabel>Offered at</FormLabel>
            </div>
            <div>
              {/* <Input
                onChange={handleChangeOfferingDescription}
                placeholder="ie. breakfast..."
              /> */}
              <RadioGroup onChange={handleChangeOfferedAt}>
                <Stack direction="row">
                  <Radio value="Breakfast">Breakfast</Radio>
                  <Radio value="Lunch">Lunch</Radio>
                  <Radio value="Dinner">Dinner</Radio>
                </Stack>
              </RadioGroup>
            </div>
          </FormControl>

          <FormControl
            className="grid grid-cols-2 content-center"
            mt={4}
            isRequired
          >
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
                onChange={handleChangeOfferingType}
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </Select>
            </div>
          </FormControl>

          <FormControl
            className="grid grid-cols-2 content-center"
            mt={4}
            isRequired
          >
            <div>
              <FormLabel>Cusine Type</FormLabel>
            </div>
            <div>
              <Input
                onChange={handleChangeCusineType}
                placeholder="i.e Asian"
              />
            </div>
          </FormControl>
          <FormControl
            className="grid grid-cols-2 content-center"
            mt={4}
            isRequired
          >
            <div>
              <FormLabel>image URL</FormLabel>
            </div>
            <div>
              {/* <Input
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

          <FormControl
            className="grid grid-cols-2 content-center"
            mt={4}
            isRequired
          >
            <div>
              <FormLabel>Description</FormLabel>
            </div>
            <div>
              <Textarea
                onChange={handleChangeOfferingDescription}
                placeholder="Enter the offering description"
              />
            </div>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSave} mr={3} colorScheme="orange">
            Create Offering
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateOfferingModal;
