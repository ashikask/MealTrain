import { createSlice, current } from "@reduxjs/toolkit";
import { useDisclosure } from "@chakra-ui/react";

// const { isOpen, onOpen, onClose } = useDisclosure();

export const providerOfferingModalSlice = createSlice({
  name: "providerOfferingsModal",
  initialState: {
    isOpen: false,
    offeringDetails: null,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setOfferingDetails: (state, action) => {
      state.offeringDetails = action.payload;
    },
  },
});

export const providerOfferingsModalActions = providerOfferingModalSlice.actions;
export default providerOfferingModalSlice.reducer;
