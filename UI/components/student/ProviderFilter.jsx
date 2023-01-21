import {
  RadioGroup,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Radio,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  
} from "@chakra-ui/react";

import { FilterTabs } from "./FilterComponents/FilterTabs";
export function ProviderFilter() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    
    <>
      <Button
        bg="#620a15"
        className="font-sans text-[#F0EAE3]"
        onClick={onOpen}
      >
        Filter
      </Button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <FilterTabs />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
