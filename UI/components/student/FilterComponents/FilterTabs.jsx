import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from "react";
import { FilterSlider } from './FilterSlider';
export function FilterTabs(){

    const [placement, setPlacement] = React.useState("top");
    return(
        <Tabs variant="soft-rounded" colorScheme="orange">
              <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FilterSlider />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
    );
}