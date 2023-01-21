import { Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { studentProviderOfferingTabActions } from "./../../store/student-provider-tab-slice.js";

function ProviderOfferTabs() {
  const dispatch = useDispatch();
  const tabIndex = useSelector((state) => state.offerTab.tabIndex);
  function updateTabIndex(tab) {
    dispatch(studentProviderOfferingTabActions.setTab(tab));
  }

  function getClassName(selectedIndex) {
    if (tabIndex == selectedIndex) {
      return "text-center bg-[#d36a19] block text-white py-2 px-4 ";
    } else {
      return "text-center block hover:border-[#d36a19] hover:text-white text-gray-400 hover:bg-[#d36a19] py-2 px-4";
    }
  }
  return (
    <div className="md:mx-0 border-b-2 border-[#d36a19] mb-3 ">
      <ul className="flex">
        <li className="flex-1 mr-0">
          <a
            className={getClassName("Breakfast")}
            onClick={(e) => {
              e.stopPropagation();
              updateTabIndex("Breakfast");
            }}
          >
            Breakfast Menu
          </a>
        </li>
        <li className="flex-1">
          <a
            className={getClassName("Lunch")}
            onClick={(e) => {
              e.stopPropagation();
              updateTabIndex("Lunch");
            }}
          >
            Lunch Menu
          </a>
        </li>
        <li className="flex-1 mr-2">
          <a
            className={getClassName("Dinner")}
            onClick={(e) => {
              e.stopPropagation();
              updateTabIndex("Dinner");
            }}
          >
            Dinner Menu
          </a>
        </li>
      </ul>
    </div>
  );
}
export default ProviderOfferTabs;
